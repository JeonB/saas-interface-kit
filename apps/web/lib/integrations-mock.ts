import type { Integration } from "@repo/api-client";
import { getConsoleApiClient } from "./console-api";

const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: "int_slack",
    name: "Slack Alerts",
    vendor: "Slack",
    description: "워크플로 실패/성공 알림을 지정 채널로 전송합니다.",
    status: "connected",
    lastSyncAt: "2026-04-28T11:15:00.000Z",
  },
  {
    id: "int_hubspot",
    name: "HubSpot Contacts",
    vendor: "HubSpot",
    description: "신규 리드 발생 시 CRM 연락처를 업데이트합니다.",
    status: "error",
    lastSyncAt: "2026-04-28T10:44:00.000Z",
  },
  {
    id: "int_notion",
    name: "Notion Workspace",
    vendor: "Notion",
    description: "신규 티켓을 Notion 데이터베이스에 적재합니다.",
    status: "disconnected",
  },
];

export async function getIntegrationsData(): Promise<Integration[]> {
  const client = getConsoleApiClient();
  if (client) {
    return client.getIntegrations();
  }
  return MOCK_INTEGRATIONS;
}
