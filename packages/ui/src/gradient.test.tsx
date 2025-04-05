import { render } from "@testing-library/react";
import { Gradient } from "./gradient";

describe("Gradient", () => {
  it("renders without crashing", () => {
    const { container } = render(<Gradient />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
