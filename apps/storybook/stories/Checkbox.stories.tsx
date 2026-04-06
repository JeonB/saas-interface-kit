import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@repo/ui/checkbox";

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Native checkbox with label association. Supports `indeterminate` state via ref. **A11y:** `<input type="checkbox">` with `<label htmlFor>`. **Do:** always provide `id` and `label`. **Don\'t:** use for binary toggles where Switch is more appropriate.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "terms",
    label: "I agree to the terms of service",
    name: "terms",
  },
};

export const Indeterminate: Story = {
  args: {
    id: "selectAll",
    label: "Select all",
    name: "selectAll",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "archived",
    label: "Include archived",
    name: "archived",
    disabled: true,
  },
};
