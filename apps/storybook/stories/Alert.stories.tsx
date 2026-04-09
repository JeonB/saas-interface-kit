import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "@repo/ui/alert";

const meta = {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    title: { control: "text" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "안내용 알림입니다.",
    variant: "info",
  },
};

export const Info: Story = {
  args: {
    title: "안내",
    children: "일반적인 정보 표시에 사용할 수 있습니다.",
    variant: "info",
  },
};

export const Success: Story = {
  args: {
    title: "성공",
    children: "변경 사항이 저장되었습니다.",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "경고",
    children: "계속하기 전에 내용을 확인하세요.",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    title: "오류",
    children: "문제가 발생했습니다. 다시 시도하세요.",
    variant: "error",
  },
};
