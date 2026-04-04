import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/button";
import { EmptyState } from "@repo/ui/empty-state";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use for zero-data dashboard sections. Keep copy actionable; primary CTA should use `Button` with clear `name` for forms or navigation context.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No deployments yet",
    description: "Connect your repository or run a manual deploy to see activity here.",
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="ui:max-w-md">
      <EmptyState
        action={
          <Button name="new-integration" variant="primary">
            Add integration
          </Button>
        }
        description="Sync CRM deals to see pipeline value in this workspace."
        title="No data source connected"
      />
    </div>
  ),
};
