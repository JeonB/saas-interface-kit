import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { coreTokens, cssVars } from "./tokens.js";

const themeCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../theme.css"), "utf8");

type VarTree = string | { readonly [key: string]: VarTree };

function collectVars(value: VarTree): string[] {
  if (typeof value === "string") {
    return [value];
  }

  return Object.values(value).flatMap((entry) => collectVars(entry));
}

describe("@repo/tokens theme contract", () => {
  it("publishes every css variable name from theme.css", () => {
    for (const name of collectVars(cssVars)) {
      expect(themeCss).toContain(`${name}:`);
    }
  });

  it("keeps the font import in fonts.css so it can precede Tailwind", () => {
    const fontsCss = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../fonts.css"), "utf8");
    expect(fontsCss.startsWith("@import url(")).toBe(true);
    expect(themeCss).not.toContain("@import url(");
  });

  it("keeps locked core color and spacing values in theme.css", () => {
    expect(themeCss).toContain(`--color-core-primary: ${coreTokens.color.primary};`);
    expect(themeCss).toContain(`--color-core-muted: ${coreTokens.color.muted};`);
    expect(themeCss).toContain(`--color-core-destructive: ${coreTokens.color.destructive};`);
    expect(themeCss).toContain(`--spacing-core-xs: ${coreTokens.spacing.xs};`);
    expect(themeCss).toContain(`--spacing-core-sm: ${coreTokens.spacing.sm};`);
    expect(themeCss).toContain(`--spacing-core-md: ${coreTokens.spacing.md};`);
    expect(themeCss).toContain(`--spacing-core-lg: ${coreTokens.spacing.lg};`);
    expect(themeCss).toContain(`--spacing-core-xl: ${coreTokens.spacing.xl};`);
  });
});
