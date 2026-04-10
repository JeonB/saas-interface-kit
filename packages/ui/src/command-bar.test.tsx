import { render, screen } from "@testing-library/react";
import { CommandBar } from "./command-bar";

describe("명령 표시줄", () => {
  it("role=search로 렌더", () => {
    render(<CommandBar>Search area</CommandBar>);
    expect(screen.getByRole("search")).toHaveTextContent("Search area");
  });
});
