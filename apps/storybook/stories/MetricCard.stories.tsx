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
          "Extended KPI card with optional delta, comparison label, and chart slot. **A11y:** plain text structure. **Do:** use `trend` for semantic color on delta. **Don't:** embed interactive controls inside the card.",
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
    label: "Monthly revenue",
    value: "$48.2k",
    delta: "+6.1%",
    trend: "up",
    comparisonLabel: "vs last month",
  },
};

export const WithChart: Story = {
  args: {
    label: "API latency",
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
