import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "./cn";

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext(component: string): DropdownContextValue {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(`${component} must be used within DropdownMenu`);
  }
  return ctx;
}

export type DropdownMenuProps = {
  children: ReactNode;
  className?: string;
};

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: globalThis.MouseEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, rootRef, setOpen }}>
      <div className={cn("ui:relative ui:inline-block ui:text-left", className)} ref={rootRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export type DropdownMenuTriggerProps = {
  children: ReactElement<Record<string, unknown>>;
};

export function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownContext("DropdownMenuTrigger");
  if (!isValidElement(children)) {
    throw new Error("DropdownMenuTrigger expects a single React element.");
  }
  const childProps = children.props as { onClick?: (e: ReactMouseEvent<HTMLElement>) => void };
  return cloneElement(children, {
    "aria-expanded": open,
    "aria-haspopup": "menu",
    onClick: (e: ReactMouseEvent<HTMLElement>) => {
      childProps.onClick?.(e);
      setOpen(!open);
    },
  } as never);
}

export type DropdownMenuContentProps = {
  children: ReactNode;
  className?: string;
};

export function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
  const { open } = useDropdownContext("DropdownMenuContent");
  if (!open) {
    return null;
  }
  return (
    <div
      className={cn(
        "ui:absolute ui:left-0 ui:top-full ui:z-[var(--z-index-ui-dropdown)] ui:mt-1 ui:min-w-[12rem] ui:rounded-ui-md ui:border ui:border-border-default ui:bg-surface-raised ui:p-1 ui:shadow-ui-md",
        className,
      )}
      role="menu"
    >
      {children}
    </div>
  );
}

export type DropdownMenuItemProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function DropdownMenuItem({ children, className, onClick }: DropdownMenuItemProps) {
  const { setOpen } = useDropdownContext("DropdownMenuItem");
  return (
    <button
      className={cn(
        "ui:block ui:w-full ui:rounded-ui-sm ui:px-3 ui:py-2 ui:text-left ui:text-sm ui:text-text-primary hover:ui:bg-surface-muted focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40",
        className,
      )}
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      role="menuitem"
      type="button"
    >
      {children}
    </button>
  );
}
