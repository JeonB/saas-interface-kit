import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";

const meta = {
  title: "UI/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Label + control wrapper. Clones the child to set `id`, `aria-describedby`, and `aria-invalid`. Use one interactive child (e.g. `Input`, `Textarea`).",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHint: Story = {
  render: () => (
    <div className="ui:w-80">
      <Field hint="Shown on invoices and reports." id="display-name" label="Display name">
        <Input name="displayName" placeholder="Acme Corp" />
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="ui:w-80">
      <Field error="Company name is required." id="company" label="Company">
        <Input name="company" />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "When `error` is set, hint is hidden and `aria-invalid` is applied for assistive tech.",
      },
    },
  },
};
