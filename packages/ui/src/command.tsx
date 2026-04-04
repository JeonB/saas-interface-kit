import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";
import { Input } from "./input";

export {
  Dialog as Command,
  DialogClose as CommandClose,
  DialogContent as CommandContent,
  DialogDescription as CommandDescription,
  DialogFooter as CommandFooter,
  DialogHeader as CommandHeader,
  DialogTitle as CommandTitle,
  DialogTrigger as CommandTrigger,
} from "./dialog";
export type {
  DialogProps as CommandProps,
  DialogTriggerProps as CommandTriggerProps,
} from "./dialog";

export type CommandInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  /** Controlled filter string for the palette. */
  value: string;
  onValueChange: (value: string) => void;
};

export function CommandInput({
  className,
  onValueChange,
  value,
  ...rest
}: CommandInputProps) {
  return (
    <Input
      autoComplete="off"
      autoFocus
      className={cn("ui:rounded-b-none ui:border-0 ui:border-b ui:border-border-subtle", className)}
      name="commandSearch"
      onChange={(e) => {
        onValueChange(e.target.value);
      }}
      type="search"
      value={value}
      {...rest}
    />
  );
}

export type CommandListProps = {
  children: ReactNode;
  className?: string;
};

export function CommandList({ children, className }: CommandListProps) {
  return (
    <ul className={cn("ui:m-0 ui:max-h-72 ui:list-none ui:overflow-y-auto ui:p-2", className)} role="listbox">
      {children}
    </ul>
  );
}

export type CommandGroupProps = {
  children: ReactNode;
  className?: string;
  heading: string;
};

export function CommandGroup({ children, className, heading }: CommandGroupProps) {
  return (
    <li className={cn("ui:list-none", className)} role="presentation">
      <div className="ui:px-2 ui:pb-1 ui:pt-2 ui:text-xs ui:font-semibold ui:uppercase ui:tracking-wide ui:text-text-muted">
        {heading}
      </div>
      <ul className="ui:m-0 ui:list-none ui:space-y-0.5 ui:p-0">{children}</ul>
    </li>
  );
}

export type CommandItemProps = {
  children: ReactNode;
  className?: string;
  onSelect: () => void;
};

export function CommandItem({ children, className, onSelect }: CommandItemProps) {
  return (
    <li className="ui:list-none" role="presentation">
      <button
        className={cn(
          "ui:flex ui:w-full ui:cursor-pointer ui:items-center ui:rounded-ui-sm ui:px-3 ui:py-2 ui:text-left ui:text-sm ui:text-text-primary hover:ui:bg-surface-muted focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40",
          className,
        )}
        onClick={onSelect}
        role="option"
        type="button"
      >
        {children}
      </button>
    </li>
  );
}

export type CommandEmptyProps = {
  children: ReactNode;
  className?: string;
};

export function CommandEmpty({ children, className }: CommandEmptyProps) {
  return (
    <p className={cn("ui:px-4 ui:py-8 ui:text-center ui:text-sm ui:text-text-secondary", className)}>
      {children}
    </p>
  );
}
