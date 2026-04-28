import { Badge } from "./badge";

export type RunStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled";

export type RunStatusBadgeProps = {
  status: RunStatus;
};

function assertNever(value: never): never {
  throw new Error(`Unexpected run status: ${String(value)}`);
}

function getLabel(status: RunStatus): string {
  switch (status) {
    case "queued":
      return "대기";
    case "running":
      return "실행 중";
    case "succeeded":
      return "성공";
    case "failed":
      return "실패";
    case "cancelled":
      return "취소";
    default:
      return assertNever(status);
  }
}

function getVariant(status: RunStatus): "default" | "success" | "warning" | "danger" {
  switch (status) {
    case "queued":
      return "default";
    case "running":
      return "warning";
    case "succeeded":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "default";
    default:
      return assertNever(status);
  }
}

export function RunStatusBadge({ status }: RunStatusBadgeProps) {
  return (
    <Badge showDot variant={getVariant(status)}>
      {getLabel(status)}
    </Badge>
  );
}
