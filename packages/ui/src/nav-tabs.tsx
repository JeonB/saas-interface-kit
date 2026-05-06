import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type NavTabsProps = {
  children: ReactNode;
  className?: string;
};

export function NavTabs({ children, className }: NavTabsProps) {
  return (
    <nav
      aria-label="섹션"
      className={cn("ui:flex ui:flex-wrap ui:gap-4 ui:border-b ui:border-border-subtle", className)}
    >
      {children}
    </nav>
  );
}

export type NavTabsItemProps = {
  active?: boolean;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function NavTabsItem({
  active = false,
  children,
  className,
  ...rest
}: NavTabsItemProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(
        "ui:-mb-px ui:inline-flex ui:border-b-2 ui:px-1 ui:pb-2 ui:text-sm ui:font-medium ui:transition-colors focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40",
        active
          ? "ui:border-semantic-brand ui:text-text-primary"
          : "ui:border-transparent ui:text-text-secondary hover:ui:text-text-primary",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
