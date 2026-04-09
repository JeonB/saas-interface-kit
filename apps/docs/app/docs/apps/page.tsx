import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";

export default function AppsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white">앱</h1>
      <p className="mt-2 text-neutral-400">
        모노레포에는 공유 UI 패키지를 사용하는 세 개의 앱이 있습니다.
      </p>

      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-white">web</h2>
          <Badge variant="default" className="ml-2">
            apps/web
          </Badge>
          <p className="mt-2 text-neutral-400">
            메인 웹 애플리케이션입니다. Next.js를 사용하며 모든 UI는 @repo/ui에서 가져옵니다.
            <code className="rounded bg-neutral-800 px-1 py-0.5">apps/web</code>에서{" "}
            <code className="rounded bg-neutral-800 px-1 py-0.5">pnpm dev</code>로 실행합니다(예: 포트 3001).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">docs</h2>
          <Badge variant="default" className="ml-2">
            apps/docs
          </Badge>
          <p className="mt-2 text-neutral-400">
            지금 보고 있는 문서 사이트입니다. Next.js, 사이드바 내비게이션, 예시용 @repo/ui를 사용합니다.
            <code className="rounded bg-neutral-800 px-1 py-0.5">apps/docs</code>에서{" "}
            <code className="rounded bg-neutral-800 px-1 py-0.5">pnpm dev</code>로 실행합니다.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">storybook</h2>
          <Badge variant="default" className="ml-2">
            apps/storybook
          </Badge>
          <p className="mt-2 text-neutral-400">
            컴포넌트 개발 및 문서화용입니다. Alert, Avatar, Badge, Button, Card, Gradient, TurborepoLogo 등의 스토리가 있습니다.
            <code className="rounded bg-neutral-800 px-1 py-0.5">apps/storybook</code>에서{" "}
            <code className="rounded bg-neutral-800 px-1 py-0.5">pnpm dev</code>로 실행합니다(포트 6006).
          </p>
          <Alert variant="info" title="새 컴포넌트">
            packages/ui에 컴포넌트를 추가할 때 apps/storybook/stories에 스토리를 추가하고
            .storybook/main.ts에 별칭을 넣으세요.
          </Alert>
        </div>
      </section>
    </>
  );
}
