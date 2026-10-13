import path from "node:path";
import { createJsonFileStore } from "./json-file-store";

export type ResourceRow = {
  id: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export type ResourceTable = {
  slug: string;
  displayName: string;
  rows: ResourceRow[];
};

type ResourceStoreFile = {
  tables: Record<string, ResourceTable>;
};

const DEFAULT_DATA_DIR = path.join(process.cwd(), ".workflow-data");
const STORE_FILENAME = "resources.json";

function seedStore(): ResourceStoreFile {
  const now = new Date().toISOString();
  return {
    tables: {
      contacts: {
        slug: "contacts",
        displayName: "Contacts",
        rows: [
          {
            id: "ct_1",
            data: { email: "ada@example.com", name: "Ada Lovelace" },
            createdAt: now,
            updatedAt: now,
          },
        ],
      },
      leads: {
        slug: "leads",
        displayName: "Leads",
        rows: [],
      },
    },
  };
}

function parseStore(raw: unknown): ResourceStoreFile {
  const parsed = raw as ResourceStoreFile;
  if (!parsed?.tables || typeof parsed.tables !== "object") {
    throw new Error("Invalid resource store");
  }
  return parsed;
}

export type ResourceStore = {
  listRows: (slug: string, limit?: number) => Promise<ResourceRow[]>;
  countRows: (slug: string) => Promise<number>;
  getRowById: (slug: string, id: string) => Promise<ResourceRow | null>;
  createRow: (slug: string, data: Record<string, unknown>) => Promise<ResourceRow>;
  updateRow: (
    slug: string,
    id: string,
    data: Record<string, unknown>,
  ) => Promise<ResourceRow | null>;
  deleteRow: (slug: string, id: string) => Promise<boolean>;
};

export function createResourceStore(dataDir = DEFAULT_DATA_DIR): ResourceStore {
  const file = createJsonFileStore<ResourceStoreFile>({
    filePath: path.join(dataDir, STORE_FILENAME),
    seed: seedStore,
    parse: parseStore,
  });

  function getTable(store: ResourceStoreFile, slug: string): ResourceTable | null {
    return store.tables[slug] ?? null;
  }

  return {
    async listRows(slug, limit = 20) {
      const store = await file.read();
      const table = getTable(store, slug);
      if (!table) return [];
      return [...table.rows]
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .slice(0, limit);
    },

    async countRows(slug) {
      const store = await file.read();
      const table = getTable(store, slug);
      return table?.rows.length ?? 0;
    },

    async getRowById(slug, id) {
      const store = await file.read();
      const table = getTable(store, slug);
      return table?.rows.find((row) => row.id === id) ?? null;
    },

    createRow(slug, data) {
      return file.update((store) => {
        const table = getTable(store, slug);
        if (!table) {
          throw new Error(`Unknown resource table: ${slug}`);
        }
        const now = new Date().toISOString();
        const row: ResourceRow = {
          id: `row_${crypto.randomUUID().slice(0, 8)}`,
          data,
          createdAt: now,
          updatedAt: now,
        };
        table.rows.push(row);
        return row;
      });
    },

    updateRow(slug, id, data) {
      return file.update((store) => {
        const table = getTable(store, slug);
        if (!table) return null;
        const idx = table.rows.findIndex((row) => row.id === id);
        const current = table.rows[idx];
        if (!current) return null;
        const next: ResourceRow = {
          ...current,
          data: { ...current.data, ...data },
          updatedAt: new Date().toISOString(),
        };
        table.rows[idx] = next;
        return next;
      });
    },

    deleteRow(slug, id) {
      return file.update((store) => {
        const table = getTable(store, slug);
        if (!table) return false;
        const before = table.rows.length;
        table.rows = table.rows.filter((row) => row.id !== id);
        return table.rows.length !== before;
      });
    },
  };
}

let defaultResourceStore: ResourceStore | undefined;

export function getResourceStore(): ResourceStore {
  defaultResourceStore ??= createResourceStore();
  return defaultResourceStore;
}
