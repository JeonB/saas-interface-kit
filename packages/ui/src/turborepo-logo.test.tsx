import { render } from "@testing-library/react";
import { TurborepoLogo } from "./turborepo-logo";

describe("TurborepoLogo", () => {
  it("renders an SVG element", () => {
    const { container } = render(<TurborepoLogo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
