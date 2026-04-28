import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from "./card";
import { cn } from "./cn";
import { StatusIndicator } from "./status-indicator";

export type ConnectorStatus = "connected" | "disconnected" | "error";

export type ConnectorCardProps = {
  className?: string;
  description?: string;
  lastSyncAt?: string;
  name: string;
  onConnect?: () => void;
  onTest?: () => void;
  status: ConnectorStatus;
  vendor: string;
};

function getStatusLabel(status: ConnectorStatus): string {
  switch (status) {
    case "connected":
      return "연결됨";
    case "disconnected":
      return "연결 안 됨";
    case "error":
      return "오류";
  }
}

function getStatusState(status: ConnectorStatus): "online" | "offline" | "degraded" {
  switch (status) {
    case "connected":
      return "online";
    case "disconnected":
      return "offline";
    case "error":
      return "degraded";
  }
}

function getActionLabel(status: ConnectorStatus): string {
  switch (status) {
    case "connected":
      return "다시 연결";
    case "disconnected":
      return "연결";
    case "error":
      return "재연결";
  }
}

export function ConnectorCard({
  className,
  description,
  lastSyncAt,
  name,
  onConnect,
  onTest,
  status,
  vendor,
}: ConnectorCardProps) {
  return (
    <Card className={cn("ui:flex ui:h-full ui:flex-col", className)}>
      <CardHeader>
        <div className="ui:flex ui:items-start ui:justify-between ui:gap-2">
          <div className="ui:min-w-0">
            <CardTitle>{name}</CardTitle>
            <p className="ui:mt-1 ui:text-sm ui:text-text-secondary">{vendor}</p>
          </div>
          <Badge variant={status === "error" ? "warning" : "default"}>{getStatusLabel(status)}</Badge>
        </div>
      </CardHeader>
      <CardBody className="ui:flex-1 ui:space-y-3">
        <StatusIndicator label={getStatusLabel(status)} state={getStatusState(status)} />
        {description ? <p className="ui:text-sm ui:text-text-secondary">{description}</p> : null}
        {lastSyncAt ? (
          <p className="ui:text-xs ui:text-text-muted">
            마지막 동기화: <time>{lastSyncAt}</time>
          </p>
        ) : null}
      </CardBody>
      <CardFooter className="ui:flex ui:justify-end ui:gap-2">
        <Button name="testConnector" onClick={onTest} type="button" variant="default">
          연결 테스트
        </Button>
        <Button name="connectConnector" onClick={onConnect} type="button" variant="primary">
          {getActionLabel(status)}
        </Button>
      </CardFooter>
    </Card>
  );
}
