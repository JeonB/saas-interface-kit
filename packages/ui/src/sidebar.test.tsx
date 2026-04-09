import { render, screen } from "@testing-library/react";
import { Sidebar, SidebarGroup, SidebarItem } from "./sidebar";

describe("Sidebar", () => {
  it("renders as nav with aria-label", () => {
    render(
      <Sidebar>
        <SidebarGroup label="메인">
          <SidebarItem href="#">대시보드</SidebarItem>
        </SidebarGroup>
      </Sidebar>,
    );
    expect(
      screen.getByRole("navigation", { name: "주 메뉴" }),
    ).toBeInTheDocument();
  });

  it("renders group label and items", () => {
    render(
      <Sidebar>
        <SidebarGroup label="플랫폼">
          <SidebarItem href="#" active>
            개요
          </SidebarItem>
          <SidebarItem href="#">분석</SidebarItem>
        </SidebarGroup>
      </Sidebar>,
    );
    expect(screen.getByText("플랫폼")).toBeInTheDocument();
    expect(screen.getByText("개요")).toBeInTheDocument();
    expect(screen.getByText("분석")).toBeInTheDocument();
  });
});
