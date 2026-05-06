"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandClose,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandHeader,
  CommandInput,
  CommandItem,
  CommandList,
  CommandTitle,
} from "@repo/ui/command";
import { DOCS_BASE } from "../lib/config";

type NavGroup = "console" | "settings" | "docs";

type NavItem = {
  id: string;
  label: string;
  keywords: string;
  href: string;
  group: NavGroup;
  external?: boolean;
  /** Single-character mnemonic for the `g` prefix shortcut (lowercase). */
  shortcutKey?: string;
};

const GROUP_HEADINGS: Record<NavGroup, string> = {
  console: "콘솔",
  settings: "설정",
  docs: "문서",
};

const NAV_ITEMS: NavItem[] = [
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

const GROUP_ORDER: readonly NavGroup[] = ["console", "settings", "docs"];

const SHORTCUT_BY_KEY: ReadonlyMap<string, NavItem> = new Map(
  NAV_ITEMS.flatMap((item) => (item.shortcutKey ? [[item.shortcutKey, item] as const] : [])),
);

const G_PREFIX_TIMEOUT_MS = 1200;

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function matchesQuery(item: NavItem, q: string): boolean {
  if (!q) return true;
  const n = normalize(q);
  const hay = normalize(`${item.label} ${item.keywords}`);
  return hay.includes(n);
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export function ConsoleCommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const gPrefixTimerRef = useRef<number | null>(null);
  const gPrefixActiveRef = useRef(false);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setSearch("");
    }
  }, []);

  const navigateTo = useCallback(
    (item: NavItem) => {
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(item.href);
    },
    [router],
  );

  const clearGPrefix = useCallback(() => {
    gPrefixActiveRef.current = false;
    if (gPrefixTimerRef.current !== null) {
      window.clearTimeout(gPrefixTimerRef.current);
      gPrefixTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (isEditableTarget(e.target)) return;

      const isPalette = (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
      if (isPalette) {
        e.preventDefault();
        clearGPrefix();
        setOpen((prev) => !prev);
        setSearch("");
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (gPrefixActiveRef.current) {
        const target = SHORTCUT_BY_KEY.get(e.key.toLowerCase());
        clearGPrefix();
        if (target) {
          e.preventDefault();
          setOpen(false);
          setSearch("");
          navigateTo(target);
        }
        return;
      }

      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        gPrefixActiveRef.current = true;
        if (gPrefixTimerRef.current !== null) {
          window.clearTimeout(gPrefixTimerRef.current);
        }
        gPrefixTimerRef.current = window.setTimeout(clearGPrefix, G_PREFIX_TIMEOUT_MS);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearGPrefix();
    };
  }, [clearGPrefix, navigateTo]);

  const filteredByGroup = useMemo(() => {
    const map = new Map<NavGroup, NavItem[]>();
    for (const group of GROUP_ORDER) {
      map.set(group, []);
    }
    for (const item of NAV_ITEMS) {
      if (matchesQuery(item, search)) {
        map.get(item.group)?.push(item);
      }
    }
    return map;
  }, [search]);

  const totalMatches = useMemo(
    () => Array.from(filteredByGroup.values()).reduce((sum, items) => sum + items.length, 0),
    [filteredByGroup],
  );

  const go = useCallback(
    (item: NavItem) => {
      setOpen(false);
      setSearch("");
      navigateTo(item);
    },
    [navigateTo],
  );

  return (
    <Command onOpenChange={handleOpenChange} open={open}>
      <CommandContent className="ui:max-h-[min(85vh,560px)] ui:w-[min(100vw-2rem,480px)]">
        <CommandHeader>
          <div className="ui:flex ui:items-start ui:justify-between ui:gap-3">
            <div>
              <CommandTitle>빠른 이동</CommandTitle>
              <p className="ui:mt-1 ui:text-xs ui:text-text-muted">
                <kbd className="ui:rounded ui:border ui:border-border-subtle ui:bg-surface-muted ui:px-1 ui:py-0.5 ui:font-mono ui:text-[10px]">
                  ⌘ / Ctrl
                </kbd>
                <span className="ui:mx-0.5">+</span>
                <kbd className="ui:rounded ui:border ui:border-border-subtle ui:bg-surface-muted ui:px-1 ui:py-0.5 ui:font-mono ui:text-[10px]">
                  K
                </kbd>
                <span className="ui:ml-1">로 닫기·열기,</span>
                <kbd className="ui:ml-1 ui:rounded ui:border ui:border-border-subtle ui:bg-surface-muted ui:px-1 ui:py-0.5 ui:font-mono ui:text-[10px]">
                  G
                </kbd>
                <span className="ui:ml-1">+ 키로 빠르게 이동</span>
              </p>
            </div>
            <CommandClose className="ui:shrink-0 ui:rounded-ui-sm ui:px-2 ui:py-1 ui:text-xs ui:text-text-muted hover:ui:bg-surface-muted">
              닫기
            </CommandClose>
          </div>
        </CommandHeader>
        <CommandInput
          aria-label="페이지 검색"
          name="consoleCommandSearch"
          onValueChange={setSearch}
          placeholder="페이지 검색…"
          value={search}
        />
        <CommandList>
          {totalMatches === 0 ? (
            <CommandEmpty>일치하는 페이지가 없습니다.</CommandEmpty>
          ) : (
            GROUP_ORDER.map((group) => {
              const items = filteredByGroup.get(group) ?? [];
              if (items.length === 0) return null;
              return (
                <CommandGroup heading={GROUP_HEADINGS[group]} key={group}>
                  {items.map((item) => (
                    <CommandItem key={item.id} onSelect={() => go(item)}>
                      <span className="ui:flex ui:w-full ui:items-center ui:justify-between ui:gap-2">
                        <span>{item.label}</span>
                        <span className="ui:flex ui:items-center ui:gap-2 ui:text-xs ui:font-normal ui:text-text-muted">
                          {item.shortcutKey ? (
                            <span className="ui:flex ui:items-center ui:gap-1">
                              <kbd className="ui:rounded ui:border ui:border-border-subtle ui:bg-surface-muted ui:px-1 ui:py-0.5 ui:font-mono ui:text-[10px]">
                                G
                              </kbd>
                              <kbd className="ui:rounded ui:border ui:border-border-subtle ui:bg-surface-muted ui:px-1 ui:py-0.5 ui:font-mono ui:text-[10px] ui:uppercase">
                                {item.shortcutKey}
                              </kbd>
                            </span>
                          ) : null}
                          {item.external ? <span>새 탭</span> : null}
                        </span>
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })
          )}
        </CommandList>
      </CommandContent>
    </Command>
  );
}
