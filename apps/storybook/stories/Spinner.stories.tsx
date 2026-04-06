import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@repo/ui/spinner";

const meta = {
  title: "Data/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible loading indicator. Default `role=\"status\"` with `aria-label=\"Loading\"`. **A11y:** set `decorative` when nested inside a button with `aria-busy`. **Do:** use `size` for density context. **Don't:** display without accompanying loading context.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    decorative: { control: "boolean" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: "md" } };

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};
