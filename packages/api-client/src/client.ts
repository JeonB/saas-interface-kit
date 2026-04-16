import type { UsageSummaryDto } from "./types";

/** Default ceiling for outbound requests so SSR and UI do not hang on a stalled API. */
export const DEFAULT_REQUEST_TIMEOUT_MS = 10_000;

/** Default extra GET attempts after the first try (each full attempt uses `requestTimeoutMs`). */
export const DEFAULT_MAX_RETRIES = 0;

/** Base delay before the first retry; grows by `retryBackoffFactor` each attempt. */
export const DEFAULT_RETRY_DELAY_MS = 250;

export const DEFAULT_RETRY_BACKOFF_FACTOR = 2;

export type ConsoleApiClientConfig = {
  baseUrl: string;
  fetchImpl?: typeof fetch;
  getAccessToken?: () => string | Promise<string | undefined>;
  /** When set, aborts the request after this many milliseconds (combined with `init.signal` when provided). */
  requestTimeoutMs?: number;
  /**
   * Retries idempotent GETs (`healthCheck`, `getUsageSummary`) on transient failures.
   * Each attempt has its own `requestTimeoutMs` budget.
   */
  maxRetries?: number;
  /** Milliseconds before the first retry; subsequent waits multiply by `retryBackoffFactor`. */
  retryDelayMs?: number;
  /** Multiplier applied to the wait after each failed attempt. */
  retryBackoffFactor?: number;
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

function delay(ms: number, signal: AbortSignal | undefined): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason ?? new DOMException("The operation was aborted.", "AbortError"));
      return;
    }
    const id = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(id);
      reject(signal?.reason ?? new DOMException("The operation was aborted.", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function isRetriableHttpStatus(status: number): boolean {
  return status === 502 || status === 503 || status === 504;
}

function isRetriableFetchFailure(e: unknown): boolean {
  if (e instanceof TypeError) {
    return true;
  }
  if (e instanceof DOMException && e.name === "NetworkError") {
    return true;
  }
  return false;
}

function isRetriableError(e: unknown): boolean {
  if (e instanceof ConsoleApiTimeoutError) {
    return false;
  }
  if (e instanceof ConsoleApiError && isRetriableHttpStatus(e.status)) {
    return true;
  }
  return isRetriableFetchFailure(e);
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
  const maxRetries = Math.max(0, config.maxRetries ?? DEFAULT_MAX_RETRIES);
  const retryDelayMs = config.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
  const retryBackoffFactor = config.retryBackoffFactor ?? DEFAULT_RETRY_BACKOFF_FACTOR;

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const outerSignal = init?.signal;
    let lastError: unknown;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
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
          lastError = new ConsoleApiTimeoutError(timeoutMs);
        } else {
          lastError = e;
        }
        if (
          attempt < maxRetries &&
          isRetriableError(lastError) &&
          outerSignal?.aborted !== true
        ) {
          const waitMs = retryDelayMs * Math.pow(retryBackoffFactor, attempt);
          await delay(waitMs, outerSignal ?? undefined);
          continue;
        }
        if (timedOut && !userAborted) {
          throw new ConsoleApiTimeoutError(timeoutMs);
        }
        throw e;
      } finally {
        clearRequestTimeout();
      }

      if (!res.ok) {
        const text = await res.text();
        const err = new ConsoleApiError(res.status, text);
        if (
          attempt < maxRetries &&
          isRetriableHttpStatus(res.status) &&
          outerSignal?.aborted !== true
        ) {
          lastError = err;
          const waitMs = retryDelayMs * Math.pow(retryBackoffFactor, attempt);
          await delay(waitMs, outerSignal ?? undefined);
          continue;
        }
        throw err;
      }

      return res.json() as Promise<T>;
    }

    throw lastError instanceof Error ? lastError : new Error("Console API request failed");
  }

  return {
    healthCheck: (options) =>
      request<{ status: string }>("/health", { signal: options?.signal }),
    getUsageSummary: (options) =>
      request<UsageSummaryDto>("/v1/usage/summary", { signal: options?.signal }),
  };
}
