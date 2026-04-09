import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "@repo/ui/spinner";

const meta = {
  title: "Data/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "접근 가능한 로딩 표시입니다. 기본 `role=\"status\"`와 `aria-label=\"로딩 중\"`. **접근성:** `aria-busy` 버튼 안에 넣을 때는 `decorative` 설정. **권장:** 밀도 맥락에 맞게 `size`. **비권장:** 로딩 맥락 없이 단독 표시.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    decorative: { control: "boolean" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: "md" } };

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};
