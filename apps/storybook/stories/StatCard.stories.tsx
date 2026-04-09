import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "@repo/ui/stat-card";

const meta = {
  title: "UI/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SaaS 대시보드용 KPI 타일입니다. `trend`는 델타에 시맨틱 성공/위험 색을 매핑합니다. `value`는 짧게, 정렬은 내장 `tabular-nums`를 활용하세요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    trend: { control: "select", options: ["up", "down", "neutral"] },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "활성 시트",
    value: "1,248",
    delta: "전월 대비 +3.1%",
    trend: "up",
  },
};

export const Row: Story = {
  render: () => (
    <div className="ui:grid ui:max-w-3xl ui:grid-cols-3 ui:gap-4">
      <StatCard label="MRR" trend="up" value="$48,200" delta="+6%" />
      <StatCard label="이탈률" trend="up" value="1.0%" delta="-0.3pp" />
      <StatCard label="NPS" trend="neutral" value="42" delta="변동 없음" />
    </div>
  ),
};
