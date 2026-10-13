import path from "node:path";
import type { Run, RunStatus } from "@repo/api-client";
import { createJsonFileStore } from "./json-file-store";
import { MOCK_RUNS } from "./runs-mock";
import { getWorkflowServerStore } from "./workflow-server-store";

type RunStoreFile = {
  runs: Record<string, Run>;
};

const DEFAULT_DATA_DIR = path.join(process.cwd(), ".workflow-data");
const STORE_FILENAME = "runs.json";

function seedStore(): RunStoreFile {
  const runs: Record<string, Run> = {};
  for (const run of MOCK_RUNS) {
    runs[run.id] = run;
  }
  return { runs };
}

function parseStore(raw: unknown): RunStoreFile {
  const parsed = raw as RunStoreFile;
  if (!parsed?.runs || typeof parsed.runs !== "object") {
    throw new Error("Invalid run store");
  }
  return parsed;
}

export type RunServerStore = {
  listRuns: () => Promise<Run[]>;
  getRun: (runId: string) => Promise<Run | null>;
  createRun: (input: {
    workflowId: string;
    status: RunStatus;
    startedAt: string;
    finishedAt?: string;
    steps: Run["steps"];
  }) => Promise<Run>;
  updateWorkflowLastRun: (
    workflowId: string,
    runId: string,
    status: RunStatus,
  ) => Promise<void>;
};

export function createRunServerStore(
  dataDir = DEFAULT_DATA_DIR,
  onWorkflowRun?: (workflowId: string, runId: string, status: RunStatus) => Promise<void>,
): RunServerStore {
  const file = createJsonFileStore<RunStoreFile>({
    filePath: path.join(dataDir, STORE_FILENAME),
    seed: seedStore,
    parse: parseStore,
  });

  return {
    async listRuns() {
      const store = await file.read();
      return Object.values(store.runs);
    },

    async getRun(runId) {
      const store = await file.read();
      return store.runs[runId] ?? null;
    },

    async createRun(input) {
      const run: Run = {
        id: `run_${crypto.randomUUID().slice(0, 8)}`,
        workflowId: input.workflowId,
        status: input.status,
        startedAt: input.startedAt,
        finishedAt: input.finishedAt,
        steps: input.steps,
      };
      await file.update((store) => {
        store.runs[run.id] = run;
      });
      if (onWorkflowRun) {
        await onWorkflowRun(input.workflowId, run.id, input.status);
      }
      return run;
    },

    async updateWorkflowLastRun(workflowId, runId, status) {
      if (onWorkflowRun) {
        await onWorkflowRun(workflowId, runId, status);
      }
    },
  };
}

let defaultRunStore: RunServerStore | undefined;

export function getRunServerStore(): RunServerStore {
  defaultRunStore ??= createRunServerStore(undefined, async (workflowId, runId, status) => {
    await getWorkflowServerStore().updateWorkflowMeta(workflowId, {
      lastRunId: runId,
      lastRunStatus: status,
    });
  });
  return defaultRunStore;
}
