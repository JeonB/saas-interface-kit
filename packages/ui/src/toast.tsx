"use client";

import { FloatingPortal } from "@floating-ui/react";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
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
  dismiss: (id: string) => void;
  toast: (payload: ToastPayload) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 4500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastRecord[]>([]);
  const regionId = useId();
  const timersRef = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    const timerId = timersRef.current[id];
    if (timerId) {
      window.clearTimeout(timerId);
      delete timersRef.current[id];
    }
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const scheduleDismiss = useCallback(
    (id: string) => {
      const timerId = window.setTimeout(() => {
        setItems((prev) => prev.filter((t) => t.id !== id));
        delete timersRef.current[id];
      }, AUTO_DISMISS_MS);
      timersRef.current[id] = timerId;
    },
    [],
  );

  const toast = useCallback((payload: ToastPayload) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setItems((prev) => [...prev, { ...payload, id }]);
    scheduleDismiss(id);
  }, [scheduleDismiss]);

  return (
    <ToastContext.Provider value={{ dismiss, toast }}>
      {children}
      <FloatingPortal>
        <div
          aria-atomic="true"
          aria-live="polite"
          aria-relevant="additions"
          className="ui:pointer-events-none ui:fixed ui:bottom-4 ui:right-4 ui:z-[var(--z-index-ui-toast)] ui:flex ui:w-[min(100vw-2rem,360px)] ui:flex-col ui:gap-2"
          id={regionId}
        >
          {items.map((t) => (
            <ToastSurface
              dismiss={dismiss}
              key={t.id}
              onPause={() => {
                const timerId = timersRef.current[t.id];
                if (timerId) {
                  window.clearTimeout(timerId);
                  delete timersRef.current[t.id];
                }
              }}
              onResume={() => {
                if (!timersRef.current[t.id]) {
                  scheduleDismiss(t.id);
                }
              }}
              {...t}
            />
          ))}
        </div>
      </FloatingPortal>
    </ToastContext.Provider>
  );
}

type ToastSurfaceProps = ToastRecord & {
  dismiss: (id: string) => void;
  onPause: () => void;
  onResume: () => void;
};

function ToastSurface({ message, title, variant = "info", id, dismiss, onPause, onResume }: ToastSurfaceProps) {
  const tone = toastTone(variant);
  return (
    <div
      className={cn(
        "ui:pointer-events-auto ui:rounded-ui-md ui:border ui:px-4 ui:py-3 ui:shadow-ui-md",
        tone,
      )}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      role="status"
    >
      <div className="ui:flex ui:items-start ui:justify-between ui:gap-2">
        <div>
          {title ? <p className="ui:text-sm ui:font-semibold">{title}</p> : null}
          <p className={cn("ui:text-sm", title ? "ui:mt-1" : "")}>{message}</p>
        </div>
        <button
          aria-label="닫기"
          className="ui:rounded-ui-sm ui:px-1 ui:py-0.5 ui:text-xs ui:opacity-80 hover:ui:opacity-100 focus-visible:ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-semantic-brand/40"
          onClick={() => {
            dismiss(id);
          }}
          type="button"
        >
          닫기
        </button>
      </div>
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
