import type { Meta, StoryObj } from "@storybook/react-vite";
import { VisuallyHidden } from "@repo/ui/visually-hidden";

const meta = {
  title: "Utility/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Hides content visually while keeping it accessible to screen readers. Uses CSS clip-path technique. **Do:** use for skip links, icon-only button labels, or extra context. **Don't:** use to hide decorative content—use `aria-hidden` instead.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <p className="ui:text-sm ui:text-text-primary">The text below is visually hidden but readable by screen readers:</p>
      <VisuallyHidden>This text is only for assistive technology.</VisuallyHidden>
      <p className="ui:mt-2 ui:text-xs ui:text-text-muted">(Inspect the DOM to see the hidden span.)</p>
    </div>
  ),
};
