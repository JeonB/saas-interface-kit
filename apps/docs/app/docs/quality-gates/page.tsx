import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";

const CHECKLIST = [
  {
    name: "Type safety",
    command: "pnpm check-types",
    desc: "Turbo가 @repo/ui 빌드(dist)를 먼저 실행한 뒤 앱 타입체크를 돌립니다. API 계약과 서브패스 import가 맞는지 확인합니다.",
  },
  { name: "Lint", command: "pnpm lint", desc: "일관된 코드 스타일과 잠재 이슈 검출" },
  { name: "UI tests", command: "pnpm test", desc: "핵심 컴포넌트 상호작용/접근성 회귀 방지" },
  {
    name: "Bundle size",
    command: "pnpm --filter @repo/ui build && pnpm --filter @repo/ui size",
    desc: "size-limit으로 dist 번들 상한을 CI에서 함께 검증합니다.",
  },
  {
    name: "CI (GitHub Actions)",
    command: ".github/workflows/ci.yml",
    desc: "PR/푸시 시 lint, 타입체크, 테스트, UI 빌드, size-limit을 자동 실행합니다.",
  },
  {
    name: "Changesets",
    command: "pnpm changeset && pnpm version-packages",
    desc: "워크스페이스 패키지 버전과 CHANGELOG를 관리합니다 (@changesets/cli).",
  },
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
        <h2 className="text-xl font-semibold text-white">Storybook</h2>
        <p className="text-sm text-neutral-300">
          Run <code className="text-blue-300">pnpm --filter storybook dev</code> for interactive review. The a11y addon
          surfaces roles and contrast issues early; keep stories aligned with the docs templates (usage, a11y, Do
          / Don&apos;t).
        </p>
        <p className="text-sm text-neutral-300">
          시각 회귀는 Chromatic 등 외부 서비스와 연동할 수 있습니다. 템플릿은{" "}
          <code className="text-blue-300">.github/workflows/chromatic.yml</code>를 참고하고, 저장소 시크릿에{" "}
          <code className="text-blue-300">CHROMATIC_PROJECT_TOKEN</code>을 설정한 뒤 워크플로의{" "}
          <code className="text-blue-300">if: false</code>를 제거하세요.
        </p>
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
