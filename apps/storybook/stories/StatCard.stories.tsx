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
          "KPI tile for SaaS dashboards. `trend` maps to semantic success/danger text for deltas; keep `value` short and use `tabular-nums` (built-in) for alignment.",
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
    label: "Active seats",
    value: "1,248",
    delta: "+3.1% vs last month",
    trend: "up",
  },
};

export const Row: Story = {
  render: () => (
    <div className="ui:grid ui:max-w-3xl ui:grid-cols-3 ui:gap-4">
      <StatCard label="MRR" trend="up" value="$48,200" delta="+6%" />
      <StatCard label="Churn" trend="up" value="1.0%" delta="-0.3pp" />
      <StatCard label="NPS" trend="neutral" value="42" delta="Flat" />
    </div>
  ),
};
