import {
  ConsoleApiError,
  ConsoleApiNetworkError,
  ConsoleApiTimeoutError,
} from "@repo/api-client";

export const API_DEV_SIMULATION_COOKIE = "api-dev-simulation";

export type ApiDevFault = "none" | "503" | "timeout" | "network";

export type ApiDevSimulation = {
  delayMs: number;
  fault: ApiDevFault;
};

export const API_DEV_DELAY_OPTIONS = [0, 1_000, 2_000, 3_000] as const;

export const DEFAULT_API_DEV_SIMULATION: ApiDevSimulation = {
  delayMs: 0,
  fault: "none",
};

function isApiDevFault(value: unknown): value is ApiDevFault {
  return value === "none" || value === "503" || value === "timeout" || value === "network";
}

export function parseApiDevSimulation(raw: string | undefined | null): ApiDevSimulation {
  if (!raw) {
    return DEFAULT_API_DEV_SIMULATION;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return DEFAULT_API_DEV_SIMULATION;
    }
    const record = parsed as Record<string, unknown>;
    const delayMs =
      typeof record.delayMs === "number" && Number.isFinite(record.delayMs) && record.delayMs >= 0
        ? Math.min(record.delayMs, 10_000)
        : 0;
    const fault = isApiDevFault(record.fault) ? record.fault : "none";
    return { delayMs, fault };
  } catch {
    return DEFAULT_API_DEV_SIMULATION;
  }
}

export function serializeApiDevSimulation(simulation: ApiDevSimulation): string {
  return JSON.stringify({
    delayMs: simulation.delayMs,
    fault: simulation.fault,
  });
}

export function delayMs(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function throwApiDevFault(fault: ApiDevFault): never {
  switch (fault) {
    case "none":
      throw new Error("throwApiDevFault called with fault none");
    case "503":
      throw new ConsoleApiError(503, "simulated service unavailable");
    case "timeout":
      throw new ConsoleApiTimeoutError(1);
    case "network":
      throw new ConsoleApiNetworkError("simulated network failure");
    default: {
      const _exhaustive: never = fault;
      throw new Error(`unknown fault: ${String(_exhaustive)}`);
    }
  }
}

export async function applyApiDevSimulation<T>(
  simulation: ApiDevSimulation,
  fn: () => Promise<T>,
): Promise<T> {
  if (simulation.delayMs > 0) {
    await delayMs(simulation.delayMs);
  }
  if (simulation.fault !== "none") {
    throwApiDevFault(simulation.fault);
  }
  return fn();
}

export function isApiDevSimulationActive(simulation: ApiDevSimulation): boolean {
  return simulation.delayMs > 0 || simulation.fault !== "none";
}
