import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@repo/ui/textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "여러 줄 텍스트입니다. 레이블·힌트·오류 연결은 `Field`와 짝지으세요. 기본 `resize-y`를 선호하고, 너비는 레이아웃 컨테이너로 제한하세요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "notes",
    placeholder: "팀을 위한 맥락을 입력하세요…",
    "aria-label": "메모",
    rows: 4,
    size: "md",
  },
};
