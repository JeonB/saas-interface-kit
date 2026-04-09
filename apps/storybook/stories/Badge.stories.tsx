import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@repo/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "배지",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    children: "성공",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "경고",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "위험",
    variant: "danger",
  },
};
