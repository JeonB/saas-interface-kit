import { render, screen } from "@testing-library/react";
import { AppShell, AppShellSidebar, AppShellMain, AppShellHeader, AppShellContent } from "./app-shell";

describe("앱 셸", () => {
  it("시맨틱 랜드마크 렌더", () => {
    render(
      <AppShell>
        <AppShellSidebar aria-label="Sidebar">Sidebar</AppShellSidebar>
        <AppShellMain>
          <AppShellHeader>Header</AppShellHeader>
          <AppShellContent>Content</AppShellContent>
        </AppShellMain>
      </AppShell>,
    );
    expect(screen.getByRole("complementary", { name: "Sidebar" })).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("자식 콘텐츠 렌더", () => {
    render(
      <AppShell>
        <AppShellSidebar>Nav</AppShellSidebar>
        <AppShellMain>
          <AppShellContent>Main content</AppShellContent>
        </AppShellMain>
      </AppShell>,
    );
    expect(screen.getByText("Nav")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });
});
