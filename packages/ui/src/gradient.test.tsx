import { render } from "@testing-library/react";
import { Gradient } from "./gradient";

describe("그라데이션", () => {
  it("크래시 없이 렌더", () => {
    const { container } = render(<Gradient />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
