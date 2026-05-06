"use client";

import {
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "./cn";

export type CheckboxProps = {
  id: string;
  label: ReactNode;
  indeterminate?: boolean;
  ref?: Ref<HTMLInputElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "size" | "type">;

const inputClass =
  "ui:h-4 ui:w-4 ui:shrink-0 ui:rounded-ui-sm ui:border ui:border-border-default ui:bg-surface-raised ui:text-semantic-brand focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40 disabled:ui:cursor-not-allowed disabled:ui:opacity-50";

export function Checkbox({
  id,
  label,
  indeterminate = false,
  className,
  ref: refFromProps,
  ...rest
}: CheckboxProps) {
  const localRef = useRef<HTMLInputElement | null>(null);

  const setRefs = (el: HTMLInputElement | null) => {
    localRef.current = el;
    if (typeof refFromProps === "function") {
      refFromProps(el);
    } else if (refFromProps) {
      (refFromProps as MutableRefObject<HTMLInputElement | null>).current = el;
    }
  };

  useEffect(() => {
    const el = localRef.current;
    if (el) {
      el.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={cn("ui:flex ui:items-start ui:gap-2", className)}>
      <input
        ref={setRefs}
        className={inputClass}
        id={id}
        type="checkbox"
        {...rest}
      />
      <label className="ui:text-sm ui:leading-ui-normal ui:text-text-primary" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
