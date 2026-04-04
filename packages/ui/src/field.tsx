import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "./cn";

export type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Associates a label with a single form control. Clones the child to set `id`,
 * `aria-invalid`, and `aria-describedby` when hint or error is present.
 */
export function Field({ id, label, hint, error, className, children }: FieldProps) {
  const child = Children.only(children);
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  const control = isValidElement(child)
    ? cloneElement(child as ReactElement<Record<string, unknown>>, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })
    : child;

  return (
    <div className={cn("ui:flex ui:flex-col ui:gap-1.5", className)}>
      <label htmlFor={id} className="ui:text-sm ui:font-medium ui:text-text-primary">
        {label}
      </label>
      {control}
      {hint && !error ? (
        <p id={`${id}-hint`} className="ui:text-xs ui:text-text-secondary">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="ui:text-xs ui:text-semantic-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
