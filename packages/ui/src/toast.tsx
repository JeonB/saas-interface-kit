import { FloatingPortal } from "@floating-ui/react";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "./cn";
import type { FeedbackVariant } from "./contracts";

type ToastPayload = {
  message: string;
  title?: string;
  variant?: FeedbackVariant;
};

type ToastRecord = ToastPayload & { id: string };

type ToastContextValue = {
  toast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 4500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastRecord[]>([]);
  const regionId = useId();

  const toast = useCallback((payload: ToastPayload) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setItems((prev) => [...prev, { ...payload, id }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, AUTO_DISMISS_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <FloatingPortal>
        <div
          aria-live="polite"
          aria-relevant="additions"
          className="ui:pointer-events-none ui:fixed ui:bottom-4 ui:right-4 ui:z-[var(--z-index-ui-toast)] ui:flex ui:w-[min(100vw-2rem,360px)] ui:flex-col ui:gap-2"
          id={regionId}
        >
          {items.map((t) => (
            <ToastSurface key={t.id} {...t} />
          ))}
        </div>
      </FloatingPortal>
    </ToastContext.Provider>
  );
}

function ToastSurface({ message, title, variant = "info" }: ToastRecord) {
  const tone = toastTone(variant);
  return (
    <div
      className={cn(
        "ui:pointer-events-auto ui:rounded-ui-md ui:border ui:px-4 ui:py-3 ui:shadow-ui-md",
        tone,
      )}
      role="status"
    >
      {title ? <p className="ui:text-sm ui:font-semibold">{title}</p> : null}
      <p className={cn("ui:text-sm", title ? "ui:mt-1" : "")}>{message}</p>
    </div>
  );
}

function toastTone(variant: FeedbackVariant): string {
  switch (variant) {
    case "success":
      return "ui:border-semantic-success/40 ui:bg-surface-raised ui:text-semantic-success";
    case "warning":
      return "ui:border-semantic-warning/40 ui:bg-surface-raised ui:text-semantic-warning";
    case "error":
      return "ui:border-semantic-danger/40 ui:bg-surface-raised ui:text-semantic-danger";
    case "info":
    default:
      return "ui:border-semantic-info/40 ui:bg-surface-raised ui:text-semantic-info";
  }
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
