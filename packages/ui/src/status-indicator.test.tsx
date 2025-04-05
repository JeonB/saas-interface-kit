import { render, screen } from "@testing-library/react";
import { StatusIndicator } from "./status-indicator";

describe("StatusIndicator", () => {
  it("renders label text", () => {
    render(<StatusIndicator state="online" label="All systems operational" />);
    expect(screen.getByText("All systems operational")).toBeInTheDocument();
  });

  it("hides dot from assistive tech", () => {
    const { container } = render(
      <StatusIndicator state="degraded" label="Partial outage" />,
    );
    const dot = container.querySelector("[aria-hidden]");
    expect(dot).toBeInTheDocument();
  });
});
