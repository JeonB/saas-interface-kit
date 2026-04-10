import { render, screen } from "@testing-library/react";
import { MetricCard } from "./metric-card";

describe("지표 카드", () => {
  it("레이블과 값 렌더", () => {
    render(<MetricCard label="Revenue" value="$50k" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$50k")).toBeInTheDocument();
  });

  it("델타가 있으면 표시", () => {
    render(<MetricCard label="MRR" value="$48k" delta="+5%" trend="up" />);
    expect(screen.getByText("+5%")).toBeInTheDocument();
  });

  it("비교 레이블 표시", () => {
    render(<MetricCard label="MRR" value="$48k" comparisonLabel="vs last month" />);
    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });
});
