import type { Meta, StoryObj } from "@storybook/react-vite";
import { WorkflowEditor } from "@repo/ui";

const meta = {
  title: "Integration/WorkflowEditor",
  component: WorkflowEditor,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "n8n 스타일 워크플로 편집 캔버스입니다. 노드 팔레트에서 드래그해 배치할 수 있습니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WorkflowEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Editable: Story = {
  args: {
    readOnly: false,
    nodes: [
      {
        id: "trigger",
        type: "trigger",
        position: { x: 0, y: 80 },
        data: { label: "Webhook Trigger", summary: "webhook /hooks/inbound" },
      },
      {
        id: "db",
        type: "dbQuery",
        position: { x: 280, y: 80 },
        data: { label: "DB Query", summary: "contacts · list_recent" },
      },
      {
        id: "http",
        type: "httpResponse",
        position: { x: 560, y: 80 },
        data: { label: "HTTP Response", summary: "HTTP 200" },
      },
    ],
    edges: [
      { id: "e1", source: "trigger", target: "db" },
      { id: "e2", source: "db", target: "http" },
    ],
  },
};

export const ReadOnly: Story = {
  args: {
    ...Editable.args,
    readOnly: true,
    showPalette: false,
  },
};
