import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavTabs, NavTabsItem } from "@repo/ui/nav-tabs";

const meta = {
  title: "Layout/NavTabs",
  component: NavTabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal anchor-based navigation tabs, typically placed below a header. **A11y:** renders as `<nav aria-label=\"Sections\">` with anchor children. **Do:** use for page-level route switching. **Don't:** confuse with `Tabs` (controlled tab panels).",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavTabs>
      <NavTabsItem href="#" active>Overview</NavTabsItem>
      <NavTabsItem href="#">Analytics</NavTabsItem>
      <NavTabsItem href="#">Settings</NavTabsItem>
    </NavTabs>
  ),
};
