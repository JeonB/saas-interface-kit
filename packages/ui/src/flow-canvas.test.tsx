import { render, screen } from "@testing-library/react";
import { FlowCanvas } from "./flow-canvas";

vi.mock("@xyflow/react", () => {
  return {
    Background: () => <div data-testid="flow-background" />,
    BackgroundVariant: { Dots: "dots" },
    Controls: () => <div data-testid="flow-controls" />,
    ReactFlow: ({ children, ...props }: { children?: React.ReactNode } & Record<string, unknown>) => (
      <div aria-label={String(props["aria-label"])} data-testid="flow-root">
        {children}
      </div>
    ),
  };
});

describe("워크플로 캔버스", () => {
  it("기본 a11y 라벨과 서브 컴포넌트 렌더", () => {
    render(<FlowCanvas edges={[]} nodes={[]} />);
    expect(screen.getByLabelText("워크플로 캔버스")).toBeInTheDocument();
    expect(screen.getByTestId("flow-background")).toBeInTheDocument();
    expect(screen.getByTestId("flow-controls")).toBeInTheDocument();
  });
});
