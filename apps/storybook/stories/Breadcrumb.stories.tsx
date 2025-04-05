import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@repo/ui/breadcrumb";

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Breadcrumb trail for hierarchical navigation. **A11y:** `<nav aria-label=\"Breadcrumb\">` with `<ol>`. Separators are `aria-hidden`. **Do:** keep paths short (3-4 levels). **Don't:** make the last item a link—it represents the current page.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem><a href="#" className="ui:text-text-secondary hover:ui:text-text-primary">Home</a></BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem><a href="#" className="ui:text-text-secondary hover:ui:text-text-primary">Projects</a></BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem><span className="ui:text-text-primary">Analytics API</span></BreadcrumbItem>
    </Breadcrumb>
  ),
};
