# @repo/tokens

saas-interface-kit 디자인 토큰입니다. 값의 단일 출처는 `theme.css`의 `@theme` 블록이고, TypeScript export는 그 계약(코어 값, CSS 변수 이름)을 코드에서 참조할 수 있게 합니다.

## 설치

이 모노레포 안에서는 `workspace:*`로 연결합니다. 다른 저장소에서는 npm 레지스트리에 게시된 버전을 설치합니다.

```sh
pnpm add @repo/tokens
```

Tailwind CSS 4를 쓰는 앱은 테마를 CSS에서 가져옵니다.

```css
@import "@repo/tokens/fonts.css";
@import "tailwindcss";
@import "@repo/tokens/theme.css";
```

코어 값과 변수 이름은 JavaScript에서 가져옵니다.

```ts
import { coreTokens, cssVars } from "@repo/tokens";

coreTokens.color.primary;
cssVars.color.semanticBrand;
```

`theme.css`를 고치면 `src/tokens.ts`의 코어 값도 같이 맞춥니다. `pnpm --filter @repo/tokens test`가 둘의 불일치를 잡습니다.
