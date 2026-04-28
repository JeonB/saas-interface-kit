import type { Meta, StoryObj } from "@storybook/react-vite";
import { RunStatusBadge } from "@repo/ui/run-status-badge";

const meta = {
  title: "Integration/RunStatusBadge",
  component: RunStatusBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "워크플로 실행 상태를 표시하는 배지입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["queued", "running", "succeeded", "failed", "cancelled"],
    },
  },
} satisfies Meta<typeof RunStatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Running: Story = {
  args: {
    status: "running",
  },
};
