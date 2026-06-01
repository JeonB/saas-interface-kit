"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { Database, GitBranch, Globe, Mail, MessageSquare, Zap } from "lucide-react";
import type { WorkflowEditorNodeData } from "../types";
import { AutomationNodeShell } from "./automation-node-shell";

type AutomationNodeProps = NodeProps<Node<WorkflowEditorNodeData, string>>;

function TriggerNode({ data, selected }: AutomationNodeProps) {
  return (
    <AutomationNodeShell
      accentClass="ui:border-l-4 ui:border-l-semantic-info"
      icon={<Zap aria-hidden className="ui:h-4 ui:w-4" />}
      label={data.label}
      runStatus={data.runStatus}
      selected={selected}
      showSourceHandle
      showTargetHandle={false}
      summary={data.summary}
    />
  );
}

function DbQueryNode({ data, selected }: AutomationNodeProps) {
  return (
    <AutomationNodeShell
      accentClass="ui:border-l-4 ui:border-l-semantic-warning"
      icon={<Database aria-hidden className="ui:h-4 ui:w-4" />}
      label={data.label}
      runStatus={data.runStatus}
      selected={selected}
      showSourceHandle
      showTargetHandle
      summary={data.summary}
    />
  );
}

function TransformNode({ data, selected }: AutomationNodeProps) {
  return (
    <AutomationNodeShell
      accentClass="ui:border-l-4 ui:border-l-purple-500"
      icon={<GitBranch aria-hidden className="ui:h-4 ui:w-4" />}
      label={data.label}
      runStatus={data.runStatus}
      selected={selected}
      showSourceHandle
      showTargetHandle
      summary={data.summary}
    />
  );
}

function HttpResponseNode({ data, selected }: AutomationNodeProps) {
  return (
    <AutomationNodeShell
      accentClass="ui:border-l-4 ui:border-l-semantic-success"
      icon={<Globe aria-hidden className="ui:h-4 ui:w-4" />}
      label={data.label}
      runStatus={data.runStatus}
      selected={selected}
      showSourceHandle={false}
      showTargetHandle
      summary={data.summary}
    />
  );
}

function SlackNotifyNode({ data, selected }: AutomationNodeProps) {
  return (
    <AutomationNodeShell
      accentClass="ui:border-l-4 ui:border-l-pink-500"
      icon={<MessageSquare aria-hidden className="ui:h-4 ui:w-4" />}
      label={data.label}
      runStatus={data.runStatus}
      selected={selected}
      showSourceHandle
      showTargetHandle
      summary={data.summary}
    />
  );
}

function EmailSendNode({ data, selected }: AutomationNodeProps) {
  return (
    <AutomationNodeShell
      accentClass="ui:border-l-4 ui:border-l-orange-500"
      icon={<Mail aria-hidden className="ui:h-4 ui:w-4" />}
      label={data.label}
      runStatus={data.runStatus}
      selected={selected}
      showSourceHandle
      showTargetHandle
      summary={data.summary}
    />
  );
}

export const workflowNodeTypes = {
  trigger: TriggerNode,
  dbQuery: DbQueryNode,
  transform: TransformNode,
  httpResponse: HttpResponseNode,
  slackNotify: SlackNotifyNode,
  emailSend: EmailSendNode,
};
