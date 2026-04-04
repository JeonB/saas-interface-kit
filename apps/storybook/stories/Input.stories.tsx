import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@repo/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text input for forms and filters. Always set `name` (and usually `id` when not inside `Field`). Use `size` for density; avoid overriding height with arbitrary `className` unless layout requires it.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "q",
    placeholder: "Search…",
    "aria-label": "Search",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:w-80 ui:flex-col ui:gap-3">
      <Input aria-label="Small" name="s" placeholder="Small" size="sm" />
      <Input aria-label="Medium" name="m" placeholder="Medium" size="md" />
      <Input aria-label="Large" name="l" placeholder="Large" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Match input size to surrounding controls (e.g. `sm` in dense tables, `md` in default forms).",
      },
    },
  },
};
