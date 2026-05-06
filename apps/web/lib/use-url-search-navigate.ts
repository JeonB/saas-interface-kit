"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

export type NavigateMode = "push" | "replace";

export type UrlSearchNavigate = {
  navigate: (mutate: (params: URLSearchParams) => void, mode?: NavigateMode) => void;
  isPending: boolean;
};

/**
 * Wraps `usePathname` + `useRouter` + `useTransition` so console filter
 * components can mutate `URLSearchParams` and navigate without re-implementing
 * the same `replace`/`push` glue four times.
 */
export function useUrlSearchNavigate(defaultMode: NavigateMode = "replace"): UrlSearchNavigate {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (mutate: (params: URLSearchParams) => void, mode: NavigateMode = defaultMode) => {
      const params = new URLSearchParams(window.location.search);
      mutate(params);
      const nextQuery = params.toString();
      const target = nextQuery.length > 0 ? `${pathname}?${nextQuery}` : pathname;
      const navigateFn = () => {
        if (mode === "push") {
          router.push(target);
        } else {
          router.replace(target);
        }
      };
      if (mode === "push") {
        navigateFn();
        return;
      }
      startTransition(navigateFn);
    },
    [defaultMode, pathname, router],
  );

  return { navigate, isPending };
}
