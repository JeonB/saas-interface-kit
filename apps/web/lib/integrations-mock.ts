import { unstable_cache } from "next/cache";
import type { Integration } from "@repo/api-client";
import { requireConsoleApiClient } from "./console-api";
import {
  CONSOLE_DATA_CACHE_TAG,
  CONSOLE_DATA_REVALIDATE_SECONDS,
  getConsoleData,
} from "./console-data";

/** Shared by the data accessor below and the mock API route handlers (single source). */
export const MOCK_INTEGRATIONS: Integration[] = [
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
  {
    id: "int_salesforce",
    name: "Salesforce Sync",
    vendor: "Salesforce",
    description: "리드와 계정 정보를 CRM과 양방향으로 동기화합니다.",
    status: "connected",
    lastSyncAt: "2026-04-28T13:05:00.000Z",
  },
  {
    id: "int_jira",
    name: "Jira Issues",
    vendor: "Jira",
    description: "워크플로 실패 시 Jira 이슈를 자동 생성합니다.",
    status: "error",
    lastSyncAt: "2026-04-28T09:12:00.000Z",
  },
];

const fetchCachedIntegrations = unstable_cache(
  async () => requireConsoleApiClient().getIntegrations(),
  ["console-integrations"],
  { revalidate: CONSOLE_DATA_REVALIDATE_SECONDS, tags: [CONSOLE_DATA_CACHE_TAG] },
);

export async function getIntegrationsData(): Promise<Integration[]> {
  return getConsoleData({
    fetchCached: fetchCachedIntegrations,
    fetchLive: (client) => client.getIntegrations(),
    mockFallback: () => MOCK_INTEGRATIONS,
  });
}
