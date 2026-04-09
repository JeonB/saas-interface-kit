import { render, screen } from "@testing-library/react";
import { NavTabs, NavTabsItem } from "./nav-tabs";

describe("NavTabs", () => {
  it("renders as nav with aria-label", () => {
    render(
      <NavTabs>
        <NavTabsItem href="#" active>개요</NavTabsItem>
        <NavTabsItem href="#">설정</NavTabsItem>
      </NavTabs>,
    );
    expect(screen.getByRole("navigation", { name: "섹션" })).toBeInTheDocument();
  });

  it("renders anchor elements", () => {
    render(
      <NavTabs>
        <NavTabsItem href="/overview" active>개요</NavTabsItem>
        <NavTabsItem href="/settings">설정</NavTabsItem>
      </NavTabs>,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("개요");
  });
});
