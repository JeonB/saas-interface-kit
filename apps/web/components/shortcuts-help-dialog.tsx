"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/dialog";
import { CONSOLE_NAV_ITEMS } from "./console-nav-items";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="ui:inline-flex ui:min-w-[1.5rem] ui:items-center ui:justify-center ui:rounded ui:border ui:border-border-subtle ui:bg-surface-muted ui:px-1.5 ui:py-0.5 ui:font-mono ui:text-[11px] ui:text-text-primary">
      {children}
    </kbd>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="ui:flex ui:items-center ui:justify-between ui:gap-3 ui:py-2">
      <span className="ui:text-sm ui:text-text-secondary">{label}</span>
      <span className="ui:flex ui:items-center ui:gap-1">{children}</span>
    </li>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-wide ui:text-text-muted">
      {children}
    </h3>
  );
}

export function ShortcutsHelpDialog() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isEditableTarget(e.target)) return;
      if (e.key !== "?") return;
      e.preventDefault();
      setOpen((prev) => !prev);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const navItemsWithShortcut = CONSOLE_NAV_ITEMS.filter(
    (item) => item.shortcutKey !== undefined,
  );

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent className="ui:max-w-[min(100vw-2rem,520px)]">
        <DialogHeader>
          <DialogTitle>키보드 단축키</DialogTitle>
          <DialogDescription>
            입력창에 포커스가 있을 때는 단축키가 동작하지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="ui:px-6 ui:py-4">
          <section>
            <SectionHeading>팔레트</SectionHeading>
            <ul className="ui:mt-1.5 ui:divide-y ui:divide-border-subtle/60">
              <Row label="빠른 이동 팔레트 열기·닫기">
                <Kbd>⌘</Kbd>
                <span className="ui:text-text-muted">/</span>
                <Kbd>Ctrl</Kbd>
                <span className="ui:text-text-muted">+</span>
                <Kbd>K</Kbd>
              </Row>
            </ul>
          </section>
          <section className="ui:mt-5">
            <SectionHeading>페이지 점프 (G 다음에 키)</SectionHeading>
            <ul className="ui:mt-1.5 ui:divide-y ui:divide-border-subtle/60">
              {navItemsWithShortcut.map((item) => (
                <Row key={item.id} label={item.label}>
                  <Kbd>G</Kbd>
                  <span className="ui:text-text-muted">+</span>
                  <Kbd>
                    <span className="ui:uppercase">{item.shortcutKey}</span>
                  </Kbd>
                </Row>
              ))}
            </ul>
          </section>
          <section className="ui:mt-5">
            <SectionHeading>도움말</SectionHeading>
            <ul className="ui:mt-1.5 ui:divide-y ui:divide-border-subtle/60">
              <Row label="이 도움말 열기·닫기">
                <Kbd>?</Kbd>
              </Row>
            </ul>
          </section>
        </div>
        <DialogFooter>
          <DialogClose className="ui:rounded-ui-sm ui:px-3 ui:py-1.5 ui:text-sm ui:text-text-secondary hover:ui:bg-surface-muted hover:ui:text-text-primary">
            닫기
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
