import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";

const CHECKLIST = [
  { name: "Type safety", command: "pnpm check-types", desc: "컴포넌트 API 계약이 깨지지 않는지 확인" },
  { name: "Lint", command: "pnpm lint", desc: "일관된 코드 스타일과 잠재 이슈 검출" },
  { name: "UI tests", command: "pnpm test", desc: "핵심 컴포넌트 상호작용/접근성 회귀 방지" },
];

export default function QualityGatesPage() {
  return (
    <>
      <Badge className="mb-4" variant="warning">
        Reliability
      </Badge>
      <h1 className="text-3xl font-bold text-white">Quality gates</h1>
      <p className="mt-2 text-neutral-400">
        디자인 시스템 변경은 반드시 같은 체크 경로를 통과해야 합니다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Release checklist</h2>
        <div className="mt-4 space-y-3">
          {CHECKLIST.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-3"
            >
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="mt-1 text-sm text-neutral-400">{item.desc}</p>
              <code className="mt-2 block text-sm text-blue-300">{item.command}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Failure examples</h2>
        <Alert title="A11y regression" variant="error">
          role/aria가 없는 상태로 배포되는 경우를 테스트에서 차단합니다.
        </Alert>
        <Alert title="Variant drift" variant="warning">
          컴포넌트별 variant 이름이 달라지면 docs와 story가 즉시 불일치합니다.
        </Alert>
      </section>
    </>
  );
}
