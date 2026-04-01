import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import Link from "next/link";

const PRINCIPLES = [
  "모든 컴포넌트는 className을 추가 확장 용도로만 사용한다.",
  "variant는 의미(역할), size는 밀도(시각적 계층)를 표현한다.",
  "기본 상태(disabled, role, aria)는 컴포넌트 내부에서 보장한다.",
  "새 컴포넌트는 구현과 동시에 Storybook 문서와 Docs 가이드를 같이 업데이트한다.",
];

export default function DesignSystemPage() {
  return (
    <>
      <Badge className="mb-4" variant="success">
        Design system
      </Badge>
      <h1 className="text-3xl font-bold text-white">Design system principles</h1>
      <p className="mt-2 text-neutral-400">
        `@repo/ui`는 화면 구현 도구가 아니라, 팀이 반복적으로 같은 품질을
        내도록 돕는 운영 계약입니다.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Start here (20 minutes)</h2>
        <ol className="list-decimal space-y-2 pl-6 text-sm text-neutral-300">
          <li>
            <Link href="/docs" className="text-blue-300 underline-offset-2 hover:underline">
              Docs introduction
            </Link>
            에서 문제-해결-효과 전체 흐름을 먼저 확인합니다.
          </li>
          <li>
            <Link
              href="/docs/quality-gates"
              className="text-blue-300 underline-offset-2 hover:underline"
            >
              Quality gates
            </Link>
            로 이동해 왜 타입/린트/테스트를 한 경로로 묶었는지 파악합니다.
          </li>
          <li>
            <Link
              href="/docs/interview-kit"
              className="text-blue-300 underline-offset-2 hover:underline"
            >
              Interview kit
            </Link>
            에서 5분 데모 흐름과 예상 질문 답변 템플릿을 확인합니다.
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">API contract</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
          {PRINCIPLES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Evidence checklist</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
          <li>Button 컴포넌트에서 variant/size/disabled가 타입으로 강제되는지 확인</li>
          <li>Storybook Button 스토리에서 Do/Don&apos;t가 API 계약과 일치하는지 확인</li>
          <li>품질 게이트 페이지 체크리스트가 실제 실행 명령과 맞는지 확인</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Do and don&apos;t</h2>
        <Alert title="Do" variant="success">
          페이지별 스타일 편차를 줄이기 위해 variant와 size를 우선 사용하세요.
        </Alert>
        <Alert title="Don&apos;t" variant="warning">
          컴포넌트마다 임의의 className으로 디자인 토큰을 재정의하지 마세요.
        </Alert>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Quick example</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="default">
            Secondary
          </Button>
          <Button size="md" variant="primary">
            Primary
          </Button>
          <Button size="lg" variant="danger">
            Delete
          </Button>
        </div>
      </section>
    </>
  );
}
