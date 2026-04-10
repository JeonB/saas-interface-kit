import { render, screen } from "@testing-library/react";
import { Sidebar, SidebarGroup, SidebarItem } from "./sidebar";

describe("사이드바", () => {
  it("aria-label이 있는 nav로 렌더", () => {
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

  it("그룹 레이블과 항목을 렌더", () => {
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
