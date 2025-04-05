import { render, screen } from "@testing-library/react";
import { MetricCard } from "./metric-card";

describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Revenue" value="$50k" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$50k")).toBeInTheDocument();
  });

  it("shows delta when provided", () => {
    render(<MetricCard label="MRR" value="$48k" delta="+5%" trend="up" />);
    expect(screen.getByText("+5%")).toBeInTheDocument();
  });

  it("shows comparison label", () => {
    render(<MetricCard label="MRR" value="$48k" comparisonLabel="vs last month" />);
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });
});
