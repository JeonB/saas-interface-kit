import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@repo/ui/input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "폼·필터용 텍스트 입력입니다. 항상 `name`을 설정하고(`Field` 밖이면 보통 `id`도). 밀도는 `size`로 맞추고, 레이아웃상 필요할 때가 아니면 임의 `className`으로 높이를 덮어쓰지 마세요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "q",
    placeholder: "검색…",
    "aria-label": "검색",
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:w-80 ui:flex-col ui:gap-3">
      <Input aria-label="작게" name="s" placeholder="작게" size="sm" />
      <Input aria-label="보통" name="m" placeholder="보통" size="md" />
      <Input aria-label="크게" name="l" placeholder="크게" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "주변 컨트롤과 입력 크기를 맞추세요(밀집 테이블은 `sm`, 기본 폼은 `md` 등).",
      },
    },
  },
};
