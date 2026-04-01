import { Badge } from "@repo/ui/badge";

const DEMO_STEPS = [
  "Button에 새로운 size 또는 variant 요구사항을 추가한다.",
  "Storybook에서 문서/예시를 확인하고 Do/Don't를 설명한다.",
  "Docs의 계약 문서와 품질 게이트 체크리스트를 함께 업데이트한다.",
  "web 또는 docs 앱에서 실제 사용 사례를 보여준다.",
];

const STORYLINE = [
  {
    label: "문제",
    text: "앱별로 버튼/알림 스타일이 조금씩 달라지고, 문서가 코드 변경을 따라오지 못했습니다.",
  },
  {
    label: "해결",
    text: "공통 UI 계약(variant/size/className)과 Storybook+Docs 동시 업데이트 규칙, 그리고 품질 게이트를 한 흐름으로 묶었습니다.",
  },
  {
    label: "효과",
    text: "새 컴포넌트 변경 시 리뷰 기준이 명확해졌고, 온보딩과 회귀 대응 비용이 줄었습니다.",
  },
];

const TIMED_SCRIPT = [
  { time: "0:00-0:40", script: "프로젝트 배경과 문제를 1문장으로 설명합니다." },
  {
    time: "0:40-2:00",
    script:
      "Button 컴포넌트 코드를 보여주며 variant/size/disabled와 타입 계약을 설명합니다.",
  },
  {
    time: "2:00-3:20",
    script:
      "Storybook에서 Do/Don't와 사이즈 스토리를 보여주며 API 계약이 문서로 이어지는 흐름을 설명합니다.",
  },
  {
    time: "3:20-4:20",
    script:
      "Quality gates 페이지에서 lint/check-types/test 경로를 보여주고 회귀 방지 전략을 설명합니다.",
  },
  {
    time: "4:20-5:00",
    script:
      "문제-해결-효과 3문장으로 마무리하고 예상 질문(성능/접근성/타입/협업)으로 넘어갑니다.",
  },
];

const QA = [
  {
    q: "성능 측면에서 디자인 시스템으로 얻은 이점은 무엇인가요?",
    a: "컴포넌트 API를 고정하면서 페이지별 임의 스타일 오버라이드를 줄였습니다. 덕분에 변경 영향 범위를 예측하기 쉬워졌고, 불필요한 재작업과 시각적 회귀를 줄여 결과적으로 개발/리뷰 사이클이 빨라졌습니다.",
  },
  {
    q: "접근성은 어떻게 기본기 수준으로 보장했나요?",
    a: "컴포넌트 내부에서 기본 접근성 속성을 우선 보장했습니다. 예를 들어 Alert는 role을 명시하고, disabled 버튼 상태를 테스트로 검증해 접근성 회귀를 사전에 막는 구조를 만들었습니다.",
  },
  {
    q: "타입 안정성은 어떤 기준으로 관리했나요?",
    a: "variant와 size를 유니온 타입으로 제한해 허용되지 않은 조합이 컴파일 단계에서 막히도록 했습니다. 이 계약이 Storybook controls와도 동일하게 연결되어 문서-코드 불일치를 최소화했습니다.",
  },
  {
    q: "협업 관점에서 가장 큰 변화는 무엇인가요?",
    a: "컴포넌트 변경 경로를 구현→스토리→문서→품질게이트로 고정했습니다. 그래서 리뷰할 때 \"무엇을 확인해야 하는지\"가 표준화되어 팀 내 커뮤니케이션 비용이 줄었습니다.",
  },
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
        <h2 className="text-xl font-semibold text-white">3-sentence storyline</h2>
        <div className="mt-4 space-y-3">
          {STORYLINE.map((item) => (
            <div key={item.label} className="rounded-lg border border-neutral-800 p-4">
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-2 text-sm text-neutral-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">5-minute demo flow</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-neutral-300">
          {DEMO_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Timed script (5 minutes)</h2>
        <div className="mt-4 space-y-3">
          {TIMED_SCRIPT.map((item) => (
            <div key={item.time} className="rounded-lg border border-neutral-800 p-4">
              <p className="text-sm font-semibold text-white">{item.time}</p>
              <p className="mt-2 text-sm text-neutral-300">{item.script}</p>
            </div>
          ))}
        </div>
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
