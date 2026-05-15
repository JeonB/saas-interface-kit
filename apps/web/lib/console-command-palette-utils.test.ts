import { describe, expect, it } from "vitest";
import { CONSOLE_NAV_ITEMS } from "../components/console-nav-items";
import {
  buildShortcutMap,
  countNavMatches,
  filterNavItemsByGroup,
  filterNavItemsBySearch,
  isPaletteToggleShortcut,
  matchesNavQuery,
  normalizeSearchQuery,
} from "./console-command-palette-utils";

describe("console-command-palette-utils", () => {
  it("normalizeSearchQuery trims and lowercases", () => {
    expect(normalizeSearchQuery("  Hello ")).toBe("hello");
  });

  it("matchesNavQuery matches label and keywords", () => {
    const runs = CONSOLE_NAV_ITEMS.find((item) => item.id === "runs");
    expect(runs).toBeDefined();
    if (!runs) {
      throw new Error("runs nav item missing");
    }
    expect(matchesNavQuery(runs, "실행")).toBe(true);
    expect(matchesNavQuery(runs, "history")).toBe(true);
    expect(matchesNavQuery(runs, "billing")).toBe(false);
  });

  it("filterNavItemsBySearch returns all items for empty query", () => {
    expect(filterNavItemsBySearch(CONSOLE_NAV_ITEMS, "")).toHaveLength(CONSOLE_NAV_ITEMS.length);
  });

  it("filterNavItemsByGroup groups matches under headings", () => {
    const grouped = filterNavItemsByGroup("통합", CONSOLE_NAV_ITEMS);
    const integrations = grouped.get("console") ?? [];
    expect(integrations.some((item) => item.id === "integrations")).toBe(true);
    expect(countNavMatches(grouped)).toBeGreaterThan(0);
  });

  it("buildShortcutMap maps shortcut keys to items", () => {
    const map = buildShortcutMap(CONSOLE_NAV_ITEMS);
    expect(map.get("r")?.id).toBe("runs");
    expect(map.get("i")?.id).toBe("integrations");
  });

  it("isPaletteToggleShortcut detects Cmd/Ctrl+K", () => {
    expect(isPaletteToggleShortcut({ key: "k", metaKey: true, ctrlKey: false })).toBe(true);
    expect(isPaletteToggleShortcut({ key: "K", metaKey: false, ctrlKey: true })).toBe(true);
    expect(isPaletteToggleShortcut({ key: "k", metaKey: false, ctrlKey: false })).toBe(false);
    expect(isPaletteToggleShortcut({ key: "j", metaKey: true, ctrlKey: false })).toBe(false);
  });
});
