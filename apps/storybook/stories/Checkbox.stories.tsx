import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@repo/ui/checkbox";

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "레이블이 연결된 네이티브 체크박스입니다. ref로 `indeterminate` 상태를 지원합니다. **접근성:** `<input type=\"checkbox\">`와 `<label htmlFor>`. **권장:** 항상 `id`와 `label`. **비권장:** Switch가 더 맞는 즉시 토글에 사용.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "terms",
    label: "서비스 약관에 동의합니다",
    name: "terms",
  },
};

export const Indeterminate: Story = {
  args: {
    id: "selectAll",
    label: "전체 선택",
    name: "selectAll",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "archived",
    label: "보관됨 포함",
    name: "archived",
    disabled: true,
  },
};
