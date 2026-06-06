import { unstable_cache } from "next/cache";
import { ConsoleApiError, type Run } from "@repo/api-client";
import { requireConsoleApiClient } from "./console-api";
import {
  CONSOLE_DATA_CACHE_TAG,
  CONSOLE_DATA_REVALIDATE_SECONDS,
  getConsoleData,
} from "./console-data";

/** Shared by the data accessors below and the mock API route handlers (single source). */
export const MOCK_RUNS: Run[] = [
  {
    id: "run_1001",
    workflowId: "wf_lead_sync",
    status: "succeeded",
    startedAt: "2026-04-28T11:00:01.000Z",
    finishedAt: "2026-04-28T11:00:06.000Z",
    steps: [
      {
        id: "s_1",
        title: "Parse Webhook",
        message: "입력 payload 파싱 완료",
        level: "info",
        startedAt: "2026-04-28T11:00:01.000Z",
      },
      {
        id: "s_2",
        title: "Upsert CRM Contact",
        message: "연락처 생성 또는 업데이트 완료",
        level: "info",
        startedAt: "2026-04-28T11:00:03.000Z",
      },
    ],
  },
  {
    id: "run_1002",
    workflowId: "wf_contract_notice",
    status: "failed",
    startedAt: "2026-04-28T10:50:00.000Z",
    steps: [
      {
        id: "s_1",
        title: "Fetch Expiring Contracts",
        message: "갱신 대상 42건 조회",
        level: "info",
        startedAt: "2026-04-28T10:50:01.000Z",
      },
      {
        id: "s_2",
        title: "Send Email Batch",
        message: "SMTP rate limit 도달",
        level: "error",
        startedAt: "2026-04-28T10:50:04.000Z",
      },
    ],
  },
  {
    id: "run_1003",
    workflowId: "wf_trial_nurture",
    status: "cancelled",
    startedAt: "2026-04-28T10:20:00.000Z",
    finishedAt: "2026-04-28T10:20:02.000Z",
    steps: [
      {
        id: "s_1",
        title: "Send Trial Email",
        message: "체험 안내 메일 발송 전 사용자가 구독을 취소함",
        level: "info",
        startedAt: "2026-04-28T10:20:00.000Z",
      },
    ],
  },
];

export function sortRunsByStartedAtDesc(runs: readonly Run[]): Run[] {
  return [...runs].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

const fetchCachedRuns = unstable_cache(
  async () => requireConsoleApiClient().getRuns(),
  ["console-runs"],
  { revalidate: CONSOLE_DATA_REVALIDATE_SECONDS, tags: [CONSOLE_DATA_CACHE_TAG] },
);

const fetchCachedRun = unstable_cache(
  async (runId: string) => requireConsoleApiClient().getRun(runId),
  ["console-run"],
  { revalidate: CONSOLE_DATA_REVALIDATE_SECONDS, tags: [CONSOLE_DATA_CACHE_TAG] },
);

export async function getRunsData(): Promise<Run[]> {
  return getConsoleData({
    fetchCached: async () => sortRunsByStartedAtDesc(await fetchCachedRuns()),
    fetchLive: async (client) => sortRunsByStartedAtDesc(await client.getRuns()),
    mockFallback: () => sortRunsByStartedAtDesc(MOCK_RUNS),
  });
}

export async function getRunData(runId: string): Promise<Run | null> {
  try {
    return await getConsoleData<Run | null>({
      fetchCached: () => fetchCachedRun(runId),
      fetchLive: (client) => client.getRun(runId),
      mockFallback: () => MOCK_RUNS.find((run) => run.id === runId) ?? null,
    });
  } catch (error) {
    if (error instanceof ConsoleApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
