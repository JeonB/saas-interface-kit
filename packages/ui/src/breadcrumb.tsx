import type { ReactNode } from "react";
import { cn } from "./cn";

export type BreadcrumbProps = {
  children: ReactNode;
  className?: string;
};

export function Breadcrumb({ children, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="ui:m-0 ui:flex ui:list-none ui:flex-wrap ui:items-center ui:gap-2 ui:p-0 ui:text-sm">
        {children}
      </ol>
    </nav>
  );
}

export type BreadcrumbItemProps = {
  children: ReactNode;
  className?: string;
};

export function BreadcrumbItem({ children, className }: BreadcrumbItemProps) {
  return <li className={cn("ui:inline-flex ui:items-center ui:gap-2", className)}>{children}</li>;
}

export type BreadcrumbSeparatorProps = {
  children?: ReactNode;
};

export function BreadcrumbSeparator({ children = "/" }: BreadcrumbSeparatorProps) {
  return (
    <span aria-hidden className="ui:text-text-muted">
      {children}
    </span>
  );
}
