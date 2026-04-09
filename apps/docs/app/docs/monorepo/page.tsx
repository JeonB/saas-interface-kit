import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";

export default function MonorepoPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white">모노레포</h1>
      <p className="mt-2 text-neutral-400">
        이 저장소는 공유 패키지와 여러 앱을 포함한 Turborepo 모노레포입니다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">구조</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`turbo-repo-ex/
├── apps/
│   ├── web/        # 메인 웹 앱
│   ├── docs/       # 이 문서 사이트
│   └── storybook/  # UI 컴포넌트 스토리
├── packages/
│   ├── ui/         # 공유 @repo/ui 컴포넌트
│   ├── tailwind-config/
│   ├── typescript-config/
│   └── eslint-config/
├── pnpm-workspace.yaml
└── turbo.json`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">워크스페이스</h2>
        <p className="mt-2 text-neutral-400">
          <code className="rounded bg-neutral-800 px-1 py-0.5 text-sm">
            pnpm-workspace.yaml
          </code>{" "}
          에서 <code className="rounded bg-neutral-800 px-1 py-0.5">apps/*</code>와{" "}
          <code className="rounded bg-neutral-800 px-1 py-0.5">packages/*</code>를 정의합니다.
          앱은 <Badge variant="default">workspace:*</Badge>로 패키지에 의존합니다.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">태스크</h2>
        <p className="mt-2 text-neutral-400">
          <code className="rounded bg-neutral-800 px-1 py-0.5">turbo.json</code>{" "}
          에서 build, lint, dev를 정의합니다. 빌드는 <code className="rounded bg-neutral-800 px-1 py-0.5">^build</code>로
          패키지가 앱보다 먼저 빌드됩니다.
        </p>
        <Alert variant="info" title="팁">
          루트에서 <code>pnpm build</code> 또는 <code>pnpm dev</code>로 Turborepo 태스크를 실행하세요.
        </Alert>
      </section>
    </>
  );
}
