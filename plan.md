# plan.md — saas-interface-kit 설계 계획

> 작성일: 2026-06-11
> 상태: **계획 단계 — 구현 지시 전까지 코드 변경 없음**

---

## 1. 프로젝트 현황 분석

### 1.1 구조 요약

Turborepo(pnpm workspaces) 모노레포. 프론트엔드 전용이며 DB·백엔드·Docker 없음.

| 워크스페이스 | 역할 | 핵심 사항 |
| --- | --- | --- |
| `apps/web` | Next.js 16.2.6 콘솔 앱 (포트 3001) | App Router, React 19, RSC 중심 데이터 페칭 |
| `apps/docs` | 문서 사이트 (포트 3000) | `/` → `/docs` 리다이렉트 |
| `apps/storybook` | Storybook 10 (포트 6006) | `@repo/ui` 소스를 직접 alias |
| `packages/ui` | 공유 디자인 시스템 (~40+ 컴포넌트) | `tsc` + Tailwind CLI로 `dist/` 빌드, 커버리지 게이트 90/85% |
| `packages/api-client` | 타입 안전 API 클라이언트 | Zod 파싱, 타임아웃(10s)/재시도/`X-Request-Id` |

### 1.2 데이터 흐름 (현재)

- **렌더링**: 콘솔 라우트는 `cookies()`/`searchParams` 사용으로 전부 **동적 SSR**. ISR/SSG 미사용.
- **데이터 페칭**: 비동기 서버 컴포넌트가 `apps/web/lib/*-mock.ts` 헬퍼 호출. TanStack Query/SWR 같은 클라이언트 페칭 레이어 없음.
- **API 스위치**: `lib/console-api.ts`가 `NEXT_PUBLIC_API_URL` 유무로 분기.
  - 설정 시 → `createConsoleApiClient()`로 실제 호출 (`/health`, `/v1/*`)
  - 미설정 시 → 인메모리 mock 배열 반환
- **세션/인증**: HMAC 서명 쿠키(`nl_session`) + `proxy.ts`(Next 16) 게이트 + RBAC UI 게이트. 데모 전용.
- **클라이언트 상태**: 워크플로 편집·알림 읽음·테마는 `localStorage`.

### 1.3 현재 API 커버리지 갭

| 도메인 | api-client 지원 | 비고 |
| --- | --- | --- |
| integrations / workflows / audit / run 상세 | O | URL 설정 시 실제 호출 가능 |
| runs 목록 | X | 항상 mock |
| notifications / members | X | 항상 mock (members는 페이지 인라인) |
| usage summary | 부분 | `getUsageSummary()`는 있으나 대시보드 카드는 하드코딩 |

---

## 2. 트래픽 급증(1만+ 동시 사용자) 대응 설계

전제: 콘솔 라우트가 전부 요청 시점 SSR이므로, 트래픽이 곧 **서버 렌더링 부하**로 직결되는 구조다. 두 가지 추천안을 비교한다.

### 추천안 A — 캐싱 우선 전략 (Static-first + CDN + 요청 디커플링) ⭐ 최종 추천

서버 인스턴스를 늘리기 전에 "서버에 도달하는 요청 자체"를 줄이는 접근.

1. **정적화 가능한 라우트 분리**
   - 마케팅 페이지(`/`), docs 앱: 완전 정적(SSG) + CDN 캐시. 현재도 정적화 가능한 구조이므로 비용 0에 가까움.
   - 콘솔 셸(레이아웃, 사이드바, 네비게이션): 정적 셸 + 데이터만 스트리밍하는 구조로 분리.
2. **콘솔 데이터의 캐시 계층화**
   - 사용자별이 아닌 조직 공통 데이터(integrations 목록, workflows 목록 등)는 `"use cache"` / `revalidate` 기반 ISR로 N초 캐시 → 1만 명이 와도 origin 렌더링은 주기당 1회.
   - 사용자별 데이터(세션, 알림 읽음 상태)만 동적 영역(Suspense 경계)으로 격리 → **PPR(Partial Prerendering) 적용 후보**.
3. **CDN/엣지 레이어**
   - 정적 자산 + 정적화된 HTML을 CDN에서 서빙. `stale-while-revalidate` 헤더로 급증 시에도 오리진 보호.
4. **클라이언트 요청 디커플링**
   - 폴링·재시도성 호출(health check 등)에 지터(jitter) + 백오프 적용해 thundering herd 방지. `@repo/api-client`의 재시도 옵션(backoff)이 이미 있으므로 기본값만 조정하면 됨.
5. **점진적 성능 저하(Graceful degradation)**
   - 이미 존재하는 mock fallback 경로를 재활용: 백엔드 5xx/timeout 시 캐시된 스냅샷 또는 mock 데이터 + 경고 배너(`ApiStatusBanner`)로 강등. dev simulation 인프라(`lib/api-dev-simulation.ts`)로 시나리오 검증 가능.

- **장점**: 이 프로젝트(읽기 중심, 백엔드 없음, RSC 우선)에 가장 적합. 인프라 비용 최소, 코드 변경이 Next.js 기능 범위 내. 1만 요청 중 95%+를 CDN/캐시에서 흡수.
- **단점**: 사용자별 동적 데이터 비중이 커지면 효과 감소. 캐시 무효화 설계 필요.

### 추천안 B — 수평 확장 + 유입 제어 전략 (Auto-scaling + Rate limiting + 부하 차단)

요청을 그대로 받되 인프라로 흡수하는 접근.

1. **컨테이너화 + 오토스케일링**: `apps/web`을 standalone 빌드로 컨테이너화, CPU/RPS 기반 HPA(또는 Vercel/서버리스 자동 확장)로 인스턴스 수평 확장.
2. **로드밸런서 + 헬스체크**: 기존 `GET /api/health`(`no-store`)를 LB 프로브로 그대로 사용.
3. **유입 제어**: 엣지/프록시 레벨 rate limiting(IP·세션 단위), 급증 시 대기열 페이지(waiting room) 또는 429 + Retry-After.
4. **백엔드 보호**: `@repo/api-client`에 서킷 브레이커 패턴 추가(연속 실패 시 일정 시간 mock fallback으로 강등), 타임아웃 단축(10s → 3~5s)으로 커넥션 점유 최소화.

- **장점**: 동적·사용자별 트래픽에도 견고. 캐시 불가능한 워크로드까지 커버.
- **단점**: 인프라 비용이 트래픽에 비례. 현재 저장소는 인프라 코드가 전혀 없어 도입 범위가 큼(IaC, 모니터링, 배포 파이프라인). 프론트엔드 템플릿 성격과 거리가 있음.

### 최종 추천: **A안 (캐싱 우선 전략)**

근거:

- 이 프로젝트는 **읽기 중심 콘솔 UI + mock/선택적 API** 구조라, 트래픽 급증 = 동일 데이터의 반복 렌더링이다. 캐시 적중률이 구조적으로 높다.
- 콘솔 페이지가 동적 SSR인 이유는 단지 세션 쿠키와 searchParams 때문이며, 데이터 자체는 조직 공통이다. PPR/ISR로 분리하면 오리진 부하가 사용자 수와 무관해진다.
- 인프라가 전혀 없는 현재 상태에서 B안은 도입 비용이 과도하다. A안은 Next.js 16 기능과 기존 코드 패턴(mock fallback, Suspense, api-client 재시도) 위에서 구현 가능하다.
- 단, A안 적용 후에도 트래픽이 더 커지면 B안의 오토스케일링·rate limiting을 **2단계로 추가**하는 것이 자연스러운 확장 경로다(A → A+B 순).

### A안 적용 시 작업 항목 (구현 지시 후 진행)

| # | 작업 | 대상 |
| --- | --- | --- |
| 1 | 마케팅/문서 라우트 정적화 검증 및 캐시 헤더 명시 | `apps/web/app/(marketing)`, `apps/docs` |
| 2 | 조직 공통 데이터 fetch에 캐시/ISR 적용 (`revalidate` 또는 `"use cache"`) | `apps/web/lib/*-mock.ts`, `lib/console-api.ts` |
| 3 | 세션 의존 영역을 Suspense 경계로 격리 (PPR 후보 식별) | `app/console/**` |
| 4 | api-client 기본 타임아웃/재시도/지터 정책 조정 | `packages/api-client` |
| 5 | 5xx/timeout 시 캐시 스냅샷·mock 강등 + 배너 노출 일원화 | `lib/console-api.ts`, `ApiStatusBanner` |
| 6 | dev simulation으로 급증·장애 시나리오 회귀 테스트 추가 | `lib/api-dev-simulation*` |

---

## 3. Mock API 전략 (현재 실제 API 부재)

현재 mock은 "라이브러리 모듈 분기" 방식(`lib/*-mock.ts`에서 인메모리 배열 반환)이라, `@repo/api-client`의 **네트워크 경로(타임아웃·재시도·Zod 파싱·X-Request-Id)가 전혀 검증되지 않는** 한계가 있다.

### 후보 비교

| 방식 | 설명 | 적합도 |
| --- | --- | --- |
| **(1) Next.js Route Handlers mock 서버** ⭐ | `apps/web/app/api/mock/v1/*`(또는 별도 경량 mock 앱)에 `/health`, `/v1/*` 엔드포인트를 Route Handler로 구현. `NEXT_PUBLIC_API_URL=http://localhost:3001/api/mock`만 설정하면 api-client가 실제 HTTP로 호출 | **최적** |
| (2) MSW (Mock Service Worker) | 서비스 워커/Node 인터셉터로 요청 가로채기 | 테스트·Storybook용으로는 좋으나, RSC 서버 페칭 인터셉트 설정이 번거롭고 런타임 데모 용도에 과함 |
| (3) json-server 등 별도 프로세스 | 독립 mock 서버 실행 | 의존성·실행 프로세스 추가, Zod 스키마와 이중 관리 부담 |

### 추천: **(1) Next.js Route Handlers 기반 mock API**

이 프로젝트에 가장 어울리는 이유:

- **기존 자산 100% 재사용**: `lib/*-mock.ts`의 mock 데이터를 Route Handler 응답으로 그대로 사용. `packages/api-client`의 Zod 스키마가 응답 계약 검증을 겸한다(스키마-mock 불일치를 즉시 발견).
- **실제 코드 경로 검증**: `NEXT_PUBLIC_API_URL` 설정만으로 mock 분기 코드가 아닌 **실제 api-client 경로**(fetch → 타임아웃 → 재시도 → Zod parse)가 동작. dev simulation의 지연/503/타임아웃 주입을 Route Handler 레벨로 옮기면 더 현실적인 장애 재현 가능.
- **추가 의존성 0**: Next.js 기본 기능만 사용. 별도 프로세스·서비스 워커 설정 불필요.
- **API 커버리지 갭 해소 경로**: runs 목록·notifications·members처럼 api-client에 없는 엔드포인트를 mock 핸들러 + Zod 스키마 + 클라이언트 메서드 세트로 함께 추가하면, 추후 실제 백엔드 등장 시 `NEXT_PUBLIC_API_URL`만 교체하면 된다.

### 보조 채택: 테스트 레이어에는 MSW (선택)

- `@repo/api-client`/`@repo/ui`의 Vitest 테스트에서 네트워크 레벨 검증이 필요해지면 MSW(Node)를 테스트 전용으로 도입 가능. 런타임 mock과 역할을 분리한다. (현재는 `vi.fn` fetch mock으로 충분 — 필요 시점에만 도입)

### Mock API 구현 시 작업 항목 (구현 지시 후 진행)

| # | 작업 | 대상 |
| --- | --- | --- |
| 1 | `app/api/mock/v1/*` Route Handlers 추가 (`health`, `usage/summary`, `audit/events`, `integrations`, `workflows`, `runs`, `runs/[id]`, `notifications`, `members`) | `apps/web/app/api/mock/**` |
| 2 | mock 데이터를 `lib/*-mock.ts`에서 핸들러가 공유하도록 정리 (단일 출처 유지) | `apps/web/lib/` |
| 3 | api-client에 누락 메서드 추가 (`getRuns`, `getNotifications`, `getMembers`) + Zod 스키마 | `packages/api-client/src/` |
| 4 | `.env.example`에 mock 모드 안내 추가 (`NEXT_PUBLIC_API_URL=http://localhost:3001/api/mock`) | `.env.example`, `README.md` |
| 5 | dev simulation(지연·503·타임아웃)을 핸들러 쿼리/헤더 기반으로 연동 | `lib/api-dev-simulation*`, mock 핸들러 |
| 6 | mock 핸들러는 프로덕션 노출 차단 여부 결정 (env 가드 또는 항상 허용 — 데모 템플릿 성격상 허용도 가능) | `apps/web` |

---

## 4. 진행 원칙

1. **구현은 사용자 지시 후 시작** — 본 문서는 설계 합의용.
2. 구현 시 단계별로 `pnpm lint` / `pnpm check-types` / `pnpm test` 품질 게이트 통과 후 다음 단계 진행.
3. 우선순위 제안: **3장 Mock API(기반 마련) → 2장 A안 캐싱(그 위에 적용)** 순서. mock API가 있어야 캐싱·장애 강등 시나리오를 실제 HTTP 경로로 검증할 수 있다.
