import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "./stat-card";

describe("StatCard", () => {
  it("renders label and value", () => {
    render(<StatCard label="Monthly revenue" value="$12,400" />);

    expect(screen.getByText("Monthly revenue")).toBeInTheDocument();
    expect(screen.getByText("$12,400")).toBeInTheDocument();
  });

  it("renders delta when provided", () => {
    render(<StatCard delta="+8.2% vs last month" label="MRR" trend="up" value="$42k" />);

    expect(screen.getByText("+8.2% vs last month")).toBeInTheDocument();
  });
});
