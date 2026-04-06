import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusIndicator } from "@repo/ui/status-indicator";

const meta = {
  title: "Data/StatusIndicator",
  component: StatusIndicator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Colored dot + label for system health status. **A11y:** dot is `aria-hidden`; label text conveys meaning. **Do:** use standard states (`online`, `degraded`, `offline`, `maintenance`). **Don't:** add custom colors via className—extend the state union instead.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: ["online", "degraded", "offline", "maintenance"] },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = { args: { state: "online", label: "All systems operational" } };
export const Degraded: Story = { args: { state: "degraded", label: "Partial outage" } };
export const Offline: Story = { args: { state: "offline", label: "Service down" } };
export const Maintenance: Story = { args: { state: "maintenance", label: "Scheduled maintenance" } };
