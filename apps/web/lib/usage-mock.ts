import { unstable_cache } from "next/cache";
import type { UsageSummaryDto } from "@repo/api-client";
import { requireConsoleApiClient } from "./console-api";
import {
  CONSOLE_DATA_CACHE_TAG,
  CONSOLE_DATA_REVALIDATE_SECONDS,
  getConsoleData,
} from "./console-data";

/** Shared by the data accessor below and the mock API route handlers (single source). */
export const MOCK_USAGE_SUMMARY: UsageSummaryDto = {
  mrrUsd: 48_200,
  activeSeats: 1_842,
  churnRate: 0.01,
  nps: 44,
};

const fetchCachedUsageSummary = unstable_cache(
  async () => requireConsoleApiClient().getUsageSummary(),
  ["console-usage-summary"],
  { revalidate: CONSOLE_DATA_REVALIDATE_SECONDS, tags: [CONSOLE_DATA_CACHE_TAG] },
);

export async function getUsageSummaryData(): Promise<UsageSummaryDto> {
  return getConsoleData({
    fetchCached: fetchCachedUsageSummary,
    fetchLive: (client) => client.getUsageSummary(),
    mockFallback: () => MOCK_USAGE_SUMMARY,
  });
}
