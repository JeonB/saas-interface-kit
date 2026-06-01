import { describe, expect, it } from "vitest";
import { executeWorkflow, topologicalOrder } from "./execute-workflow";
import { SEED_DEFINITIONS } from "./seeds";

describe("executeWorkflow", () => {
  it("orders lead sync seed nodes trigger-first", () => {
    const def = SEED_DEFINITIONS.wf_lead_sync;
    const { ordered } = topologicalOrder(def);
    expect(ordered[0]?.type).toBe("trigger");
    expect(ordered.length).toBe(4);
  });

  it("produces run steps for each node", () => {
    const result = executeWorkflow(SEED_DEFINITIONS.wf_lead_sync);
    expect(result.steps.length).toBe(4);
    expect(result.steps[0]?.title).toBe("Webhook Trigger");
    expect(Object.values(result.nodeStatuses).every((s) => s === "done" || s === "idle")).toBe(true);
  });
});
