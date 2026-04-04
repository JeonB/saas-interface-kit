import type { ReactNode } from "react";
import { cn } from "./cn";

export type KPIGridProps = {
  children: ReactNode;
  className?: string;
};

export function KPIGrid({ children, className }: KPIGridProps) {
  return (
    <div
      className={cn(
        "ui:grid ui:gap-4 ui:sm:grid-cols-2 ui:lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
