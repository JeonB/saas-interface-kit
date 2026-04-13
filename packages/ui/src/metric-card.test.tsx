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

  it("차트 슬롯 렌더", () => {
    render(
      <MetricCard chart={<span data-testid="spark">chart</span>} label="X" value="1" />,
    );
    expect(screen.getByTestId("spark")).toBeInTheDocument();
  });

  it.each([
    ["down", "-3%", "ui:text-semantic-danger"],
    ["neutral", "flat", "ui:text-text-secondary"],
  ] as const)("trend %s에 맞는 델타 톤", (trend, delta, cls) => {
    const { container } = render(
      <MetricCard delta={delta} label="K" trend={trend} value="0" />,
    );
    const deltaEl = screen.getByText(delta);
    expect(deltaEl).toHaveClass(cls);
    expect(container.firstChild).toBeTruthy();
  });
});
