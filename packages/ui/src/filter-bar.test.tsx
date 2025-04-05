import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar, FilterChip } from "./filter-bar";

describe("FilterBar", () => {
  it("renders children", () => {
    render(
      <FilterBar>
        <FilterChip active>All</FilterChip>
        <FilterChip>Active</FilterChip>
      </FilterBar>,
    );
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
  });
});

describe("FilterChip", () => {
  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<FilterChip onClick={onClick}>Test</FilterChip>);
    await userEvent.click(screen.getByRole("button", { name: "Test" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
