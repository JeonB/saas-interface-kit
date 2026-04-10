import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { EmptyState } from "./empty-state";

describe("빈 상태", () => {
  it("제목과 설명 렌더", () => {
    render(
      <EmptyState
        description="Create a project to see data here."
        title="No projects yet"
      />,
    );

    expect(screen.getByText("No projects yet")).toBeInTheDocument();
    expect(screen.getByText("Create a project to see data here.")).toBeInTheDocument();
  });

  it("선택 동작 렌더", () => {
    render(
      <EmptyState
        action={<Button name="create">Create project</Button>}
        description="Desc"
        title="Title"
      />,
    );

    expect(screen.getByRole("button", { name: "Create project" })).toBeInTheDocument();
  });

  it("ReactNode 설명 렌더", () => {
    render(
      <EmptyState
        description={
          <>
            See <a href="/help">help</a> for details.
          </>
        }
        title="Empty"
      />,
    );

    expect(screen.getByRole("link", { name: "help" })).toHaveAttribute("href", "/help");
  });
});
