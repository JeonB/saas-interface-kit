import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primary action component. Keep `variant` semantic, and prefer `size` for visual hierarchy instead of adding custom paddings.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "danger"],
    },
    disabled: { control: "boolean" },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
    size: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    variant: "danger",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "default",
    size: "md",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `sm` in dense contexts and `lg` only for primary CTAs. Keep size decisions consistent per page.",
      },
    },
  },
};

export const DoAndDont: Story = {
  render: () => (
    <div className="ui:grid ui:gap-4">
      <div className="ui:flex ui:items-center ui:gap-2">
        <Button variant="primary">Do: Primary action</Button>
        <Button variant="default">Secondary</Button>
      </div>
      <div className="ui:flex ui:items-center ui:gap-2">
        <Button className="ui:px-14">Don't: Override spacing heavily</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Do keep semantic variants. Don't style around the component with large class overrides unless required by layout.",
      },
    },
  },
};
