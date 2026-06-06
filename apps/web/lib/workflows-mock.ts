import { unstable_cache } from "next/cache";
import type { Workflow } from "@repo/api-client";
import { requireConsoleApiClient } from "./console-api";
import {
  CONSOLE_DATA_CACHE_TAG,
  CONSOLE_DATA_REVALIDATE_SECONDS,
  getConsoleData,
} from "./console-data";

/** Shared by the data accessor below and the mock API route handlers (single source). */
export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "wf_lead_sync",
    name: "Lead Intake to CRM",
    trigger: "webhook.lead.created",
    status: "active",
    lastRunId: "run_1001",
    lastRunStatus: "succeeded",
    updatedAt: "2026-04-28T11:00:00.000Z",
  },
  {
    id: "wf_contract_notice",
    name: "Contract Renewal Notice",
    trigger: "schedule.daily.09",
    status: "active",
    lastRunId: "run_1002",
    lastRunStatus: "failed",
    updatedAt: "2026-04-28T10:50:00.000Z",
  },
  {
    id: "wf_trial_nurture",
    name: "Trial Nurture Sequence",
    trigger: "event.trial.started",
    status: "paused",
    lastRunId: "run_1003",
    lastRunStatus: "cancelled",
    updatedAt: "2026-04-28T10:20:00.000Z",
  },
];

const fetchCachedWorkflows = unstable_cache(
  async () => requireConsoleApiClient().getWorkflows(),
  ["console-workflows"],
  { revalidate: CONSOLE_DATA_REVALIDATE_SECONDS, tags: [CONSOLE_DATA_CACHE_TAG] },
);

export async function getWorkflowsData(): Promise<Workflow[]> {
  return getConsoleData({
    fetchCached: fetchCachedWorkflows,
    fetchLive: (client) => client.getWorkflows(),
    mockFallback: () => MOCK_WORKFLOWS,
  });
}
