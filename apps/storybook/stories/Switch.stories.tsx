import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "@repo/ui/switch";

const meta = {
  title: "Form/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Toggle switch with `role="switch"` and `aria-checked`. **A11y:** focus ring, disabled state. Pair with a `<label>` for accessible name. **Do:** use for instant boolean toggles (e.g. feature flags). **Don\'t:** use inside a form where Checkbox better conveys "agree" semantics.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="ui:flex ui:items-center ui:gap-3">
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          id="notifications"
          aria-label="Enable notifications"
        />
        <label
          htmlFor="notifications"
          className="ui:text-sm ui:text-text-primary"
        >
          Enable notifications
        </label>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(true);
    const [c, setC] = useState(true);
    return (
      <div className="ui:flex ui:items-center ui:gap-4">
        <Switch
          checked={a}
          onCheckedChange={setA}
          size="sm"
          aria-label="Small"
        />
        <Switch
          checked={b}
          onCheckedChange={setB}
          size="md"
          aria-label="Medium"
        />
        <Switch
          checked={c}
          onCheckedChange={setC}
          size="lg"
          aria-label="Large"
        />
      </div>
    );
  },
};
