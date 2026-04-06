import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@repo/ui/select";

const meta = {
  title: "Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Native `<select>` with semantic tokens and size variants. **A11y:** built on native select—full keyboard and screen reader support by default. **Do:** always provide `name` and `aria-label` or wrapping `Field`. **Don't:** use for more than ~15 options—consider Command palette instead.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} name="region" aria-label="Region" defaultValue="">
      <option value="" disabled>
        Select region...
      </option>
      <option value="us-east">US East</option>
      <option value="us-west">US West</option>
      <option value="eu-west">EU West</option>
      <option value="ap-southeast">AP Southeast</option>
    </Select>
  ),
  args: { size: "md" },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:flex-col ui:gap-3" style={{ width: 240 }}>
      <Select name="sm" aria-label="Small" size="sm">
        <option>Small</option>
      </Select>
      <Select name="md" aria-label="Medium" size="md">
        <option>Medium</option>
      </Select>
      <Select name="lg" aria-label="Large" size="lg">
        <option>Large</option>
      </Select>
    </div>
  ),
};
