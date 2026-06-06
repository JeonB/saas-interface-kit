import { unstable_cache } from "next/cache";
import type { MemberSummary } from "@repo/api-client";
import { requireConsoleApiClient } from "./console-api";
import {
  CONSOLE_DATA_CACHE_TAG,
  CONSOLE_DATA_REVALIDATE_SECONDS,
  getConsoleData,
} from "./console-data";

/** Shared by the data accessor below and the mock API route handlers (single source). */
export const MOCK_MEMBERS: MemberSummary[] = [
  { id: "1", name: "김운영", email: "owner@example.com", role: "owner" },
  { id: "2", name: "이관리", email: "admin@example.com", role: "admin" },
  { id: "3", name: "박멤버", email: "member@example.com", role: "member" },
  { id: "4", name: "최뷰어", email: "viewer@example.com", role: "viewer" },
];

const fetchCachedMembers = unstable_cache(
  async () => requireConsoleApiClient().getMembers(),
  ["console-members"],
  { revalidate: CONSOLE_DATA_REVALIDATE_SECONDS, tags: [CONSOLE_DATA_CACHE_TAG] },
);

export async function getMembersData(): Promise<MemberSummary[]> {
  return getConsoleData({
    fetchCached: fetchCachedMembers,
    fetchLive: (client) => client.getMembers(),
    mockFallback: () => MOCK_MEMBERS,
  });
}
