import { render, screen } from "@testing-library/react";
import { NavTabs, NavTabsItem } from "./nav-tabs";

describe("내비 탭", () => {
  it("aria-label이 있는 nav로 렌더", () => {
    render(
      <NavTabs>
        <NavTabsItem href="#" active>개요</NavTabsItem>
        <NavTabsItem href="#">설정</NavTabsItem>
      </NavTabs>,
    );
    expect(screen.getByRole("navigation", { name: "섹션" })).toBeInTheDocument();
  });

  it("앵커 요소 렌더", () => {
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

  it("active 항목에 aria-current=page 부여", () => {
    render(
      <NavTabs>
        <NavTabsItem href="/overview" active>개요</NavTabsItem>
        <NavTabsItem href="/settings">설정</NavTabsItem>
      </NavTabs>,
    );
    const [active, inactive] = screen.getAllByRole("link");
    expect(active).toHaveAttribute("aria-current", "page");
    expect(inactive).not.toHaveAttribute("aria-current");
  });
});
