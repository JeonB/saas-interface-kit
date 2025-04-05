import { render, screen } from "@testing-library/react";
import { AppShell, AppShellSidebar, AppShellMain, AppShellHeader, AppShellContent } from "./app-shell";

describe("AppShell", () => {
  it("renders semantic landmarks", () => {
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

  it("renders children content", () => {
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
