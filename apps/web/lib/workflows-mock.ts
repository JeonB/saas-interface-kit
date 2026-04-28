import type { Workflow } from "@repo/api-client";
import { getConsoleApiClient } from "./console-api";

const MOCK_WORKFLOWS: Workflow[] = [
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

export async function getWorkflowsData(): Promise<Workflow[]> {
  const client = getConsoleApiClient();
  if (client) {
    return client.getWorkflows();
  }
  return MOCK_WORKFLOWS;
}
