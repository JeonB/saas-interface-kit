import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ConsoleApiError,
  ConsoleApiNetworkError,
  ConsoleApiTimeoutError,
} from "@repo/api-client";
import {
  applyApiDevSimulation,
  DEFAULT_API_DEV_SIMULATION,
  isApiDevSimulationActive,
  parseApiDevSimulation,
  serializeApiDevSimulation,
  throwApiDevFault,
} from "./api-dev-simulation";

describe("api-dev-simulation", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("parseApiDevSimulation returns defaults for invalid input", () => {
    expect(parseApiDevSimulation(undefined)).toEqual(DEFAULT_API_DEV_SIMULATION);
    expect(parseApiDevSimulation("{not-json")).toEqual(DEFAULT_API_DEV_SIMULATION);
    expect(parseApiDevSimulation(JSON.stringify({ delayMs: -5, fault: "nope" }))).toEqual({
      delayMs: 0,
      fault: "none",
    });
  });

  it("serializeApiDevSimulation round-trips valid config", () => {
    const config = { delayMs: 2000, fault: "503" as const };
    expect(parseApiDevSimulation(serializeApiDevSimulation(config))).toEqual(config);
  });

  it("isApiDevSimulationActive is true when delay or fault is set", () => {
    expect(isApiDevSimulationActive({ delayMs: 0, fault: "none" })).toBe(false);
    expect(isApiDevSimulationActive({ delayMs: 1000, fault: "none" })).toBe(true);
    expect(isApiDevSimulationActive({ delayMs: 0, fault: "503" })).toBe(true);
  });

  it("throwApiDevFault throws typed API errors", () => {
    expect(() => throwApiDevFault("503")).toThrow(ConsoleApiError);
    expect(() => throwApiDevFault("timeout")).toThrow(ConsoleApiTimeoutError);
    expect(() => throwApiDevFault("network")).toThrow(ConsoleApiNetworkError);
  });

  it("applyApiDevSimulation delays then runs fn", async () => {
    vi.useFakeTimers();
    const fn = vi.fn(async () => "ok");
    const pending = applyApiDevSimulation({ delayMs: 500, fault: "none" }, fn);
    expect(fn).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(500);
    await expect(pending).resolves.toBe("ok");
    expect(fn).toHaveBeenCalledOnce();
  });

  it("applyApiDevSimulation throws before fn when fault is set", async () => {
    const fn = vi.fn(async () => "ok");
    await expect(
      applyApiDevSimulation({ delayMs: 0, fault: "503" }, fn),
    ).rejects.toThrow(ConsoleApiError);
    expect(fn).not.toHaveBeenCalled();
  });

});
