import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(
      <EmptyState
        description="Create a project to see data here."
        title="No projects yet"
      />,
    );

    expect(screen.getByText("No projects yet")).toBeInTheDocument();
    expect(screen.getByText("Create a project to see data here.")).toBeInTheDocument();
  });

  it("renders optional action", () => {
    render(
      <EmptyState
        action={<Button name="create">Create project</Button>}
        description="Desc"
        title="Title"
      />,
    );

    expect(screen.getByRole("button", { name: "Create project" })).toBeInTheDocument();
  });
});
