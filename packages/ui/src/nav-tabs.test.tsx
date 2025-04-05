import { render, screen } from "@testing-library/react";
import { NavTabs, NavTabsItem } from "./nav-tabs";

describe("NavTabs", () => {
  it("renders as nav with aria-label", () => {
    render(
      <NavTabs>
        <NavTabsItem href="#" active>Overview</NavTabsItem>
        <NavTabsItem href="#">Settings</NavTabsItem>
      </NavTabs>,
    );
    expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
  });

  it("renders anchor elements", () => {
    render(
      <NavTabs>
        <NavTabsItem href="/overview" active>Overview</NavTabsItem>
        <NavTabsItem href="/settings">Settings</NavTabsItem>
      </NavTabs>,
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("Overview");
  });
});
