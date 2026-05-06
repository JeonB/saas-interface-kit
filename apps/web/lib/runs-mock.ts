import type { Run } from "@repo/api-client";
import { getConsoleApiClient } from "./console-api";

const MOCK_RUNS: Run[] = [
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

// `@repo/api-client` exposes `getRun(id)` but not a runs list endpoint yet;
// swap to `client.getRuns(...)` when it lands.
export async function getRunsData(): Promise<Run[]> {
  return [...MOCK_RUNS].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export async function getRunData(runId: string): Promise<Run | null> {
  const client = getConsoleApiClient();
  if (client) {
    return client.getRun(runId);
  }
  return MOCK_RUNS.find((run) => run.id === runId) ?? null;
}
