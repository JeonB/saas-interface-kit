import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@repo/ui/separator";

const meta = {
  title: "Utility/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Visual divider with `role=\"separator\"` and `aria-orientation`. **Do:** use between logical content sections. **Don't:** use purely for spacing—use padding/margin instead.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <p className="ui:text-sm ui:text-text-primary">Section A</p>
      <Separator className="ui:my-3" />
      <p className="ui:text-sm ui:text-text-primary">Section B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-3" style={{ height: 40 }}>
      <span className="ui:text-sm ui:text-text-primary">Left</span>
      <Separator orientation="vertical" />
      <span className="ui:text-sm ui:text-text-primary">Right</span>
    </div>
  ),
};
