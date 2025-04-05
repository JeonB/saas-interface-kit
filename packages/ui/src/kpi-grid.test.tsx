import { render, screen } from "@testing-library/react";
import { KPIGrid } from "./kpi-grid";

describe("KPIGrid", () => {
  it("renders children in a grid", () => {
    render(
      <KPIGrid>
        <div>Card 1</div>
        <div>Card 2</div>
      </KPIGrid>,
    );
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });
});
