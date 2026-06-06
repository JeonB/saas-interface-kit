import { describe, expect, it } from "vitest";
import {
  AuditEventsPageSchema,
  IntegrationSchema,
  MemberSummarySchema,
  NotificationDtoSchema,
  RunSchema,
  UsageSummaryDtoSchema,
  WorkflowSchema,
} from "./schemas";

describe("schemas", () => {
  it("parses usage summary payload", () => {
    const parsed = UsageSummaryDtoSchema.parse({
      mrrUsd: 12_500,
      activeSeats: 42,
      churnRate: 0.03,
      nps: 48,
    });
    expect(parsed.activeSeats).toBe(42);
  });

  it("rejects invalid integration status", () => {
    const result = IntegrationSchema.safeParse({
      id: "int_1",
      name: "Slack",
      vendor: "Slack",
      status: "unknown",
    });
    expect(result.success).toBe(false);
  });

  it("parses workflow and run payloads", () => {
    const workflow = WorkflowSchema.parse({
      id: "wf_1",
      name: "Lead Sync",
      trigger: "webhook",
      status: "active",
      updatedAt: "2026-04-28T11:00:00.000Z",
      lastRunStatus: "succeeded",
      lastRunId: "run_1001",
    });
    const run = RunSchema.parse({
      id: "run_1001",
      workflowId: "wf_1",
      status: "succeeded",
      startedAt: "2026-04-28T11:00:00.000Z",
      finishedAt: "2026-04-28T11:00:06.000Z",
      steps: [
        {
          id: "step_1",
          title: "Fetch",
          message: "done",
          level: "info",
          startedAt: "2026-04-28T11:00:01.000Z",
        },
      ],
    });
    expect(workflow.lastRunId).toBe(run.id);
  });

  it("parses member summary and rejects unknown roles", () => {
    const parsed = MemberSummarySchema.parse({
      id: "1",
      email: "owner@example.com",
      name: "김운영",
      role: "owner",
    });
    expect(parsed.role).toBe("owner");

    const invalid = MemberSummarySchema.safeParse({
      id: "2",
      email: "x@example.com",
      name: "아무개",
      role: "superuser",
    });
    expect(invalid.success).toBe(false);
  });

  it("parses notification dto and rejects invalid category/severity", () => {
    const parsed = NotificationDtoSchema.parse({
      id: "ntf_1",
      title: "워크플로 실행 실패",
      description: "run_1002가 중단되었습니다.",
      category: "run",
      severity: "error",
      createdAt: "2026-04-28T10:50:04.000Z",
      href: "/console/runs/run_1002",
    });
    expect(parsed.category).toBe("run");

    const invalid = NotificationDtoSchema.safeParse({
      id: "ntf_2",
      title: "t",
      description: "d",
      category: "unknown",
      severity: "fatal",
      createdAt: "2026-04-28T10:50:04.000Z",
    });
    expect(invalid.success).toBe(false);
  });

  it("parses audit events page", () => {
    const page = AuditEventsPageSchema.parse({
      items: [
        {
          id: "evt_1",
          occurredAt: "2026-04-28T11:00:00.000Z",
          actor: {
            id: "user_1",
            email: "owner@example.com",
            name: "Owner",
          },
          action: "member.invited",
          ip: "127.0.0.1",
        },
      ],
      total: 1,
      page: 1,
      size: 20,
    });
    expect(page.items).toHaveLength(1);
  });
});
