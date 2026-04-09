import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@repo/ui/select";

const meta = {
  title: "Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "시맨틱 토큰·크기 변형이 있는 네이티브 `<select>`입니다. **접근성:** 네이티브 select 기반이라 키보드·스크린 리더 지원이 기본입니다. **권장:** 항상 `name`과 `aria-label` 또는 감싼 `Field`. **비권장:** 약 15개 이상 옵션 — Command 팔레트 검토.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} name="region" aria-label="리전" defaultValue="">
      <option value="" disabled>
        리전 선택…
      </option>
      <option value="us-east">미국 동부</option>
      <option value="us-west">미국 서부</option>
      <option value="eu-west">유럽 서부</option>
      <option value="ap-southeast">아시아 태평양 남동</option>
    </Select>
  ),
  args: { size: "md" },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:flex-col ui:gap-3" style={{ width: 240 }}>
      <Select name="sm" aria-label="작게" size="sm">
        <option>작게</option>
      </Select>
      <Select name="md" aria-label="보통" size="md">
        <option>보통</option>
      </Select>
      <Select name="lg" aria-label="크게" size="lg">
        <option>크게</option>
      </Select>
    </div>
  ),
};
