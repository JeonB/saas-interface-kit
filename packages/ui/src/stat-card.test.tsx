import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "./stat-card";

describe("통계 카드", () => {
  it("레이블과 값 렌더", () => {
    render(<StatCard label="Monthly revenue" value="$12,400" />);

    expect(screen.getByText("Monthly revenue")).toBeInTheDocument();
    expect(screen.getByText("$12,400")).toBeInTheDocument();
  });

  it("델타가 있으면 렌더", () => {
    render(<StatCard delta="+8.2% vs last month" label="MRR" trend="up" value="$42k" />);

    expect(screen.getByText("+8.2% vs last month")).toBeInTheDocument();
  });

  it.each([
    ["down", "-2%", "ui:text-semantic-danger"],
    ["neutral", "0%", "ui:text-text-secondary"],
  ] as const)("trend %s 델타 스타일", (trend, delta, cls) => {
    render(<StatCard delta={delta} label="Q" trend={trend} value="1" />);
    expect(screen.getByText(delta)).toHaveClass(cls);
  });
});
