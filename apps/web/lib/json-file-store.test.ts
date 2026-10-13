import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createJsonFileStore } from "./json-file-store";

type CounterFile = { items: string[] };

function parseCounter(raw: unknown): CounterFile {
  const parsed = raw as CounterFile;
  if (!Array.isArray(parsed?.items)) {
    throw new Error("Invalid counter file");
  }
  return parsed;
}

describe("json-file-store", () => {
  let dataDir = "";

  afterEach(() => {
    if (dataDir) {
      rmSync(dataDir, { recursive: true, force: true });
      dataDir = "";
    }
  });

  function createStore(fileName = "counter.json") {
    return createJsonFileStore<CounterFile>({
      filePath: path.join(dataDir, fileName),
      seed: () => ({ items: ["seed"] }),
      parse: parseCounter,
    });
  }

  it("seeds the file on first read", async () => {
    dataDir = mkdtempSync(path.join(tmpdir(), "json-store-"));
    const store = createStore();

    await expect(store.read()).resolves.toEqual({ items: ["seed"] });
    const onDisk = JSON.parse(readFileSync(path.join(dataDir, "counter.json"), "utf8")) as unknown;
    expect(onDisk).toEqual({ items: ["seed"] });
  });

  it("keeps every concurrent update, even across store instances", async () => {
    dataDir = mkdtempSync(path.join(tmpdir(), "json-store-"));
    const first = createStore();
    const second = createStore();

    await Promise.all(
      Array.from({ length: 20 }, (_, i) =>
        (i % 2 === 0 ? first : second).update((data) => {
          data.items.push(`item_${i}`);
        }),
      ),
    );

    const { items } = await first.read();
    expect(items).toHaveLength(21);
    expect(new Set(items).size).toBe(21);
  });

  it("returns the mutate result and leaves no temp files behind", async () => {
    dataDir = mkdtempSync(path.join(tmpdir(), "json-store-"));
    const store = createStore();

    const count = await store.update((data) => {
      data.items.push("next");
      return data.items.length;
    });

    expect(count).toBe(2);
    expect(readdirSync(dataDir)).toEqual(["counter.json"]);
  });

  it("does not persist when mutate throws and keeps the queue usable", async () => {
    dataDir = mkdtempSync(path.join(tmpdir(), "json-store-"));
    const store = createStore();

    await expect(
      store.update((data) => {
        data.items.push("discarded");
        throw new Error("boom");
      }),
    ).rejects.toThrow("boom");

    await expect(store.read()).resolves.toEqual({ items: ["seed"] });
  });

  it("rejects a file that fails validation", async () => {
    dataDir = mkdtempSync(path.join(tmpdir(), "json-store-"));
    writeFileSync(path.join(dataDir, "counter.json"), JSON.stringify({ other: true }), "utf8");
    const store = createStore();

    await expect(store.read()).rejects.toThrow("Invalid counter file");
  });
});
