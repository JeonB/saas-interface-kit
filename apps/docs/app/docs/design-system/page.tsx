import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";

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
        <h2 className="text-xl font-semibold text-white">API contract</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
          {PRINCIPLES.map((item) => (
            <li key={item}>{item}</li>
          ))}
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
