import { Children, type ReactNode } from "react";
import { cn } from "./cn";

export type AvatarGroupProps = {
  children: ReactNode;
  className?: string;
  /** Max avatars before +N overflow text */
  max?: number;
};

export function AvatarGroup({ children, className, max = 4 }: AvatarGroupProps) {
  const items = Children.toArray(children);
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div className={cn("ui:flex ui:-space-x-2", className)}>
      {visible.map((child, i) => (
        <div
          className="ui:relative ui:inline-flex ui:ring-2 ui:ring-surface-canvas"
          key={i}
          style={{ zIndex: visible.length - i }}
        >
          {child}
        </div>
      ))}
      {overflow > 0 ? (
        <div
          className="ui:relative ui:z-0 ui:inline-flex ui:h-10 ui:w-10 ui:items-center ui:justify-center ui:rounded-full ui:bg-surface-overlay ui:text-xs ui:font-semibold ui:text-text-on-brand ui:ring-2 ui:ring-surface-canvas"
          role="img"
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </div>
      ) : null}
    </div>
  );
}
