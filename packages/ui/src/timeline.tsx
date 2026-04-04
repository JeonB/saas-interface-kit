import type { ReactNode } from "react";
import { cn } from "./cn";

export type TimelineItemProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  time?: string;
};

export function TimelineItem({ children, className, icon, time }: TimelineItemProps) {
  return (
    <li className={cn("ui:relative ui:flex ui:gap-3 ui:pb-6 last:ui:pb-0", className)}>
      <div className="ui:flex ui:flex-col ui:items-center">
        <div className="ui:flex ui:h-8 ui:w-8 ui:shrink-0 ui:items-center ui:justify-center ui:rounded-full ui:bg-surface-muted ui:text-text-primary">
          {icon ?? <span className="ui:h-2 ui:w-2 ui:rounded-full ui:bg-semantic-brand" aria-hidden />}
        </div>
        <div aria-hidden className="ts-connector ui:mt-1 ui:min-h-4 ui:w-px ui:flex-1 ui:bg-border-subtle" />
      </div>
      <div className="ui:min-w-0 ui:flex-1 ui:pt-0.5">
        {time ? (
          <time className="ui:text-xs ui:font-medium ui:text-text-muted">{time}</time>
        ) : null}
        <div className={cn(time ? "ui:mt-1" : "", "ui:text-sm ui:text-text-primary")}>{children}</div>
      </div>
    </li>
  );
}

export type TimelineProps = {
  children: ReactNode;
  className?: string;
};

export function Timeline({ children, className }: TimelineProps) {
  return (
    <ul
      className={cn(
        "ui:m-0 ui:list-none ui:p-0 [&>li:last-child_.ts-connector]:ui:hidden",
        className,
      )}
    >
      {children}
    </ul>
  );
}
