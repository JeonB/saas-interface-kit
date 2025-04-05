import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RadioGroup, RadioItem } from "@repo/ui/radio-group";

const meta = {
  title: "Form/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Controlled radio group with `role="radiogroup"`. **A11y:** native `<input type="radio">` with associated `<label>`. **Do:** provide unique `id` per RadioItem. **Don\'t:** use for multi-select—use Checkbox instead.',
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("monthly");
    return (
      <RadioGroup name="billing" value={value} onValueChange={setValue}>
        <RadioItem id="monthly" label="Monthly billing" value="monthly" />
        <RadioItem
          id="annual"
          label="Annual billing (save 20%)"
          value="annual"
        />
      </RadioGroup>
    );
  },
};
