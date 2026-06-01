import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WorkflowEditor } from "./workflow-editor";

vi.mock("@xyflow/react", async () => {
  const actual = await vi.importActual<typeof import("@xyflow/react")>("@xyflow/react");
  return {
    ...actual,
    ReactFlow: ({ "aria-label": ariaLabel }: { "aria-label"?: string }) => (
      <div aria-label={ariaLabel} data-testid="react-flow-mock" />
    ),
    Background: () => null,
    Controls: () => null,
    ReactFlowProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("WorkflowEditor", () => {
  it("renders palette and canvas in edit mode", () => {
    render(
      <WorkflowEditor
        edges={[]}
        nodes={[
          {
            id: "n1",
            type: "trigger",
            position: { x: 0, y: 0 },
            data: { label: "Trigger" },
          },
        ]}
        readOnly={false}
      />,
    );
    expect(screen.getByLabelText("노드 팔레트")).toBeInTheDocument();
    expect(screen.getByLabelText("워크플로 편집 캔버스")).toBeInTheDocument();
  });

  it("hides palette in read-only mode", () => {
    render(<WorkflowEditor edges={[]} nodes={[]} readOnly />);
    expect(screen.queryByLabelText("노드 팔레트")).not.toBeInTheDocument();
  });
});
