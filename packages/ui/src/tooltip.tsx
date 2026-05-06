"use client";

import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";
import { cloneElement, isValidElement, useState, type ReactElement } from "react";
import { cn } from "./cn";

export type TooltipProps = {
  content: string;
  children: ReactElement;
  placement?: Placement;
  className?: string;
};

export function Tooltip({ content, children, placement = "top", className }: TooltipProps) {
  /* eslint-disable react-hooks/refs -- @floating-ui/react ref setter props */
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    onOpenChange: setOpen,
    open,
    placement,
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { close: 50, open: 120 }, move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getFloatingProps, getReferenceProps } = useInteractions([hover, focus, dismiss, role]);

  if (!isValidElement(children)) {
    throw new Error("Tooltip expects a single React element child.");
  }

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs.setReference }))}
      {open ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={cn(
              "ui:z-[var(--z-index-ui-tooltip)] ui:max-w-xs ui:rounded-ui-sm ui:border ui:border-border-default ui:bg-surface-overlay ui:px-2 ui:py-1.5 ui:text-xs ui:font-medium ui:text-text-primary ui:shadow-ui-md",
              className,
            )}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      ) : null}
    </>
  );
}
