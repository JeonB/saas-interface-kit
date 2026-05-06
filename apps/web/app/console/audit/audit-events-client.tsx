"use client";

import { Badge } from "@repo/ui/badge";
import { DataTable, type DataTableColumn } from "@repo/ui/data-table";
import { EmptyState } from "@repo/ui/empty-state";
import type { AuditEventAction, AuditEventDto } from "@repo/api-client";
import { formatConsoleDateTime } from "../../../lib/datetime";
import { AuditFilters } from "./audit-filters";

type AuditEventsClientProps = {
  action?: AuditEventAction;
  actor?: string;
  from?: string;
  items: AuditEventDto[];
  page: number;
  size: number;
  to?: string;
  total: number;
};

const columns: DataTableColumn<AuditEventDto>[] = [
  {
    accessorKey: "occurredAt",
    header: "시간",
    cell: (ctx) => {
      const occurredAt = ctx.getValue() as string;
      return (
        <time className="text-neutral-300" dateTime={occurredAt} title={occurredAt}>
          {formatConsoleDateTime(occurredAt)}
        </time>
      );
    },
  },
  {
    accessorKey: "actor",
    header: "액터",
    cell: (ctx) => {
      const actor = ctx.row.original.actor;
      return (
        <div className="flex flex-col gap-0.5">
          <span>{actor.name}</span>
          <span className="text-xs text-neutral-400">{actor.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "이벤트",
    cell: (ctx) => {
      const action = ctx.getValue() as AuditEventAction;
      const variant =
        action.includes("removed") || action.includes("revoked")
          ? "danger"
          : action.includes("payment")
            ? "warning"
            : "success";
      return <Badge variant={variant}>{action}</Badge>;
    },
  },
  {
    accessorKey: "target",
    header: "대상",
    cell: (ctx) => {
      const target = ctx.row.original.target;
      if (!target) {
        return <span className="text-neutral-500">-</span>;
      }
      return (
        <div className="flex flex-col gap-0.5">
          <span>{target.label ?? target.id}</span>
          <span className="text-xs text-neutral-400">
            {target.type}:{target.id}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "ip",
    header: "IP",
    cell: (ctx) => <span className="text-neutral-300">{(ctx.getValue() as string | undefined) ?? "-"}</span>,
  },
];

export function AuditEventsClient(props: AuditEventsClientProps) {
  const { items, total, page, size, actor, action, from, to } = props;
  const pageCount = Math.max(1, Math.ceil(total / size));

  return (
    <div className="space-y-6">
      <AuditFilters
        action={action}
        actor={actor}
        from={from}
        page={page}
        pageCount={pageCount}
        size={size}
        to={to}
      />
      {items.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <DataTable columns={columns} data={items} />
        </div>
      ) : (
        <EmptyState
          description="필터 조건에 맞는 감사 로그가 없습니다. 조건을 완화하거나 기간을 조정해 보세요."
          title="조회 결과 없음"
        />
      )}
      <p className="text-sm text-neutral-400">총 {total.toLocaleString("ko-KR")}건</p>
    </div>
  );
}
