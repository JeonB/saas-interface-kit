import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

/** Interactive control density (buttons, inputs, avatars). */
export type ComponentSize = "sm" | "md" | "lg";

/** Primary action semantics for buttons and similar controls. */
export type ComponentVariant = "default" | "primary" | "danger";

/** Inline status and alert semantics (maps to semantic color tokens). */
export type FeedbackVariant = "info" | "success" | "warning" | "error";

export type BaseComponentProps = {
  className?: string;
  children?: ReactNode;
};

/** Layout orientation for stacks, separators, toolbars. */
export type ComponentOrientation = "horizontal" | "vertical";

/** Async or process state for controls and surfaces. */
export type ComponentStatus = "idle" | "loading" | "error" | "success";

/** Ref type helper for polymorphic components. */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"];
