import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar, FilterChip } from "./filter-bar";

describe("필터 바", () => {
  it("자식 렌더", () => {
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

describe("필터 칩", () => {
  it("클릭 시 onClick 호출", async () => {
    const onClick = vi.fn();
    render(<FilterChip onClick={onClick}>Test</FilterChip>);
    await userEvent.click(screen.getByRole("button", { name: "Test" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
