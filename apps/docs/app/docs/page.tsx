import Link from "next/link";
import { Badge } from "@repo/ui/badge";

const SECTIONS = [
  {
    title: "Slack의 Cursor",
    href: "/docs/cursor-help",
    description: "@Cursor 멘션, 작업 시작 방법, Cloud Agent용 @Cursor help 명령입니다.",
  },
  { title: "시작하기", href: "/docs/getting-started", description: "설치, pnpm, Turbo로 실행하기." },
  { title: "파운데이션", href: "/docs/foundations", description: "디자인 토큰, 테마 위치, 시맨틱 역할." },
  { title: "모노레포", href: "/docs/monorepo", description: "패키지 구조, 워크스페이스, 의존성." },
  { title: "패키지 / UI", href: "/docs/packages/ui", description: "@repo/ui 개요와 사용법." },
  { title: "디자인 시스템", href: "/docs/design-system", description: "컴포넌트 API 계약과 운영 원칙." },
  { title: "컴포넌트 참고", href: "/docs/components", description: "@repo/ui 컴포넌트별 API와 예시." },
  { title: "품질 게이트", href: "/docs/quality-gates", description: "타입, 린트, 접근성, 테스트로 UI 변경을 안정적으로." },
  { title: "패턴", href: "/docs/patterns", description: "폼, 대시보드, 커맨드 팔레트, URL 상태 등 조합 레시피." },
  { title: "앱", href: "/docs/apps", description: "Web, Docs, Storybook 앱." },
];

export default function DocsIntroPage() {
  return (
    <>
      <Badge variant="success" className="mb-4">
        문서
      </Badge>
      <h1 className="text-3xl font-bold text-white">문서</h1>
      <p className="mt-2 text-neutral-400">
        Turbo Repo 모노레포 문서에 오신 것을 환영합니다. 사이드바에서 원하는 항목으로 이동하세요.
      </p>
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">섹션</h2>
        <ul className="mt-4 space-y-3">
          {SECTIONS.map(({ title, href, description }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-lg border border-transparent px-4 py-3 text-neutral-300 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30 hover:text-white"
              >
                <span className="font-medium">{title}</span>
                <span className="mt-1 block text-sm text-neutral-400">
                  {description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
