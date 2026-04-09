import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@repo/ui/skeleton";

const meta = {
  title: "Data/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "로딩 상태용 플레이스홀더 펄스 애니메이션입니다. **접근성:** `aria-hidden`으로 보조 기술이 건너뜀 — 스크린 리더 사용자에게는 live region이나 Spinner와 짝지으세요. **권장:** 예상 콘텐츠 크기에 맞출 것. **비권장:** 일반 배경 반짝임 용도.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    rounded: { control: "select", options: ["none", "sm", "md", "lg", "full"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { width: "200px", height: "20px" },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="ui:flex ui:flex-col ui:gap-3 ui:rounded-ui-md ui:border ui:border-border-subtle ui:p-4" style={{ width: 280 }}>
      <Skeleton width="60%" height="14px" />
      <Skeleton width="100%" height="28px" />
      <Skeleton width="40%" height="12px" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "로딩 중 카드 콘텐츠를 여러 Skeleton으로 근사합니다." } },
  },
};
