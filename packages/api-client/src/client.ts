import type { UsageSummaryDto } from "./types";

/** Default ceiling for outbound requests so SSR and UI do not hang on a stalled API. */
export const DEFAULT_REQUEST_TIMEOUT_MS = 10_000;

export type ConsoleApiClientConfig = {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  getAccessToken?: () => string | Promise<string | undefined>;
  /** When set, aborts the request after this many milliseconds (combined with `init.signal` when provided). */
  requestTimeoutMs?: number;
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

export class ConsoleApiTimeoutError extends Error {
  readonly timeoutMs: number;

  constructor(timeoutMs: number) {
    super(`Console API request timed out after ${timeoutMs}ms`);
    this.name = "ConsoleApiTimeoutError";
    this.timeoutMs = timeoutMs;
  }
}

function createTimeoutAbort(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const id = setTimeout(() => {
    controller.abort(
      new DOMException(`Console API request exceeded ${ms}ms`, "TimeoutError"),
    );
  }, ms);
  return {
    signal: controller.signal,
    clear: () => clearTimeout(id),
  };
}

/**
 * Returns a signal that aborts when either `a` or `b` aborts, propagating `reason` when available.
 */
function anyAbortSignal(a: AbortSignal | null | undefined, b: AbortSignal): AbortSignal {
  if (a == null) {
    return b;
  }
  const out = new AbortController();
  const onAbort = (source: AbortSignal) => {
    out.abort(source.reason);
  };
  if (a.aborted) {
    onAbort(a);
    return out.signal;
  }
  if (b.aborted) {
    onAbort(b);
    return out.signal;
  }
  a.addEventListener("abort", () => onAbort(a), { once: true });
  b.addEventListener("abort", () => onAbort(b), { once: true });
  return out.signal;
}

export type ConsoleApiRequestOptions = {
  signal?: AbortSignal;
};

export type ConsoleApiClient = {
  healthCheck: (options?: ConsoleApiRequestOptions) => Promise<{ status: string }>;
  getUsageSummary: (options?: ConsoleApiRequestOptions) => Promise<UsageSummaryDto>;
};

export function createConsoleApiClient(config: ConsoleApiClientConfig): ConsoleApiClient {
  const base = config.baseUrl.replace(/\/$/, "");
  const timeoutMs = config.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const headers = new Headers(init?.headers);
    headers.set("Accept", "application/json");
    const token = await config.getAccessToken?.();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    const { signal: timeoutSignal, clear: clearRequestTimeout } = createTimeoutAbort(timeoutMs);
    const signal =
      init?.signal !== undefined ? anyAbortSignal(init.signal, timeoutSignal) : timeoutSignal;

    let res: Response;
    try {
      res = await (config.fetchImpl ?? globalThis.fetch)(`${base}${path}`, {
        ...init,
        headers,
        signal,
      });
    } catch (e) {
      const userAborted = init?.signal?.aborted === true;
      const timedOut = timeoutSignal.aborted;
      if (timedOut && !userAborted) {
        throw new ConsoleApiTimeoutError(timeoutMs);
      }
      throw e;
    } finally {
      clearRequestTimeout();
    }
    if (!res.ok) {
      const text = await res.text();
      throw new ConsoleApiError(res.status, text);
    }
    return res.json() as Promise<T>;
  }

  return {
    healthCheck: (options) =>
      request<{ status: string }>("/health", { signal: options?.signal }),
    getUsageSummary: (options) =>
      request<UsageSummaryDto>("/v1/usage/summary", { signal: options?.signal }),
  };
}
