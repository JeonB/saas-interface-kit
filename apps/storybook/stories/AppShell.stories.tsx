import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell, AppShellSidebar, AppShellMain, AppShellHeader, AppShellContent } from "@repo/ui/app-shell";

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-level layout shell for SaaS dashboards. Composes Sidebar, Header, and Content into a responsive grid. **A11y:** sidebar renders as `<aside>`, header as `<header>`, content as `<main>`. **Do:** compose with Sidebar and NavTabs for navigation. **Don't:** nest AppShell inside another AppShell.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell className="ui:h-[400px]">
      <AppShellSidebar>
        <div className="ui:p-4 ui:text-sm ui:text-text-secondary">Sidebar</div>
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader>
          <span className="ui:text-sm ui:font-medium ui:text-text-primary">Header</span>
        </AppShellHeader>
        <AppShellContent>
          <p className="ui:text-sm ui:text-text-secondary">Main content area</p>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  ),
};
