"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "northline-notifications-v1";
const STORE_EVENT = "northline-notifications-read-change";

type Persisted = {
  readIds: string[];
};

function parsePersisted(raw: string): ReadonlySet<string> {
  if (!raw) {
    return new Set();
  }
  try {
    const parsed = JSON.parse(raw) as Persisted;
    return new Set(parsed.readIds ?? []);
  } catch {
    return new Set();
  }
}

function readRawFromStorage(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

function persistReadIds(ids: ReadonlySet<string>): void {
  const payload: Persisted = { readIds: [...ids] };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function emitStoreChange(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const onCustom = () => {
    onStoreChange();
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      onStoreChange();
    }
  };
  window.addEventListener(STORE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(STORE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string {
  return readRawFromStorage();
}

function getServerSnapshot(): string {
  return "";
}

export function useReadStore() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const readIds = useMemo(() => parsePersisted(raw), [raw]);

  const markRead = useCallback((id: string) => {
    if (typeof window === "undefined") {
      return;
    }
    const next = new Set(parsePersisted(readRawFromStorage()));
    if (next.has(id)) {
      return;
    }
    next.add(id);
    persistReadIds(next);
    emitStoreChange();
  }, []);

  const markAllRead = useCallback((ids: readonly string[]) => {
    if (typeof window === "undefined") {
      return;
    }
    const next = new Set(parsePersisted(readRawFromStorage()));
    let changed = false;
    for (const itemId of ids) {
      if (!next.has(itemId)) {
        next.add(itemId);
        changed = true;
      }
    }
    if (!changed) {
      return;
    }
    persistReadIds(next);
    emitStoreChange();
  }, []);

  const isRead = useCallback((id: string) => readIds.has(id), [readIds]);

  const unreadCount = useCallback(
    (allIds: readonly string[]) => allIds.filter((id) => !readIds.has(id)).length,
    [readIds],
  );

  return { markRead, markAllRead, isRead, unreadCount };
}
