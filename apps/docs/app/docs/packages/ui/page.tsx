import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";

export default function PackagesUiPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white">패키지 / UI</h1>
      <p className="mt-2 text-neutral-400">
        <Badge variant="success">@repo/ui</Badge>는 web과 docs에서 사용하는 공유 UI 패키지입니다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">사용법</h2>
        <p className="mt-2 text-neutral-400">
          앱의 <code className="rounded bg-neutral-800 px-1 py-0.5">dependencies</code>에{" "}
          <code className="rounded bg-neutral-800 px-1 py-0.5">@repo/ui</code>를 추가합니다.
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`"dependencies": {
  "@repo/ui": "workspace:*"
}`}
        </pre>
        <p className="mt-4 text-neutral-400">
          컴포넌트와 스타일을 가져옵니다.
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import "@repo/ui/styles.css";
import { Button } from "@repo/ui/button";
import { LinkCard } from "@repo/ui/link-card";`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">컴포넌트</h2>
        <p className="mt-2 text-neutral-400">
          Alert, Avatar, Badge, Button, Card, DataTable, Dialog, LinkCard, MetricCard, Tabs, Toast, 레이아웃 셸 등
          프리미티브와 패턴을 제공합니다. 예시와 props는{" "}
          <a
            href="/docs/components"
            className="text-blue-1000 underline hover:no-underline"
          >
            컴포넌트 참고
          </a>
          를 보세요.
        </p>
        <Alert variant="success" className="mt-4">
          <code>packages/ui</code>에서 또는 루트에서 <code>pnpm build</code>로 UI 패키지를 빌드하세요.
          Storybook은 Vite 별칭으로 소스 파일을 사용합니다.
        </Alert>
      </section>
    </>
  );
}
