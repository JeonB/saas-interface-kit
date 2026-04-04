import type { ReactNode } from "react";

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
