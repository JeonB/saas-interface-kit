import { Badge } from "@repo/ui/badge";
import Link from "next/link";

export default function CursorHelpPage() {
  return (
    <>
      <Badge className="mb-4" variant="default">
        Slack
      </Badge>
      <h1 className="text-3xl font-bold text-white">Slack의 Cursor</h1>
      <p className="mt-2 text-neutral-400">
        Slack에서 Cursor Cloud Agent를 멘션하는 방법입니다. 채널에서 이 요약이 필요하면{" "}
        <code className="rounded bg-neutral-800 px-1">@Cursor help</code>를 보내세요.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">무엇인가요</h2>
        <p className="mt-2 text-neutral-300">
          Cursor Cloud Agent는 Slack에서 코드 수정, 디버깅, 코드베이스 질문에 답할 수 있습니다.
          채널에서 <code className="rounded bg-neutral-800 px-1">@Cursor</code>를 멘션하고 필요한 일을 설명하세요.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">작업 시작하기</h2>
        <p className="mt-2 text-neutral-400">
          봇을 태그하고 평이한 문장으로 작업을 적으세요. 예를 들어 현재 스레드와 연결된 수정:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`@Cursor fix the issue we discussed in this thread`}
        </pre>
        <p className="mt-3 text-sm text-neutral-400">
          저장소, 오류 메시지, 스레드 맥락 등을 충분히 넣어 Agent가 추측하지 않도록 하세요.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">도움말 명령</h2>
        <p className="mt-2 text-neutral-400">
          기능, 팁, 고급 옵션은 다음을 보내세요.
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`@Cursor help`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">이 모노레포</h2>
        <p className="mt-2 text-neutral-300">
          로컬 개발과 디자인 시스템 문서는{" "}
          <Link className="text-white underline underline-offset-2 hover:text-neutral-200" href="/docs/getting-started">
            시작하기
          </Link>{" "}
          가이드와 이 문서 사이트의 나머지 페이지를 참고하세요.
        </p>
      </section>
    </>
  );
}
