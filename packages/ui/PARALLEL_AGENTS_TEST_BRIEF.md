# 병렬 에이전트: UI 테스트 작성 브리프

Cursor 에이전트를 여러 개 동시에 돌려 테스트를 추가할 때 **공통으로 붙이는 전제 문단**으로 쓰세요. 스타일을 맞추고 머지 충돌을 줄입니다.

## 범위 규칙

- **테스트만**: `packages/ui/src/` 아래 `*.test.ts` / `*.test.tsx`만 추가·수정합니다. 티켓에 명시되지 않은 한 **컴포넌트 구현은 수정하지 않습니다**.
- 마크업에 **스냅샷 테스트 금지**: `toHaveTextContent`, `toHaveAttribute`, `toBeDisabled`, `toHaveClass`, 역할(role) 쿼리 등 **명시적 assertion**을 우선합니다.

## 파일 패턴

- 컴포넌트 테스트: `packages/ui/src/<Component>.test.tsx` (컴포넌트 파일과 같은 베이스 이름).
- 순수 유틸: `packages/ui/src/<module>.test.ts` (Vitest에 포함, `tsconfig.json`으로 `tsc` 빌드에서 제외).

## import 및 스타일

- 테스트 대상 컴포넌트는 **상대 경로**로 import: `import { Badge } from "./badge";` (기존 `button.test.tsx`와 동일).
- `@testing-library/react` + `vitest` 패턴:

```ts
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
```

- 쿼리 우선순위: **역할(role) + 접근 가능한 이름** > 라벨 텍스트 > `data-testid` (필요할 때만 `testid` 사용).

## 각 에이전트에게 넘길 것

1. **대상 파일**: 예) `badge.tsx` → `badge.test.tsx`.
2. **검증 체크리스트**(불릿): 구현 세부가 아니라 **검증할 동작**만 구체적으로.
3. **범위 밖**: 다른 컴포넌트, 리팩터, 의존성 버전 올리기 등.

## 작업 분할 예시

| 에이전트 | 산출물 |
|----------|--------|
| A | `badge.test.tsx` — variant + className |
| B | `avatar.test.tsx` — 이미지 vs fallback + 접근성 |
| C | `card.test.tsx` — 내부 vs 외부 `href` |

**통합 담당(본인 또는 에이전트 1명)**: 네이밍 통일, 중복 케이스 제거, 저장소 루트에서 `pnpm test` 실행.

## 명령어

```sh
pnpm test              # 전체 패키지 (turbo)
pnpm --filter @repo/ui test
```

## 프롬프트 템플릿 (복사용)

```
저장소: turbo-repo-ex, 패키지 @repo/ui.
packages/ui/PARALLEL_AGENTS_TEST_BRIEF.md 를 읽고 그대로 따를 것.

작업: packages/ui/src/<NAME>.test.tsx 만 추가.
컴포넌트: packages/ui/src/<name>.tsx

검증 (불릿):
- ...

컴포넌트 파일은 수정하지 말 것. 스냅샷 테스트 금지.
```

## 병렬 프롬프트용 검증 체크리스트 예시

**Badge**

- `children` 텍스트가 렌더된다.
- 루트가 `span`이며 공통 레이아웃 클래스를 가진다(예: `ui:inline-flex`).
- `variant="success"`일 때 성공 배경 클래스가 적용된다.
- `className`이 variant 클래스와 병합된다(레이아웃 오버라이드).

**Avatar**

- `src`가 있으면: `src`, `alt`, `referrerpolicy="no-referrer"`가 올바른 `img`.
- `src`가 없으면: `role="img"`인 `span`, 적절한 `aria-label`(`alt`, `fallback`, 또는 기본값).
- `src`가 있을 때 `className`이 `img` 분기에 적용된다.

**Card**

- 내부 `href`(http(s) 아님): `target` / `rel` 없음, `href` 그대로.
- 외부 `href`: `target="_blank"`, `rel`에 `noopener` 포함, UTM 쿼리 부착(`?` 또는 `&` 상황에 맞게).
- 앵커에 `className`이 병합된다.
