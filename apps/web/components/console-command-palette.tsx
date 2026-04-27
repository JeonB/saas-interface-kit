"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

type NavItem = {
  id: string;
  label: string;
  keywords: string;
  href: string;
  external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "개요", keywords: "대시보드 홈", href: "/console" },
  { id: "members", label: "멤버", keywords: "팀 사용자", href: "/console/members" },
  { id: "settings", label: "조직 설정", keywords: "설정 조직", href: "/console/settings" },
  { id: "billing", label: "청구", keywords: "결제 구독", href: "/console/settings/billing" },
  {
    id: "docs",
    label: "문서",
    keywords: "가이드 디자인 시스템",
    href: `${DOCS_BASE}/docs`,
    external: true,
  },
  {
    id: "getting-started",
    label: "시작하기",
    keywords: "온보딩 튜토리얼",
    href: `${DOCS_BASE}/docs/getting-started`,
    external: true,
  },
  { id: "marketing", label: "마케팅 홈", keywords: "랜딩", href: "/", external: false },
];

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

function matchesQuery(item: NavItem, q: string): boolean {
  if (!q) return true;
  const n = normalize(q);
  const hay = normalize(`${item.label} ${item.keywords}`);
  return hay.includes(n);
}

export function ConsoleCommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      setSearch("");
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const isPalette = (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
      if (!isPalette) return;
      e.preventDefault();
      setOpen((prev) => !prev);
      setSearch("");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(
    () => NAV_ITEMS.filter((item) => matchesQuery(item, search)),
    [search],
  );

  const go = useCallback(
    (item: NavItem) => {
      setOpen(false);
      setSearch("");
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }
      router.push(item.href);
    },
    [router],
  );

  return (
    <Command onOpenChange={handleOpenChange} open={open}>
      <CommandContent className="ui:max-h-[min(85vh,520px)] ui:w-[min(100vw-2rem,440px)]">
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
                <span className="ui:ml-1">로 닫기·열기</span>
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
          {filtered.length === 0 ? (
            <CommandEmpty>일치하는 페이지가 없습니다.</CommandEmpty>
          ) : (
            <CommandGroup heading="콘솔·문서">
              {filtered.map((item) => (
                <CommandItem key={item.id} onSelect={() => go(item)}>
                  <span className="ui:flex ui:w-full ui:items-center ui:justify-between ui:gap-2">
                    <span>{item.label}</span>
                    {item.external ? (
                      <span className="ui:text-xs ui:font-normal ui:text-text-muted">새 탭</span>
                    ) : null}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandContent>
    </Command>
  );
}
