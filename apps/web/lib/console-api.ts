import { createConsoleApiClient } from "@repo/api-client";

/** Base URL for the B2B API when wired; optional in this frontend-only template. */
export function getConsoleApiBaseUrl(): string | undefined {
  const v = process.env.NEXT_PUBLIC_API_URL;
  return typeof v === "string" && v.trim() !== "" ? v.replace(/\/$/, "") : undefined;
}

export function getConsoleApiClient() {
  const baseUrl = getConsoleApiBaseUrl();
  if (!baseUrl) {
    return null;
  }
  return createConsoleApiClient({ baseUrl });
}
