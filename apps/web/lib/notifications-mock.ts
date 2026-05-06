import type { Notification, NotificationCategory, NotificationFilter, NotificationSeverity } from "./notifications.types";

/** Demo notifications aligned with runs / integrations mock timestamps. */
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "ntf_run_failed",
    title: "워크플로 실행 실패",
    description: "Contract Renewal Notice(run_1002)가 SMTP rate limit으로 중단되었습니다.",
    category: "run",
    severity: "error",
    createdAt: "2026-04-28T10:50:04.000Z",
    href: "/console/runs/run_1002",
  },
  {
    id: "ntf_run_ok",
    title: "워크플로 실행 성공",
    description: "Lead Intake to CRM(run_1001)이 정상 완료되었습니다.",
    category: "run",
    severity: "success",
    createdAt: "2026-04-28T11:00:06.000Z",
    href: "/console/runs/run_1001",
  },
  {
    id: "ntf_integration_error",
    title: "통합 오류",
    description: "HubSpot Contacts 연동에 오류가 있습니다. 자격 증명을 확인하세요.",
    category: "integration",
    severity: "warning",
    createdAt: "2026-04-28T10:44:00.000Z",
    href: "/console/integrations",
  },
  {
    id: "ntf_integration_ok",
    title: "통합 동기화 완료",
    description: "Salesforce Sync가 마지막으로 성공적으로 동기화되었습니다.",
    category: "integration",
    severity: "info",
    createdAt: "2026-04-28T13:05:00.000Z",
    href: "/console/integrations",
  },
  {
    id: "ntf_billing",
    title: "체험 기간 안내",
    description: "체험이 곧 종료됩니다. 결제 수단을 등록해 서비스 중단을 피하세요.",
    category: "billing",
    severity: "warning",
    createdAt: "2026-04-28T09:00:00.000Z",
    href: "/console/settings/billing",
  },
  {
    id: "ntf_member",
    title: "새 멤버 초대",
    description: "ops@example.com이 워크스페이스에 초대되었습니다.",
    category: "member",
    severity: "info",
    createdAt: "2026-04-28T08:30:00.000Z",
    href: "/console/members",
  },
  {
    id: "ntf_system",
    title: "점검 예정",
    description: "일요일 02:00 UTC에 짧은 플랫폼 점검이 예정되어 있습니다.",
    category: "system",
    severity: "info",
    createdAt: "2026-04-27T12:00:00.000Z",
  },
  {
    id: "ntf_jira_error",
    title: "Jira 통합 오류",
    description: "Jira Issues 연동에서 API 응답 오류가 발생했습니다.",
    category: "integration",
    severity: "error",
    createdAt: "2026-04-28T09:12:00.000Z",
    href: "/console/integrations",
  },
];

function isCategory(value: string): value is NotificationCategory {
  return value === "run" || value === "integration" || value === "billing" || value === "member" || value === "system";
}

function isSeverity(value: string): value is NotificationSeverity {
  return value === "info" || value === "success" || value === "warning" || value === "error";
}

function applyServerFilter(items: Notification[], filter: NotificationFilter): Notification[] {
  return items.filter((n) => {
    if (filter.category && n.category !== filter.category) {
      return false;
    }
    if (filter.severity && n.severity !== filter.severity) {
      return false;
    }
    return true;
  });
}

/**
 * Returns notifications for the console. Swap to `client.getNotifications(filter)`
 * once `@repo/api-client` ships that endpoint; until then both code paths use mock data.
 */
export async function getNotificationsData(filter: NotificationFilter = {}): Promise<Notification[]> {
  const sorted = [...MOCK_NOTIFICATIONS].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return applyServerFilter(sorted, filter);
}

export { isCategory, isSeverity };
