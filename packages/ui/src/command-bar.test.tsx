import { render, screen } from "@testing-library/react";
import { CommandBar } from "./command-bar";

describe("CommandBar", () => {
  it("renders with role=search", () => {
    render(<CommandBar>Search area</CommandBar>);
    expect(screen.getByRole("search")).toHaveTextContent("Search area");
  });
});
