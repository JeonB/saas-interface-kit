import { render } from "@testing-library/react";
import { Gradient } from "./gradient";

describe("그라데이션", () => {
  it("크래시 없이 렌더", () => {
    const { container } = render(<Gradient />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("conic·small 분기", () => {
    const { container } = render(<Gradient className="ui:opacity-50" conic small />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("ui:blur-[32px]");
    expect(el).toHaveClass("ui:from-10%");
    expect(el).toHaveClass("ui:opacity-50");
  });
});
