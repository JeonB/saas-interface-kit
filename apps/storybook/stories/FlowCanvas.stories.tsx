import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowCanvas } from "@repo/ui/flow-canvas";

const meta = {
  title: "Integration/FlowCanvas",
  component: FlowCanvas,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "워크플로 DAG를 읽기 전용으로 표현하는 캔버스입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadOnly: Story = {
  args: {
    nodes: [
      { id: "trigger", position: { x: 0, y: 0 }, data: { label: "Webhook Trigger" }, type: "input" },
      { id: "transform", position: { x: 220, y: 0 }, data: { label: "Transform" } },
      { id: "notify", position: { x: 460, y: 0 }, data: { label: "Slack Notify" }, type: "output" },
    ],
    edges: [
      { id: "e-trigger-transform", source: "trigger", target: "transform" },
      { id: "e-transform-notify", source: "transform", target: "notify" },
    ],
    readOnly: true,
  },
};
