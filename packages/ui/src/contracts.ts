import type { ReactNode } from "react";

export type ComponentSize = "sm" | "md" | "lg";

export type ComponentVariant = "default" | "primary" | "danger";

export type BaseComponentProps = {
  className?: string;
  children?: ReactNode;
};
