"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DOC_LINKS = [
  { label: "소개", href: "/docs" },
  { label: "Slack의 Cursor", href: "/docs/cursor-help" },
  { label: "시작하기", href: "/docs/getting-started" },
  { label: "파운데이션", href: "/docs/foundations" },
  { label: "모노레포", href: "/docs/monorepo" },
  { label: "패키지 / UI", href: "/docs/packages/ui" },
  { label: "디자인 시스템", href: "/docs/design-system" },
  { label: "컴포넌트 참고", href: "/docs/components" },
  { label: "품질 게이트", href: "/docs/quality-gates" },
  { label: "패턴", href: "/docs/patterns" },
  { label: "앱", href: "/docs/apps" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-neutral-800 bg-neutral-950 py-6">
      <nav aria-label="문서" className="px-4">
        <ul className="space-y-1">
          {DOC_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
