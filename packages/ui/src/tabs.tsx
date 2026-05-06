"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "./cn";

type TabsContextValue = {
  baseId: string;
  onValueChange: (value: string) => void;
  value: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be used within Tabs`);
  }
  return ctx;
}

export type TabsProps = {
  children: ReactNode;
  className?: string;
  onValueChange: (value: string) => void;
  value: string;
};

export function Tabs({ children, className, onValueChange, value }: TabsProps) {
  const reactId = useId();
  const baseId = `tabs-${reactId.replace(/:/g, "")}`;
  return (
    <TabsContext.Provider value={{ baseId, onValueChange, value }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export function TabsList({ children, className }: TabsListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const root = listRef.current;
    if (!root) return;
    const tabs = Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]'));
    const i = tabs.findIndex((el) => el === document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const next =
      e.key === "ArrowRight"
        ? tabs[(i + 1) % tabs.length]
        : tabs[(i - 1 + tabs.length) % tabs.length];
    next?.focus();
  }, []);

  return (
    <div
      ref={listRef}
      className={cn("ui:flex ui:gap-1 ui:border-b ui:border-border-subtle", className)}
      onKeyDown={onKeyDown}
      role="tablist"
    >
      {children}
    </div>
  );
}

export type TabsTriggerProps = {
  children: ReactNode;
  className?: string;
  value: string;
};

export function TabsTrigger({ children, className, value: triggerValue }: TabsTriggerProps) {
  const { baseId, onValueChange, value } = useTabsContext("TabsTrigger");
  const selected = value === triggerValue;
  const tabId = `${baseId}-tab-${triggerValue}`;
  const panelId = `${baseId}-panel-${triggerValue}`;

  return (
    <button
      aria-controls={panelId}
      aria-selected={selected}
      className={cn(
        "ui:-mb-px ui:rounded-t-ui-md ui:border ui:border-transparent ui:px-3 ui:py-2 ui:text-sm ui:font-medium ui:transition-colors focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40",
        selected
          ? "ui:border-border-subtle ui:border-b-surface-raised ui:bg-surface-raised ui:text-text-primary"
          : "ui:text-text-secondary hover:ui:text-text-primary",
        className,
      )}
      id={tabId}
      onClick={() => {
        onValueChange(triggerValue);
      }}
      role="tab"
      type="button"
    >
      {children}
    </button>
  );
}

export type TabsContentProps = {
  children: ReactNode;
  className?: string;
  value: string;
};

export function TabsContent({ children, className, value: contentValue }: TabsContentProps) {
  const { baseId, value } = useTabsContext("TabsContent");
  const selected = value === contentValue;
  const tabId = `${baseId}-tab-${contentValue}`;
  const panelId = `${baseId}-panel-${contentValue}`;

  if (!selected) {
    return null;
  }

  return (
    <div
      aria-labelledby={tabId}
      className={cn("ui:pt-4", className)}
      id={panelId}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  );
}
