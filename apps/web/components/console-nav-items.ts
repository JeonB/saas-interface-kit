import { DOCS_BASE } from "../lib/config";

export type ConsoleNavGroup = "console" | "settings" | "docs";

export type ConsoleNavItem = {
  id: string;
  label: string;
  keywords: string;
  href: string;
  group: ConsoleNavGroup;
  external?: boolean;
  /** Single-character mnemonic for the `g` prefix shortcut (lowercase). */
  shortcutKey?: string;
};

export const CONSOLE_NAV_GROUP_HEADINGS: Record<ConsoleNavGroup, string> = {
  console: "콘솔",
  settings: "설정",
  docs: "문서",
};

export const CONSOLE_NAV_GROUP_ORDER: readonly ConsoleNavGroup[] = [
  "console",
  "settings",
  "docs",
];

export const CONSOLE_NAV_ITEMS: ConsoleNavItem[] = [
  { id: "overview", label: "개요", keywords: "대시보드 홈", href: "/console", group: "console", shortcutKey: "o" },
  {
    id: "notifications",
    label: "알림",
    keywords: "알림센터 알림 목록",
    href: "/console/notifications",
    group: "console",
    shortcutKey: "n",
  },
  {
    id: "integrations",
    label: "통합",
    keywords: "커넥터 통합 연동",
    href: "/console/integrations",
    group: "console",
    shortcutKey: "i",
  },
  {
    id: "workflows",
    label: "워크플로",
    keywords: "워크플로 자동화",
    href: "/console/workflows",
    group: "console",
    shortcutKey: "w",
  },
  {
    id: "runs",
    label: "실행 기록",
    keywords: "실행 기록 로그 history",
    href: "/console/runs",
    group: "console",
    shortcutKey: "r",
  },
  {
    id: "audit",
    label: "감사 로그",
    keywords: "감사 로그 audit",
    href: "/console/audit",
    group: "console",
    shortcutKey: "a",
  },
  { id: "members", label: "멤버", keywords: "팀 사용자", href: "/console/members", group: "console" },
  { id: "settings", label: "조직 설정", keywords: "설정 조직", href: "/console/settings", group: "settings" },
  {
    id: "billing",
    label: "청구",
    keywords: "결제 구독",
    href: "/console/settings/billing",
    group: "settings",
  },
  {
    id: "docs",
    label: "문서",
    keywords: "가이드 디자인 시스템",
    href: `${DOCS_BASE}/docs`,
    group: "docs",
    external: true,
  },
  {
    id: "getting-started",
    label: "시작하기",
    keywords: "온보딩 튜토리얼",
    href: `${DOCS_BASE}/docs/getting-started`,
    group: "docs",
    external: true,
  },
  { id: "marketing", label: "마케팅 홈", keywords: "랜딩", href: "/", group: "docs" },
];
