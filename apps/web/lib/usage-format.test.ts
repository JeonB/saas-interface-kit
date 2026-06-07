import { describe, expect, it } from "vitest";
import { formatActiveSeats, formatChurnRate, formatMrrUsd } from "./usage-format";

describe("usage-format", () => {
  it("formats MRR as a compact USD label", () => {
    expect(formatMrrUsd(48_200)).toBe("$48.2k");
    expect(formatMrrUsd(1_000)).toBe("$1.0k");
    expect(formatMrrUsd(950)).toBe("$950");
  });

  it("formats churn ratio as a percentage with one decimal", () => {
    expect(formatChurnRate(0.01)).toBe("1.0%");
    expect(formatChurnRate(0.123)).toBe("12.3%");
    expect(formatChurnRate(0)).toBe("0.0%");
  });

  it("formats active seats with thousands separators", () => {
    expect(formatActiveSeats(1_842)).toBe("1,842");
    expect(formatActiveSeats(42)).toBe("42");
  });
});
