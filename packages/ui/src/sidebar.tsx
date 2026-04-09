import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type SidebarProps = {
  children: ReactNode;
  className?: string;
};

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <nav aria-label="주 메뉴" className={cn("ui:flex ui:flex-col ui:gap-1 ui:p-3", className)}>
      {children}
    </nav>
  );
}

export type SidebarGroupProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

export function SidebarGroup({ children, className, label }: SidebarGroupProps) {
  return (
    <div className={cn("ui:py-2", className)}>
      <p className="ui:px-2 ui:text-xs ui:font-semibold ui:uppercase ui:tracking-wide ui:text-text-muted">
        {label}
      </p>
      <div className="ui:mt-1 ui:flex ui:flex-col ui:gap-0.5">{children}</div>
    </div>
  );
}

export type SidebarItemProps = {
  active?: boolean;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function SidebarItem({
  active = false,
  children,
  className,
  ...rest
}: SidebarItemProps) {
  return (
    <a
      className={cn(
        "ui:block ui:rounded-ui-md ui:px-2 ui:py-2 ui:text-sm ui:transition-colors focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40",
        active
          ? "ui:bg-surface-muted ui:font-medium ui:text-text-primary"
          : "ui:text-text-secondary hover:ui:bg-surface-muted/60 hover:ui:text-text-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
