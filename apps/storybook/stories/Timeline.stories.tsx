import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline, TimelineItem } from "@repo/ui/timeline";

const meta = {
  title: "Data/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Vertical activity feed with connector lines and optional icons. **A11y:** semantic `<ul>/<li>`. **Do:** use `time` prop for timestamps. **Don't:** embed complex interactive forms inside timeline items.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="ui:max-w-md">
      <Timeline>
        <TimelineItem time="2 min ago">Deployment completed successfully.</TimelineItem>
        <TimelineItem time="15 min ago">Build started for commit abc1234.</TimelineItem>
        <TimelineItem time="1 hour ago">Pull request #42 merged.</TimelineItem>
      </Timeline>
    </div>
  ),
};
