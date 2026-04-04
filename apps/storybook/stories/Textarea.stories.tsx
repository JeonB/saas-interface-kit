import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@repo/ui/textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line text. Pair with `Field` for label, hint, and error wiring. Prefer `resize-y` default; constrain width with layout containers, not one-off height hacks.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "notes",
    placeholder: "Add context for your team…",
    "aria-label": "Notes",
    rows: 4,
    size: "md",
  },
};
