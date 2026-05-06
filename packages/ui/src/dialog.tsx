"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "./cn";

type DialogContextValue = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

const DialogContext = createContext<DialogContextValue | null>(null);

const DialogLabelIdContext = createContext<string | undefined>(undefined);

function useDialogContext(component: string): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(`${component} must be used within Dialog`);
  }
  return ctx;
}

export type DialogProps = {
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

export function Dialog({ children, onOpenChange, open }: DialogProps) {
  return (
    <DialogContext.Provider value={{ onOpenChange, open }}>{children}</DialogContext.Provider>
  );
}

export type DialogTriggerProps = {
  children: ReactNode;
  className?: string;
};

export function DialogTrigger({ children, className }: DialogTriggerProps) {
  const { onOpenChange } = useDialogContext("DialogTrigger");
  return (
    <button
      className={className}
      onClick={() => {
        onOpenChange(true);
      }}
      type="button"
    >
      {children}
    </button>
  );
}

export type DialogContentProps = {
  children: ReactNode;
  className?: string;
};

export function DialogContent({ children, className }: DialogContentProps) {
  const { onOpenChange, open } = useDialogContext("DialogContent");
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      if (!el.open) {
        el.showModal();
      }
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleClose = () => {
      onOpenChange(false);
    };
    el.addEventListener("close", handleClose);
    el.addEventListener("cancel", handleClose);
    return () => {
      el.removeEventListener("close", handleClose);
      el.removeEventListener("cancel", handleClose);
    };
  }, [onOpenChange]);

  return (
    <DialogLabelIdContext.Provider value={titleId}>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        className={cn(
          "ui:fixed ui:inset-0 ui:m-auto ui:max-h-[min(90vh,640px)] ui:w-[min(100vw-2rem,480px)] ui:max-w-full ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-0 ui:text-text-primary ui:shadow-ui-md open:ui:flex open:ui:flex-col backdrop:ui:bg-black/60",
          className,
        )}
      >
        {children}
      </dialog>
    </DialogLabelIdContext.Provider>
  );
}

export type DialogHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return <div className={cn("ui:border-b ui:border-border-subtle ui:px-6 ui:py-4", className)}>{children}</div>;
}

export type DialogTitleProps = {
  children: ReactNode;
  className?: string;
};

export function DialogTitle({ children, className }: DialogTitleProps) {
  const id = useContext(DialogLabelIdContext);
  return (
    <h2 className={cn("ui:text-lg ui:font-semibold ui:text-text-primary", className)} id={id}>
      {children}
    </h2>
  );
}

export type DialogDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return <p className={cn("ui:mt-1 ui:text-sm ui:text-text-secondary", className)}>{children}</p>;
}

export type DialogFooterProps = {
  children: ReactNode;
  className?: string;
};

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "ui:flex ui:flex-wrap ui:justify-end ui:gap-2 ui:border-t ui:border-border-subtle ui:px-6 ui:py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type DialogCloseProps = {
  children: ReactNode;
  className?: string;
};

export function DialogClose({ children, className }: DialogCloseProps) {
  const { onOpenChange } = useDialogContext("DialogClose");
  return (
    <button
      className={className}
      onClick={() => {
        onOpenChange(false);
      }}
      type="button"
    >
      {children}
    </button>
  );
}
