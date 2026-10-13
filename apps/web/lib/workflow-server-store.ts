import path from "node:path";
import type { Workflow } from "@repo/api-client";
import { createJsonFileStore } from "./json-file-store";
import { deriveTriggerLabel } from "./workflow/derive-trigger-label";
import { SEED_DEFINITIONS, SEED_REGISTRY } from "./workflow/seeds";
import {
  findWebhookPathConflict,
  type WebhookWorkflowCandidate,
} from "./workflow-runtime/webhook-registry";
import {
  WorkflowDefinitionSchema,
  type WorkflowDefinition,
} from "./workflow/types";

export type StoredWorkflow = Workflow & {
  definition: WorkflowDefinition;
};

type WorkflowStoreFile = {
  workflows: Record<string, StoredWorkflow>;
};

const DEFAULT_DATA_DIR = path.join(process.cwd(), ".workflow-data");
const STORE_FILENAME = "store.json";

function seedStore(): WorkflowStoreFile {
  const workflows: Record<string, StoredWorkflow> = {};
  for (const entry of SEED_REGISTRY) {
    const definition = SEED_DEFINITIONS[entry.id];
    if (!definition) continue;
    workflows[entry.id] = {
      ...entry,
      definition,
    };
  }
  return { workflows };
}

function parseStore(raw: unknown): WorkflowStoreFile {
  const parsed = raw as WorkflowStoreFile;
  if (!parsed?.workflows || typeof parsed.workflows !== "object") {
    throw new Error("Invalid workflow store file");
  }
  return parsed;
}

export type WorkflowServerStore = {
  listWorkflows: () => Promise<Workflow[]>;
  listStoredWorkflows: () => Promise<StoredWorkflow[]>;
  getWorkflow: (workflowId: string) => Promise<StoredWorkflow | null>;
  createWorkflow: (name: string) => Promise<StoredWorkflow>;
  updateWorkflowMeta: (
    workflowId: string,
    patch: Partial<Pick<Workflow, "name" | "status" | "lastRunId" | "lastRunStatus">>,
  ) => Promise<StoredWorkflow | null>;
  putDefinition: (workflowId: string, definition: WorkflowDefinition) => Promise<StoredWorkflow | null>;
  publishWorkflow: (
    workflowId: string,
  ) => Promise<
    | { ok: true; workflow: StoredWorkflow }
    | { ok: false; error: "not_found" }
    | { ok: false; error: "path_conflict"; conflictWorkflowId: string }
  >;
};

export function createWorkflowServerStore(dataDir = DEFAULT_DATA_DIR): WorkflowServerStore {
  const file = createJsonFileStore<WorkflowStoreFile>({
    filePath: path.join(dataDir, STORE_FILENAME),
    seed: seedStore,
    parse: parseStore,
  });

  return {
    async listWorkflows() {
      const store = await file.read();
      return Object.values(store.workflows).map(({ definition: _d, ...meta }) => meta);
    },

    async listStoredWorkflows() {
      const store = await file.read();
      return Object.values(store.workflows);
    },

    async getWorkflow(workflowId) {
      const store = await file.read();
      return store.workflows[workflowId] ?? null;
    },

    createWorkflow(name) {
      const definition = WorkflowDefinitionSchema.parse({
        version: 1,
        nodes: [
          {
            id: "n_trigger_new",
            type: "trigger",
            position: { x: 80, y: 120 },
            data: {
              label: "Webhook Trigger",
              trigger: { kind: "webhook", path: "/hooks/inbound" },
            },
          },
        ],
        edges: [],
      });

      const workflow: StoredWorkflow = {
        id: `wf_${crypto.randomUUID().slice(0, 8)}`,
        name,
        trigger: deriveTriggerLabel(definition),
        status: "draft",
        updatedAt: new Date().toISOString(),
        definition,
      };
      return file.update((store) => {
        store.workflows[workflow.id] = workflow;
        return workflow;
      });
    },

    updateWorkflowMeta(workflowId, patch) {
      return file.update((store) => {
        const current = store.workflows[workflowId];
        if (!current) return null;

        const next: StoredWorkflow = {
          ...current,
          ...patch,
          updatedAt: new Date().toISOString(),
        };
        store.workflows[workflowId] = next;
        return next;
      });
    },

    async putDefinition(workflowId, definition) {
      const parsed = WorkflowDefinitionSchema.parse(definition);
      return file.update((store) => {
        const current = store.workflows[workflowId];
        if (!current) return null;

        const next: StoredWorkflow = {
          ...current,
          trigger: deriveTriggerLabel(parsed),
          updatedAt: new Date().toISOString(),
          definition: parsed,
        };
        store.workflows[workflowId] = next;
        return next;
      });
    },

    publishWorkflow(workflowId) {
      return file.update((store) => {
        const current = store.workflows[workflowId];
        if (!current) {
          return { ok: false, error: "not_found" } as const;
        }

        const candidates: WebhookWorkflowCandidate[] = Object.values(store.workflows);
        const conflict = findWebhookPathConflict(candidates, workflowId, current.definition);
        if (conflict) {
          return { ok: false, error: "path_conflict", conflictWorkflowId: conflict.id } as const;
        }

        const next: StoredWorkflow = {
          ...current,
          status: "active",
          updatedAt: new Date().toISOString(),
        };
        store.workflows[workflowId] = next;
        return { ok: true, workflow: next } as const;
      });
    },
  };
}

let defaultStore: WorkflowServerStore | undefined;

export function getWorkflowServerStore(): WorkflowServerStore {
  defaultStore ??= createWorkflowServerStore();
  return defaultStore;
}
