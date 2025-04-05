import { render, screen } from "@testing-library/react";
import { Sidebar, SidebarGroup, SidebarItem } from "./sidebar";

describe("Sidebar", () => {
  it("renders as nav with aria-label", () => {
    render(
      <Sidebar>
        <SidebarGroup label="Main">
          <SidebarItem href="#">Dashboard</SidebarItem>
        </SidebarGroup>
      </Sidebar>,
    );
    expect(
      screen.getByRole("navigation", { name: "Main" }),
    ).toBeInTheDocument();
  });

  it("renders group label and items", () => {
    render(
      <Sidebar>
        <SidebarGroup label="Platform">
          <SidebarItem href="#" active>
            Overview
          </SidebarItem>
          <SidebarItem href="#">Analytics</SidebarItem>
        </SidebarGroup>
      </Sidebar>,
    );
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Overview")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });
});
