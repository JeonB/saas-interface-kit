import type { HTMLAttributes } from "react";
import { cn } from "./cn";
import type { BaseComponentProps } from "./contracts";

export function Card({ className, children, ...rest }: BaseComponentProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised ui:shadow-ui-sm",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: BaseComponentProps) {
  return <div className={cn("ui:flex ui:flex-col ui:gap-1.5 ui:px-5 ui:pt-5", className)}>{children}</div>;
}

export function CardTitle({ className, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("ui:text-lg ui:font-semibold ui:leading-ui-tight ui:text-text-primary", className)} {...rest}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: BaseComponentProps) {
  return <p className={cn("ui:text-sm ui:leading-ui-normal ui:text-text-secondary", className)}>{children}</p>;
}

export function CardBody({ className, children }: BaseComponentProps) {
  return <div className={cn("ui:px-5 ui:py-4", className)}>{children}</div>;
}

export function CardFooter({ className, children }: BaseComponentProps) {
  return (
    <div
      className={cn(
        "ui:flex ui:flex-wrap ui:items-center ui:gap-2 ui:border-t ui:border-border-subtle ui:px-5 ui:py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
