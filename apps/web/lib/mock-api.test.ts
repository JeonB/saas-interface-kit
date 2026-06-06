import { afterEach, describe, expect, it, vi } from "vitest";
import {
  API_DEV_SIMULATION_COOKIE,
  DEFAULT_API_DEV_SIMULATION,
  serializeApiDevSimulation,
} from "./api-dev-simulation";
import { API_DEV_SIMULATION_HEADER } from "./console-api";
import {
  applyMockApiSimulation,
  mockApiJson,
  MOCK_API_NO_STORE,
  MOCK_API_SWR_CACHE_CONTROL,
  readMockApiSimulation,
} from "./mock-api";

describe("readMockApiSimulation", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns defaults when no header or cookie is present", () => {
    expect(readMockApiSimulation(new Headers())).toEqual(DEFAULT_API_DEV_SIMULATION);
  });

  it("prefers the simulation header over the cookie", () => {
    const headers = new Headers({
      [API_DEV_SIMULATION_HEADER]: serializeApiDevSimulation({ delayMs: 1000, fault: "503" }),
      cookie: `${API_DEV_SIMULATION_COOKIE}=${encodeURIComponent(
        serializeApiDevSimulation({ delayMs: 0, fault: "none" }),
      )}`,
    });
    expect(readMockApiSimulation(headers)).toEqual({ delayMs: 1000, fault: "503" });
  });

  it("falls back to the simulation cookie for direct browser calls", () => {
    const headers = new Headers({
      cookie: `other=1; ${API_DEV_SIMULATION_COOKIE}=${encodeURIComponent(
        serializeApiDevSimulation({ delayMs: 2000, fault: "timeout" }),
      )}; another=2`,
    });
    expect(readMockApiSimulation(headers)).toEqual({ delayMs: 2000, fault: "timeout" });
  });

  it("ignores simulation in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    const headers = new Headers({
      [API_DEV_SIMULATION_HEADER]: serializeApiDevSimulation({ delayMs: 1000, fault: "503" }),
    });
    expect(readMockApiSimulation(headers)).toEqual(DEFAULT_API_DEV_SIMULATION);
  });
});

describe("applyMockApiSimulation", () => {
  it("returns null when no fault is configured", async () => {
    await expect(applyMockApiSimulation(new Headers())).resolves.toBeNull();
  });

  it("returns a 503 response for the 503 fault", async () => {
    const headers = new Headers({
      [API_DEV_SIMULATION_HEADER]: serializeApiDevSimulation({ delayMs: 0, fault: "503" }),
    });
    const response = await applyMockApiSimulation(headers);
    expect(response?.status).toBe(503);
    expect(response?.headers.get("Cache-Control")).toBe(MOCK_API_NO_STORE);
  });

  it("maps the network fault to a 503 for direct browser calls", async () => {
    const headers = new Headers({
      [API_DEV_SIMULATION_HEADER]: serializeApiDevSimulation({ delayMs: 0, fault: "network" }),
    });
    const response = await applyMockApiSimulation(headers);
    expect(response?.status).toBe(503);
  });

  it("holds the timeout fault beyond the client timeout then answers 504", async () => {
    vi.useFakeTimers();
    try {
      const headers = new Headers({
        [API_DEV_SIMULATION_HEADER]: serializeApiDevSimulation({ delayMs: 0, fault: "timeout" }),
      });
      const pending = applyMockApiSimulation(headers);
      await vi.advanceTimersByTimeAsync(10_000);
      const response = await pending;
      expect(response?.status).toBe(504);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("mockApiJson", () => {
  it("serves SWR cache headers by default", async () => {
    const response = mockApiJson({ ok: true });
    expect(response.headers.get("Cache-Control")).toBe(MOCK_API_SWR_CACHE_CONTROL);
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  it("honors a cache-control override", () => {
    const response = mockApiJson([], { cacheControl: MOCK_API_NO_STORE });
    expect(response.headers.get("Cache-Control")).toBe(MOCK_API_NO_STORE);
  });
});
