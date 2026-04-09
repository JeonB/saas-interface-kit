import type { Meta, StoryObj } from "@storybook/react-vite";
import { KPIGrid } from "@repo/ui/kpi-grid";
import { StatCard } from "@repo/ui/stat-card";

const meta = {
  title: "Layout/KPIGrid",
  component: KPIGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "KPI 카드용 반응형 그리드입니다. 모바일 1열에서 큰 화면 4열까지 맞춥니다. **권장:** StatCard나 MetricCard 자식으로 채움. **비권장:** 지표가 아닌 콘텐츠 혼입.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KPIGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <KPIGrid>
      <StatCard label="MRR" value="$52.1k" delta="+4.2%" trend="up" />
      <StatCard label="이탈률" value="1.1%" delta="-0.4pp" trend="down" />
      <StatCard label="활성 조직" value="86" delta="—" trend="neutral" />
      <StatCard label="NPS" value="72" delta="+3" trend="up" />
    </KPIGrid>
  ),
};
