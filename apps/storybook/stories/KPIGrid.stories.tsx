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
          "Responsive grid for KPI cards. Adapts from 1-column on mobile to 4-column on large screens. **Do:** fill with StatCard or MetricCard children. **Don't:** mix non-metric content inside the grid.",
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
      <StatCard label="Churn" value="1.1%" delta="-0.4pp" trend="down" />
      <StatCard label="Active orgs" value="86" delta="—" trend="neutral" />
      <StatCard label="NPS" value="72" delta="+3" trend="up" />
    </KPIGrid>
  ),
};
