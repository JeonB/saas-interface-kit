# improvement-plan.md — saas-interface-kit 개선 사항

> 작성일: 2026-10-13
> 기준 커밋: `23cabd0` (chore(release): publish tokens and UI through the npm registry)
> 상태: **P0·P1 항목 구현 완료, 후속 과제는 별도 PR로 진행**

---

## 1. 점검 요약

### 1.1 현재 품질 게이트

| 게이트 | 결과 |
| --- | --- |
| `pnpm lint` | 통과 (6 tasks) |
| `pnpm check-types` | 통과 (10 tasks) |
| `pnpm test` | 통과 (`@repo/ui` 196, `web` 64, `@repo/api-client` 37, `@repo/tokens` 3) |

게이트는 모두 녹색이지만, 테스트가 다루지 않는 영역에서 **데이터 손실·중복 실행·캐시 오염**으로 이어질 수 있는 문제가 확인되었습니다. 아래 항목은 코드 검토로 찾은 것이며, 각 항목에 근거 파일을 함께 적었습니다.

### 1.2 우선순위 기준

- **P0**: 사용자 데이터나 외부 시스템에 잘못된 부작용을 낼 수 있음 (중복 실행, 잘못된 캐시 응답)
- **P1**: 운영·배포 안정성 또는 보안 위생 문제
- **P2**: 프로젝트 규칙 위반, 중복 코드 등 유지보수성 문제

---

## 2. 이번 작업에서 구현하는 항목

### 2.1 [P0] API 클라이언트가 비멱등 요청(POST/PUT/PATCH)도 재시도함

- **근거**: `packages/api-client/src/client.ts` — `request()`는 HTTP 메서드와 무관하게 502/503/504·네트워크 오류에서 재시도합니다. 문서 주석(`maxRetries`)은 "idempotent GETs"만 재시도한다고 적고 있어 구현과 계약이 어긋납니다.
- **영향**: `maxRetries > 0`으로 설정하면 `createWorkflowRun`(POST)이 게이트웨이 503 이후 재전송되어 **워크플로가 두 번 실행**될 수 있습니다. 서버가 첫 요청을 처리한 뒤 응답만 유실된 경우가 대표적입니다. `createWorkflow`, `publishWorkflow`도 같은 위험이 있습니다.
- **조치**: 재시도를 `GET`/`HEAD`로 제한합니다. 같은 파일에 중복 정의된 네트워크 오류 판별 함수(`isLikelyNetworkFailure`, `isRetriableFetchFailure`)도 하나로 합칩니다.
- **검증**: POST가 503을 받으면 1회만 호출되는지 확인하는 단위 테스트를 추가합니다.

### 2.2 [P0] Mock API가 변경 요청·오류 응답·가변 리소스를 공개 캐시로 내보냄

- **근거**: `apps/web/lib/mock-api.ts`의 `mockApiJson()` 기본값이 `public, s-maxage=60, stale-while-revalidate=300`입니다. 다음 응답이 이 기본값을 그대로 사용합니다.
  - `POST /v1/workflows`, `PATCH /v1/workflows/:id`, `PUT /v1/workflows/:id/definition`의 성공 응답
  - 같은 라우트의 `400`/`404` 오류 응답
  - 서버 저장소(`.workflow-data/store.json`)에 영속되어 수시로 바뀌는 `GET /v1/workflows`, `GET /v1/workflows/:id`
- **영향**: CDN이나 공유 캐시 뒤에 두면 워크플로를 생성·게시한 직후에도 최대 60초(+SWR 300초) 동안 이전 목록이 보이고, 일시적인 `404`가 다른 사용자에게 캐시되어 전달될 수 있습니다.
- **조치**:
  - `mockApiJson()` 기본값을 `no-store`로 바꾸고, 정적 fixture 엔드포인트(integrations, members, usage summary, notifications)에서만 SWR 캐시를 명시적으로 켭니다.
  - 2xx가 아닌 응답은 옵션과 관계없이 항상 `no-store`로 강제합니다.
  - README의 캐시 설명도 실제 코드에 맞춥니다(서버 캐시 60초 → 실제 값 30초, mock API 캐시 정책 추가).
- **검증**: `mock-api.test.ts`에 기본값과 오류 응답 강제 규칙 테스트를 추가합니다.

### 2.3 [P1] JSON 파일 저장소의 동시성·원자성 문제와 3중 중복 구현

- **근거**: `apps/web/lib/workflow-server-store.ts`, `run-server-store.ts`, `resource-store.ts`가 각각 "파일 읽기 → 메모리 수정 → `writeFile`" 패턴을 복제해 구현합니다.
- **영향**:
  - **갱신 유실(lost update)**: 웹훅 두 건이 동시에 들어오면 두 요청이 같은 스냅샷을 읽고 각자 덮어써서 실행 기록 하나가 사라집니다.
  - **파일 손상**: `writeFile`은 원자적이지 않아 쓰기 도중 프로세스가 종료되면 잘린 JSON이 남고, 이후 모든 읽기가 `JSON.parse` 오류로 실패합니다.
  - 같은 로직이 세 곳에 있어 수정이 한 곳에만 반영될 위험이 있습니다.
- **조치**: 공통 모듈 `apps/web/lib/json-file-store.ts`를 추가합니다.
  - 파일 경로별 프로세스 내 직렬화 큐로 읽기·쓰기를 순서대로 실행합니다.
  - 임시 파일에 쓴 뒤 `rename`으로 교체해 원자적으로 저장합니다.
  - 세 저장소는 이 모듈 위에서 도메인 로직만 갖도록 정리합니다.
- **검증**: 동시 `createRow` 20건이 모두 보존되는지 확인하는 테스트를 추가합니다. 같은 테스트를 기존 구현에 돌리면 **20건 중 1건만 남아** 실패하는 것을 확인했습니다. 기존 저장소 테스트는 그대로 통과합니다.
- **한계**: 프로세스 간 잠금은 다루지 않습니다. 이 저장소는 단일 인스턴스 데모용이며, 다중 인스턴스 배포에는 실제 DB가 필요합니다.

### 2.4 [P1] 공개 웹훅이 실패 시 내부 실행 로그를 외부 호출자에게 반환함

- **근거**: `apps/web/app/api/hooks/[...path]/route.ts`는 인증 없이 호출되는 공개 엔드포인트인데, 실행 실패 시 `steps`(노드별 메시지, 리소스 데이터 일부 포함 가능)를 응답 본문에 그대로 담습니다.
- **영향**: 외부 호출자에게 워크플로 구조와 내부 데이터가 노출됩니다.
- **조치**: 실패 응답은 `{ error, runId }`만 반환합니다. 상세 로그는 이미 실행 기록으로 저장되므로 콘솔의 `/console/runs/{runId}`에서 확인할 수 있습니다.

### 2.5 [P1] `SESSION_SECRET` 약한 값 검증 누락과 instrumentation의 서버 전용 모듈 의존

- **근거**:
  - `AGENTS.md`와 `.cursor/rules`는 "weak or missing values fail server startup"이라고 설명하지만, `apps/web/instrumentation.ts`는 빈 값과 개발용 placeholder만 거부합니다. `"abc"` 같은 짧은 값도 통과합니다.
  - `instrumentation.ts`가 상수 하나를 위해 `lib/session.ts`를 import하고, 이 파일은 `next/headers`·`node:crypto`를 끌고 옵니다. `register()`는 Edge 런타임에서도 평가되므로 의존성이 불필요하게 무겁습니다.
  - 검증은 `trim()`한 값으로 하지만, 서명은 trim하지 않은 원본 값을 사용해 기준이 다릅니다.
- **조치**: 순수 모듈 `apps/web/lib/session-secret.ts`를 추가해 placeholder 상수, 최소 길이(32자) 검증, 서명용 secret 결정 로직을 한곳에 모으고 단위 테스트를 작성합니다.

### 2.6 [P1] 툴체인 버전 불일치

- **근거**:
  - CI(`ci.yml`, `release.yml`, `changeset-check.yml`)가 **Node 23.1.0**을 사용합니다. 홀수 버전이며 2025-06에 지원이 종료(EOL)되었습니다.
  - 루트 `engines.node`가 `>=18`인데, Next.js 16은 Node 20.9 이상을 요구합니다.
  - 루트 패키지 이름이 템플릿 원본 이름인 `with-tailwind`로 남아 있습니다.
- **조치**: CI를 Active LTS인 Node 24로 맞추고, `.nvmrc`를 추가하며, `engines.node`를 `>=20.9.0`으로, 루트 이름을 `saas-interface-kit`으로 바꿉니다.

### 2.7 [P1] 릴리스 워크플로가 품질 게이트 없이 npm에 배포함

- **근거**: `.github/workflows/release.yml`은 `main` push 시 CI와 **병렬로** 실행되고, lint·타입·테스트 없이 `changeset publish`를 호출합니다. CI가 실패해도 패키지가 배포될 수 있습니다.
- **조치**: 배포 단계 전에 `pnpm lint`, `pnpm check-types`, `pnpm test`를 실행합니다. `id-token: write` 권한은 이미 있으므로 `NPM_CONFIG_PROVENANCE=true`로 npm provenance도 켭니다.

### 2.8 [P1] `@repo/ui`의 `lucide-react` peer 범위가 실제 사용 버전과 불일치

- **근거**: `packages/ui/package.json`의 peer는 `^0.544.0`인데, 개발·테스트와 소비 앱(`apps/web`)은 `^1.14.0`을 씁니다. `^0.544.0`은 1.x를 포함하지 않으므로, npm 소비자가 1.x를 쓰면 peer 경고가 나거나 0.x가 중복 설치됩니다.
- **조치**: peer 범위를 `^0.544.0 || ^1.0.0`으로 넓힙니다. `@repo/ui`가 쓰는 아이콘(`AlertCircle`, `CheckCircle2`, `GitBranch` 등)은 두 버전 모두에 존재합니다. 배포 패키지 메타데이터 변경이므로 changeset을 추가합니다.

### 2.9 [P2] 프로젝트 규칙 위반: 함수 내부 동적 import

- **근거**: `apps/web/lib/run-server-store.ts`의 `await import("./workflow-server-store")`, `apps/web/lib/workflow-runtime/execute.ts`의 `await import("../resource-store")`. 두 경우 모두 순환 의존이 없어 정적 import로 충분합니다. `execute.ts`는 `resources` 옵션을 넘겨도 매번 동적 import를 실행합니다.
- **조치**: 파일 상단 정적 import로 옮깁니다.

---

## 3. 후속 과제 (이번 작업 범위 밖)

| 우선순위 | 항목 | 내용 | 보류 사유 |
| --- | --- | --- | --- |
| P1 | `@repo/ui` ESM 출력 | `module: NodeNext`인데 `package.json`에 `"type": "module"`이 없어 `dist/`가 **CommonJS**로 빌드됩니다. 배럴 `index.js`가 모든 컴포넌트(`@xyflow/react` 포함)를 `require`하므로 npm 소비자 번들에서 tree-shaking이 되지 않습니다. | 상대 import 전체에 `.js` 확장자 추가가 필요하고, web·docs·Storybook의 프로덕션 빌드로 검증해야 하는 큰 변경이라 별도 PR로 진행 |
| P1 | 가변 도메인 서버 캐시 무효화 | workflows·runs 목록이 `unstable_cache`(30초, 태그 `console-data`)로 캐시되지만 `revalidateTag` 호출이 저장소 어디에도 없습니다. 워크플로 생성·실행은 브라우저에서 API로 직접 호출되므로, 실행 직후 `/console/runs`에 최대 30초간 새 실행이 보이지 않습니다. | 변경 요청을 서버 액션으로 감싸 무효화하거나 가변 도메인을 캐시에서 빼는 설계 결정이 필요 |
| P1 | 웹훅 인증·유입 제어 | `/api/hooks/*`에 서명 검증(HMAC secret), 본문 크기 제한, rate limit이 없습니다. | 트리거 설정 스키마(`trigger.secret`)와 편집 UI 변경이 함께 필요 |
| P2 | FSD 전환 | `fsd-architecture.md`의 Phase 0~5 | 설계 완료, 단계별 PR로 진행 예정 |
| P2 | 캐싱 우선 전략 | `plan.md`의 추천안 A(`"use cache"`, PPR) | 백엔드 연동 범위 결정 후 진행 |
| P2 | `@xyflow/react` 이중 선언 | `@repo/ui`의 `dependencies`와 `peerDependencies`에 동시에 있어 peer 선언이 의미가 없습니다. | ESM 전환 시 의존성 정책과 함께 정리 |
| P2 | 루트 문서 정리 | `plan.md`, `fsd-architecture.md`, `workflow-runtime-design.md`, 이 문서, `packages/ui/PARALLEL_AGENTS_TEST_BRIEF.md`를 `docs/`로 모으기 | 외부 링크 영향 확인 후 일괄 이동 |
| P2 | `204 No Content` 처리 | `@repo/api-client`가 빈 본문에도 `res.json()`을 호출해 `SyntaxError`가 납니다. | 현재 204를 반환하는 엔드포인트가 없음 |

---

## 4. 완료 기준

- [x] 2장 항목 구현
- [x] 새 동작에 대한 단위 테스트 추가
- [x] `pnpm lint` / `pnpm check-types` / `pnpm test` 통과
