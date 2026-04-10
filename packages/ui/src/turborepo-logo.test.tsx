import { render } from "@testing-library/react";
import { TurborepoLogo } from "./turborepo-logo";

describe("Turborepo 로고", () => {
  it("SVG 요소 렌더", () => {
    const { container } = render(<TurborepoLogo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
