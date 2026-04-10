import { render, screen } from "@testing-library/react";
import { StatusIndicator } from "./status-indicator";

describe("상태 표시", () => {
  it("레이블 텍스트 렌더", () => {
    render(<StatusIndicator state="online" label="All systems operational" />);
    expect(screen.getByText("All systems operational")).toBeInTheDocument();
  });

  it("보조 기술에서 점 숨김", () => {
    const { container } = render(
      <StatusIndicator state="degraded" label="Partial outage" />,
    );
    const dot = container.querySelector("[aria-hidden]");
    expect(dot).toBeInTheDocument();
  });
});
