import { Alert } from "@repo/ui/alert";

export default function GettingStartedPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white">시작하기</h1>
      <p className="mt-2 text-neutral-400">
        의존성을 설치하고 pnpm과 Turborepo로 모노레포를 실행합니다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">사전 요구 사항</h2>
        <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-300">
          <li>Node.js 18 이상</li>
          <li>pnpm(권장) 또는 npm</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">설치</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`pnpm install`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">실행</h2>
        <p className="mt-2 text-neutral-400">
          Turborepo로 모든 앱을 개발 모드로 실행합니다.
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`pnpm dev`}
        </pre>
        <Alert variant="success" className="mt-4">
          Web은 포트 3001, Docs는 3002(또는 설정된 포트), Storybook은 6006에서 실행됩니다.
        </Alert>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">빌드</h2>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`pnpm build`}
        </pre>
        <p className="mt-2 text-sm text-neutral-400">
          패키지를 먼저 빌드한 뒤 앱(web, docs, storybook)을 빌드합니다.
        </p>
      </section>
    </>
  );
}
