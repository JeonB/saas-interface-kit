import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetricCard } from "@repo/ui/metric-card";

const meta = {
  title: "Data/MetricCard",
  component: MetricCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "선택 델타, 비교 레이블, 차트 슬롯이 있는 확장 KPI 카드입니다. **접근성:** 단순 텍스트 구조. **권장:** 델타 색은 `trend`로. **비권장:** 카드 안에 상호작용 컨트롤 삽입.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    trend: { control: "select", options: ["up", "down", "neutral"] },
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "월 매출",
    value: "$48.2k",
    delta: "+6.1%",
    trend: "up",
    comparisonLabel: "전월 대비",
  },
};

export const WithChart: Story = {
  args: {
    label: "API 지연",
    value: "124 ms",
    delta: "-12ms",
    trend: "down",
    chart: (
      <div className="ui:flex ui:h-12 ui:items-end ui:gap-0.5">
        {[40, 55, 38, 62, 48, 45, 30].map((h, i) => (
          <div key={i} className="ui:flex-1 ui:rounded-t ui:bg-semantic-brand/30" style={{ height: `${h}%` }} />
        ))}
      </div>
    ),
  },
};
