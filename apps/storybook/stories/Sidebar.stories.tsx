import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar, SidebarGroup, SidebarItem } from "@repo/ui/sidebar";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Vertical navigation panel with grouped links. **A11y:** renders as `<nav aria-label=\"Main\">`. **Do:** use SidebarGroup for logical sections and SidebarItem for links. **Don't:** place form controls directly inside the sidebar.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="ui:w-56 ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised">
      <Sidebar>
        <SidebarGroup label="Platform">
          <SidebarItem href="#" active>Overview</SidebarItem>
          <SidebarItem href="#">Analytics</SidebarItem>
          <SidebarItem href="#">Settings</SidebarItem>
        </SidebarGroup>
        <SidebarGroup label="Resources">
          <SidebarItem href="#">Docs</SidebarItem>
          <SidebarItem href="#">Support</SidebarItem>
        </SidebarGroup>
      </Sidebar>
    </div>
  ),
};
