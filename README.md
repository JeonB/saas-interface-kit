# Turborepo — 공유 UI가 있는 모노레포

이 Turborepo에는 공유 디자인 시스템(`@repo/ui`), 메인 웹 앱, 문서 사이트, 컴포넌트 개발용 Storybook이 포함되어 있습니다. UI 키트는 **B2B SaaS** 화면(대시보드, 설정, 알림 등)을 염두에 두고 구성했습니다.

## 구성 요소

### 앱

| 앱            | 설명                                                                                                              | 개발 포트 |
| ------------- | ----------------------------------------------------------------------------------------------------------------- | -------- |
| **web**       | Next.js 앱. SaaS 스타일 대시보드 데모에 `@repo/ui` 사용.                                                          | 3001     |
| **docs**      | 문서: 소개, 파운데이션, 디자인 시스템, 컴포넌트, 품질 게이트.                                                     | 3000     |
| **storybook** | 프리미티브, 패턴, LinkCard, 레이아웃 셸 등 UI 스토리.                                                             | 6006     |

### 패키지

- **@repo/ui** — 공유 React 컴포넌트와 스타일(Tailwind, `ui:` 접두사). web·docs에서 사용.
- **@repo/tailwind-config** — 공유 Tailwind 테마(시맨틱 토큰 + 팔레트).
- **@repo/typescript-config** — 공유 `tsconfig` 프리셋.
- **@repo/eslint-config** — 공유 ESLint 설정.

## 빠른 시작

```sh
pnpm install
pnpm build   # 패키지 빌드 후 앱 빌드
pnpm dev     # 모든 앱을 개발 모드로 실행(또는 아래처럼 앱별 실행)
```

### 앱별 실행

```sh
# Web (메인 앱)
pnpm --filter web dev          # http://localhost:3001

# Docs
pnpm --filter docs dev         # http://localhost:3000

# Storybook
pnpm --filter storybook dev    # http://localhost:6006
```

**web** 앱의 "문서"·"시작하기" 링크는 기본적으로 docs 앱 `http://localhost:3000`을 가리킵니다. 다른 문서 URL(동일 호스트·프로덕션 등)을 쓰려면 web 앱에 환경 변수를 설정하세요.

```sh
# apps/web
NEXT_PUBLIC_DOCS_URL=https://docs.example.com   # 또는 동일 출처 /docs는 ""
```

템플릿은 [.env.example](.env.example)를 참고하세요.

## @repo/ui 사용하기

`@repo/ui`에 의존하는 앱에서는:

```ts
import "@repo/ui/styles.css";
import { Button, Card, LinkCard } from "@repo/ui"; // 배럴 import
// 또는
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { LinkCard } from "@repo/ui/link-card";
```

`@repo/ui`는 **`lucide-react`**를 피어 의존성으로 둡니다(`Alert` 등 아이콘). 앱에서 호환 버전을 설치해야 합니다(각 앱 `package.json` 참고).

레이아웃·간격용으로 컴포넌트에 선택적 `className` prop을 지원합니다. UI 패키지는 저장소 루트 또는 `packages/ui`에서 빌드합니다.

```sh
pnpm --filter @repo/ui build
```

## 새 UI 컴포넌트 추가

1. `packages/ui/src/`에 컴포넌트를 추가하고 `packages/ui/src/index.ts`에서 export합니다.
2. `apps/storybook/stories/<Name>.stories.tsx`에 스토리를 추가합니다.
3. `apps/docs/app/docs/components/page.tsx`에 문서를 추가하고 필요 시 디자인 시스템 안내를 갱신합니다.
4. 품질 게이트를 실행합니다.

```sh
pnpm lint
pnpm check-types
pnpm test
```

## 테스트 병렬 에이전트

여러 Cursor 에이전트로 테스트 작업을 나눌 때 스타일 드리프트를 줄이려면 `packages/ui/PARALLEL_AGENTS_TEST_BRIEF.md`의 브리프를 공유하세요. 파일 이름 규칙, Testing Library 규칙, 복사해 쓸 프롬프트 템플릿이 정의되어 있습니다. 에이전트 결과를 머지한 뒤 `pnpm test`를 한 번 실행하세요.

## 디자인 시스템 운영 방식

- **API 계약**: 컴포넌트는 안정적인 `variant`, `size`, `className` 패턴을 노출합니다.
- **문서 우선**: 변경 시 Storybook과 Docs를 함께 갱신합니다.
- **품질 게이트**: 머지 전 타입 검사, 린트, UI 테스트가 필수입니다.

문서 경로:

- `/docs/foundations` — 토큰과 시맨틱 역할
- `/docs/design-system` — 계약과 권장/비권장
- `/docs/quality-gates` — 릴리스 체크리스트

## 빠르게 이해하는 순서

처음 보는 분께 권하는 순서:

1. `README.md` — 저장소 구조와 명령
2. `/docs/foundations` — 토큰 위치와 UI 매핑
3. `/docs/design-system` — 컴포넌트 API 계약
4. `/docs/quality-gates` — 안정성 워크플로
5. `packages/ui/src/button.tsx`와 `apps/storybook/stories/Button.stories.tsx` — 코드와 Storybook으로 보는 계약

## 이렇게 구성한 이유

- **문제**: 앱마다 컴포넌트 스타일이 어긋나고 문서가 구현보다 늦어짐.
- **해결**: Storybook·문서·품질 게이트를 한 경로에 둔 중앙 `@repo/ui` 계약.
- **효과**: 예측 가능한 동작, 리뷰가 명확해지고 공유 UI 변경이 더 안전해짐.

## 기술 스택

- [Turborepo](https://turbo.build/)
- [Next.js](https://nextjs.org/) (web, docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/) (React + Vite)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
