import type { UsageSummaryDto } from "./types";

export type ConsoleApiClientConfig = {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  getAccessToken?: () => string | Promise<string | undefined>;
};

export class ConsoleApiError extends Error {
  readonly status: number;
  readonly body: string;

  constructor(status: number, body: string) {
    super(`Console API ${status}: ${body.slice(0, 200)}`);
    this.name = "ConsoleApiError";
    this.status = status;
    this.body = body;
  }
}

export type ConsoleApiClient = {
  healthCheck: () => Promise<{ status: string }>;
  getUsageSummary: () => Promise<UsageSummaryDto>;
};

export function createConsoleApiClient(config: ConsoleApiClientConfig): ConsoleApiClient {
  const base = config.baseUrl.replace(/\/$/, "");

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);
    headers.set("Accept", "application/json");
    const token = await config.getAccessToken?.();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const res = await (config.fetchImpl ?? globalThis.fetch)(`${base}${path}`, {
      ...init,
      headers,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new ConsoleApiError(res.status, text);
    }
    return res.json() as Promise<T>;
  }

  return {
    healthCheck: () => request<{ status: string }>("/health"),
    getUsageSummary: () => request<UsageSummaryDto>("/v1/usage/summary"),
  };
}
