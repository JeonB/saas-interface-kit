import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ConsoleApiError,
  ConsoleApiNetworkError,
  ConsoleApiTimeoutError,
  createConsoleApiClient,
  DEFAULT_REQUEST_TIMEOUT_MS,
} from "./client";

/** Mimics real fetch: rejects when `init.signal` aborts (tests use a custom `fetchImpl`). */
function createHangingFetch(): typeof fetch {
  return (_url, init) => {
    const signal = init?.signal;
    if (!signal) {
      return Promise.reject(new Error("expected RequestInit.signal"));
    }
    if (signal.aborted) {
      return Promise.reject(
        signal.reason ?? new DOMException("The operation was aborted.", "AbortError"),
      );
    }
    return new Promise<Response>((_, reject) => {
      signal.addEventListener(
        "abort",
        () => {
          reject(signal.reason ?? new DOMException("The operation was aborted.", "AbortError"));
        },
        { once: true },
      );
    });
  };
}

describe("createConsoleApiClient", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws ConsoleApiTimeoutError when the request exceeds requestTimeoutMs", async () => {
    const fetchImpl = vi.fn(createHangingFetch());
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 30,
    });

    await expect(client.healthCheck()).rejects.toThrow(ConsoleApiTimeoutError);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const init = fetchImpl.mock.calls[0]?.[1] as RequestInit | undefined;
    expect(init?.signal).toBeInstanceOf(AbortSignal);
  });

  it("rethrows caller AbortError when the caller signal is aborted", async () => {
    const fetchImpl = vi.fn(createHangingFetch());
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 60_000,
    });

    const ac = new AbortController();
    ac.abort();

    await expect(client.healthCheck({ signal: ac.signal })).rejects.toMatchObject({
      name: "AbortError",
    });
  });

  it("uses DEFAULT_REQUEST_TIMEOUT_MS when requestTimeoutMs is omitted", async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn(createHangingFetch());
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
    });

    const pending = client.healthCheck();
    const assertion = expect(pending).rejects.toThrow(ConsoleApiTimeoutError);
    await vi.advanceTimersByTimeAsync(DEFAULT_REQUEST_TIMEOUT_MS);
    await assertion;
  });

  it("wraps fetch TypeError as ConsoleApiNetworkError when retries are disabled", async () => {
    const fetchImpl = vi.fn(async (): Promise<Response> => {
      throw new TypeError("Failed to fetch");
    });
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 5_000,
    });

    await expect(client.healthCheck()).rejects.toThrow(ConsoleApiNetworkError);
  });

  it("sends X-Request-Id and reuses it across retries", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(
        new Response("unavailable", { status: 503, headers: { "Content-Type": "text/plain" } }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 5_000,
      maxRetries: 2,
      retryDelayMs: 0,
    });

    await expect(client.healthCheck()).resolves.toEqual({ status: "ok" });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const h0 = fetchImpl.mock.calls[0]?.[1] as RequestInit | undefined;
    const h1 = fetchImpl.mock.calls[1]?.[1] as RequestInit | undefined;
    const id0 = new Headers(h0?.headers).get("X-Request-Id");
    const id1 = new Headers(h1?.headers).get("X-Request-Id");
    expect(id0).toBeTruthy();
    expect(id0).toBe(id1);
  });

  it("retries on 503 then succeeds", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(
        new Response("unavailable", { status: 503, headers: { "Content-Type": "text/plain" } }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 5_000,
      maxRetries: 2,
      retryDelayMs: 0,
    });

    await expect(client.healthCheck()).resolves.toEqual({ status: "ok" });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("does not retry on 500", async () => {
    const fetchImpl = vi.fn(
      async (): Promise<Response> =>
        new Response("err", { status: 500, headers: { "Content-Type": "text/plain" } }),
    );
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 5_000,
      maxRetries: 2,
      retryDelayMs: 0,
    });

    await expect(client.healthCheck()).rejects.toThrow(ConsoleApiError);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("does not retry when the attempt times out", async () => {
    const fetchImpl = vi.fn(createHangingFetch());
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 30,
      maxRetries: 3,
      retryDelayMs: 0,
    });

    await expect(client.healthCheck()).rejects.toThrow(ConsoleApiTimeoutError);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("retries on fetch TypeError then succeeds", async () => {
    const fetchImpl = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 5_000,
      maxRetries: 2,
      retryDelayMs: 0,
    });

    await expect(client.healthCheck()).resolves.toEqual({ status: "ok" });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("returns JSON on success", async () => {
    const fetchImpl = vi.fn(
      async (): Promise<Response> =>
        new Response(JSON.stringify({ status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
    );
    const client = createConsoleApiClient({
      baseUrl: "https://api.example",
      fetchImpl,
      requestTimeoutMs: 5_000,
    });

    await expect(client.healthCheck()).resolves.toEqual({ status: "ok" });
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.example/health",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });
});
