"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { Button } from "@repo/ui/button";
import {
  ChecklistItem,
  type ChecklistItemData,
  type ChecklistItemStatus,
} from "@repo/ui/checklist";

type ChecklistKey =
  | "org-settings"
  | "connect-integration"
  | "invite-members"
  | "activate-workflow"
  | "setup-billing";

const STORAGE_KEY = "northline-onboarding-v1";
const STORE_EVENT = "northline-onboarding-change";

const BASE_ITEMS: Array<ChecklistItemData & { id: ChecklistKey }> = [
  {
    id: "org-settings",
    title: "조직 설정 확인",
    description: "팀 이름과 타임존을 설정해 운영 기준을 맞춥니다.",
    status: "todo",
    actionHref: "/console/settings",
    actionLabel: "열기",
  },
  {
    id: "connect-integration",
    title: "첫 통합 연결",
    description: "Slack 또는 CRM 연동을 연결해 자동화를 준비합니다.",
    status: "todo",
    actionHref: "/console/integrations",
    actionLabel: "연결",
  },
  {
    id: "invite-members",
    title: "멤버 초대",
    description: "협업을 시작할 핵심 멤버를 워크스페이스에 초대합니다.",
    status: "todo",
    actionHref: "/console/members",
    actionLabel: "초대",
  },
  {
    id: "activate-workflow",
    title: "첫 워크플로 활성화",
    description: "자동화 워크플로를 활성화하고 실행 상태를 확인합니다.",
    status: "todo",
    actionHref: "/console/workflows",
    actionLabel: "이동",
  },
  {
    id: "setup-billing",
    title: "결제 수단 등록",
    description: "체험 종료 전에 결제 정보를 등록해 서비스 중단을 방지합니다.",
    status: "todo",
    actionHref: "/console/settings/billing",
    actionLabel: "등록",
  },
];

const CHECKLIST_KEYS = BASE_ITEMS.map((item) => item.id) as readonly ChecklistKey[];

type ChecklistState = {
  statusById: Record<ChecklistKey, ChecklistItemStatus>;
  collapsed: boolean;
};

const SERVER_DEFAULT_STATE: ChecklistState = {
  statusById: {
    "org-settings": "todo",
    "connect-integration": "todo",
    "invite-members": "todo",
    "activate-workflow": "todo",
    "setup-billing": "todo",
  },
  collapsed: false,
};

function isChecklistKey(value: string): value is ChecklistKey {
  return (CHECKLIST_KEYS as readonly string[]).includes(value);
}

function isChecklistStatus(value: unknown): value is ChecklistItemStatus {
  return value === "todo" || value === "done" || value === "skipped";
}

function parseStored(raw: string | null): ChecklistState {
  if (!raw) {
    return SERVER_DEFAULT_STATE;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return SERVER_DEFAULT_STATE;
    }
    const candidate = parsed as { statusById?: unknown; collapsed?: unknown };
    const statusById = { ...SERVER_DEFAULT_STATE.statusById };
    if (typeof candidate.statusById === "object" && candidate.statusById !== null) {
      for (const [key, value] of Object.entries(candidate.statusById)) {
        if (isChecklistKey(key) && isChecklistStatus(value)) {
          statusById[key] = value;
        }
      }
    }
    const collapsed = typeof candidate.collapsed === "boolean" ? candidate.collapsed : false;
    return { statusById, collapsed };
  } catch {
    return SERVER_DEFAULT_STATE;
  }
}

function readRawFromStorage(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

function persist(state: ChecklistState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  const onCustom = () => onStoreChange();
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

function getNextStatus(status: ChecklistItemStatus): ChecklistItemStatus {
  switch (status) {
    case "todo":
      return "done";
    case "done":
      return "skipped";
    case "skipped":
      return "todo";
  }
}

export function OnboardingChecklist() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const state = useMemo(() => parseStored(raw), [raw]);
  const { statusById, collapsed } = state;

  const updateStatus = useCallback((id: ChecklistKey) => {
    const current = parseStored(readRawFromStorage());
    persist({
      ...current,
      statusById: { ...current.statusById, [id]: getNextStatus(current.statusById[id]) },
    });
  }, []);

  const showAgain = useCallback(() => {
    const current = parseStored(readRawFromStorage());
    persist({ ...current, collapsed: false });
  }, []);

  const completedCount = useMemo(
    () => Object.values(statusById).filter((status) => status === "done").length,
    [statusById],
  );
  const totalCount = BASE_ITEMS.length;
  const percent = Math.round((completedCount / totalCount) * 100);
  const allDone = completedCount === totalCount;
  const effectiveCollapsed = collapsed || allDone;

  return (
    <section className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4" aria-label="온보딩 체크리스트">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">시작하기 체크리스트</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400" aria-live="polite">
            {completedCount}/{totalCount} 완료
          </span>
          {effectiveCollapsed ? (
            <Button name="showChecklist" onClick={showAgain} size="sm" type="button" variant="default">
              다시 보기
            </Button>
          ) : null}
        </div>
      </div>
      <progress
        aria-label={`온보딩 진행률 ${percent}%`}
        className="mt-3 h-2 w-full overflow-hidden rounded-full [&::-moz-progress-bar]:bg-blue-1000 [&::-webkit-progress-bar]:bg-neutral-800 [&::-webkit-progress-value]:bg-blue-1000"
        max={100}
        value={percent}
      />
      {!effectiveCollapsed ? (
        <ul className="mt-4 space-y-2" role="list">
          {BASE_ITEMS.map((item) => (
            <li key={item.id}>
              <div className="space-y-2">
                <ChecklistItem
                  actionHref={item.actionHref}
                  actionLabel={item.actionLabel}
                  description={item.description}
                  status={statusById[item.id]}
                  title={item.title}
                />
                <Button
                  name={`toggleChecklist-${item.id}`}
                  onClick={() => updateStatus(item.id)}
                  size="sm"
                  type="button"
                  variant="default"
                >
                  상태 변경
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-neutral-400">모든 온보딩 단계를 완료했습니다.</p>
      )}
    </section>
  );
}
