import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type AppShellProps = {
  children: ReactNode;
  className?: string;
};

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div
      className={cn(
        "ui:grid ui:min-h-screen ui:grid-cols-1 ui:lg:grid-cols-[minmax(0,240px)_1fr] ui:bg-surface-canvas",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type AppShellSidebarProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function AppShellSidebar({ children, className, ...rest }: AppShellSidebarProps) {
  return (
    <aside
      className={cn(
        "ui:border-b ui:border-border-subtle ui:bg-surface-raised ui:lg:border-b-0 ui:lg:border-r",
        className,
      )}
      {...rest}
    >
      {children}
    </aside>
  );
}

export type AppShellMainProps = {
  children: ReactNode;
  className?: string;
};

export function AppShellMain({ children, className }: AppShellMainProps) {
  return (
    <div className={cn("ui:flex ui:min-h-0 ui:min-w-0 ui:flex-col", className)}>{children}</div>
  );
}

export type AppShellHeaderProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function AppShellHeader({ children, className, ...rest }: AppShellHeaderProps) {
  return (
    <header
      className={cn(
        "ui:border-b ui:border-border-subtle ui:bg-surface-raised ui:px-4 ui:py-3",
        className,
      )}
      {...rest}
    >
      {children}
    </header>
  );
}

export type AppShellContentProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function AppShellContent({ children, className, ...rest }: AppShellContentProps) {
  return (
    <main className={cn("ui:flex-1 ui:overflow-auto ui:p-4", className)} {...rest}>
      {children}
    </main>
  );
}
