import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

export type JsonFileStore<T> = {
  /** Reads the current snapshot, seeding the file on first access. */
  read: () => Promise<T>;
  /**
   * Applies `mutate` to a fresh snapshot and persists the result before resolving.
   * Calls for the same file run one at a time, so concurrent updates are never lost.
   */
  update: <R>(mutate: (data: T) => R) => Promise<R>;
};

export type JsonFileStoreOptions<T> = {
  filePath: string;
  seed: () => T;
  /** Validates the decoded JSON; throw to reject a corrupted or foreign file. */
  parse: (raw: unknown) => T;
};

/**
 * Per-file task chains. Keyed by absolute path so separate store instances pointing at the
 * same file share one queue. Serialization is in-process only (single-instance demo storage).
 */
const queues = new Map<string, Promise<void>>();

function enqueue<R>(key: string, task: () => Promise<R>): Promise<R> {
  const previous = queues.get(key) ?? Promise.resolve();
  const run = previous.then(task);
  const settled = run.then(
    () => undefined,
    () => undefined,
  );
  queues.set(key, settled);
  void settled.then(() => {
    if (queues.get(key) === settled) {
      queues.delete(key);
    }
  });
  return run;
}

/** Writes to a sibling temp file and renames it so readers never observe a partial file. */
async function writeJsonAtomic(filePath: string, data: unknown): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${randomUUID()}.tmp`;
  try {
    await writeFile(tempPath, JSON.stringify(data, null, 2), "utf8");
    await rename(tempPath, filePath);
  } catch (error) {
    await rm(tempPath, { force: true });
    throw error;
  }
}

export function createJsonFileStore<T>({
  filePath,
  seed,
  parse,
}: JsonFileStoreOptions<T>): JsonFileStore<T> {
  const key = path.resolve(filePath);

  async function readUnlocked(): Promise<T> {
    let raw: string;
    try {
      raw = await readFile(key, "utf8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
      const seeded = seed();
      await writeJsonAtomic(key, seeded);
      return seeded;
    }
    return parse(JSON.parse(raw) as unknown);
  }

  return {
    read: () => enqueue(key, readUnlocked),
    update: (mutate) =>
      enqueue(key, async () => {
        const data = await readUnlocked();
        const result = mutate(data);
        await writeJsonAtomic(key, data);
        return result;
      }),
  };
}
