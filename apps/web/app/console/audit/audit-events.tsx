import type { AuditEventAction } from "@repo/api-client";
import { Alert } from "@repo/ui/alert";
import { getAuditEventsData } from "../../../lib/audit-mock";
import { AuditEventsClient } from "./audit-events-client";

export type AuditQueryState = {
  action?: AuditEventAction;
  actor?: string;
  from?: string;
  page: number;
  size: number;
  to?: string;
};

type AuditEventsProps = {
  query: AuditQueryState;
};

export async function AuditEvents({ query }: AuditEventsProps) {
  let result:
    | {
        items: Awaited<ReturnType<typeof getAuditEventsData>>["items"];
        page: number;
        size: number;
        total: number;
      }
    | null = null;
  let errorMessage: string | null = null;

  try {
    result = await getAuditEventsData(query);
  } catch (e) {
    errorMessage = e instanceof Error ? e.message : "감사 로그를 불러오는 중 알 수 없는 오류가 발생했습니다.";
  }

  if (errorMessage) {
    return (
      <Alert title="감사 로그 조회 실패" variant="warning">
        {errorMessage}
      </Alert>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <AuditEventsClient
      action={query.action}
      actor={query.actor}
      from={query.from}
      items={result.items}
      page={result.page}
      size={result.size}
      to={query.to}
      total={result.total}
    />
  );
}
