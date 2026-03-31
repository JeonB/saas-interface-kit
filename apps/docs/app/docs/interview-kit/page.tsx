import { Badge } from "@repo/ui/badge";

const DEMO_STEPS = [
  "Button에 새로운 size 또는 variant 요구사항을 추가한다.",
  "Storybook에서 문서/예시를 확인하고 Do/Don't를 설명한다.",
  "Docs의 계약 문서와 품질 게이트 체크리스트를 함께 업데이트한다.",
  "web 또는 docs 앱에서 실제 사용 사례를 보여준다.",
];

const QA = [
  {
    q: "왜 컴포넌트를 더 많이 만들지 않았나요?",
    a: "양보다 운영 가능성을 우선했습니다. 재사용 API 계약과 품질 게이트가 먼저 있어야 확장이 안전합니다.",
  },
  {
    q: "이 구조가 협업에 어떤 이점을 주나요?",
    a: "새 컴포넌트 추가 경로를 구현-문서-검증으로 고정해서 온보딩과 리뷰 비용을 줄입니다.",
  },
  {
    q: "가장 큰 기술적 리스크는 무엇인가요?",
    a: "variant/size 기준이 흔들리면 스타일 drift가 발생합니다. 그래서 Storybook과 Docs를 동시에 업데이트하도록 프로세스를 만들었습니다.",
  },
];

export default function InterviewKitPage() {
  return (
    <>
      <Badge className="mb-4" variant="default">
        Interview
      </Badge>
      <h1 className="text-3xl font-bold text-white">Interview kit</h1>
      <p className="mt-2 text-neutral-400">
        5분 데모와 예상 질문을 중심으로, 설계 의도를 설명하는 자료입니다.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">5-minute demo flow</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-neutral-300">
          {DEMO_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Expected Q&amp;A</h2>
        <div className="mt-4 space-y-4">
          {QA.map((item) => (
            <div key={item.q} className="rounded-lg border border-neutral-800 p-4">
              <p className="text-sm font-semibold text-white">Q. {item.q}</p>
              <p className="mt-2 text-sm text-neutral-300">A. {item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Architecture snapshot</h2>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-xs text-neutral-300">
          {`flowchart LR
  appsWeb[apps/web] --> uiPkg[@repo/ui]
  appsDocs[apps/docs] --> uiPkg
  storybook[apps/storybook] --> uiPkg
  uiPkg --> docsContracts[docs/design-system]
  uiPkg --> qualityGates[docs/quality-gates]
`}
        </pre>
      </section>
    </>
  );
}
