import { type ReactNode } from "react";
import { cn } from "./cn";

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function Card({
  title,
  children,
  href,
  className,
}: {
  title: string;
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const external = isExternal(href);
  const resolvedHref = external
    ? `${href}${href.includes("?") ? "&" : "?"}utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo`
    : href;
  const baseClasses =
    "ui:group ui:rounded-ui-md ui:border ui:border-border-subtle ui:px-5 ui:py-4 ui:transition-colors hover:ui:border-border-default hover:ui:bg-surface-muted/40 ui:shadow-ui-sm";
  return (
    <a
      className={cn(baseClasses, className)}
      href={resolvedHref}
      {...(external && { rel: "noopener noreferrer", target: "_blank" })}
    >
      <h2 className="ui:mb-3 ui:text-2xl ui:font-semibold ui:text-text-primary">
        {title}{" "}
        <span className="ui:inline-block ui:transition-transform group-hover:ui:translate-x-1 motion-reduce:ui:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="ui:m-0 ui:max-w-[30ch] ui:text-sm ui:text-text-secondary">
        {children}
      </p>
    </a>
  );
}
