export const WORKFLOW_AUTOMATION_NODE_TYPES = [
  "trigger",
  "dbQuery",
  "httpResponse",
  "transform",
  "slackNotify",
  "emailSend",
] as const;

export type WorkflowAutomationNodeType = (typeof WORKFLOW_AUTOMATION_NODE_TYPES)[number];

export type WorkflowEditorRunStatus = "idle" | "running" | "done" | "error";

export type WorkflowEditorNodeData = {
  label: string;
  summary?: string;
  runStatus?: WorkflowEditorRunStatus;
};

export type WorkflowPaletteItem = {
  type: WorkflowAutomationNodeType;
  label: string;
  description: string;
};

export const WORKFLOW_PALETTE_ITEMS: WorkflowPaletteItem[] = [
  { type: "trigger", label: "Trigger", description: "Webhook, schedule, or event" },
  { type: "dbQuery", label: "DB Query", description: "Read from database" },
  { type: "transform", label: "Transform", description: "Map or reshape data" },
  { type: "httpResponse", label: "HTTP Response", description: "Return API response" },
  { type: "slackNotify", label: "Slack", description: "Post to a channel" },
  { type: "emailSend", label: "Email", description: "Send notification email" },
];

export const WORKFLOW_DRAG_TYPE = "application/workflow-node";
