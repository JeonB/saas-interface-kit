"use client";

import Link from "next/link";
import type { Workflow } from "@repo/api-client";
import { Badge } from "@repo/ui/badge";
import { DataTable, type DataTableColumn } from "@repo/ui/data-table";
import { RunStatusBadge } from "@repo/ui/run-status-badge";

type WorkflowRow = Workflow;

const columns: DataTableColumn<WorkflowRow>[] = [
  { accessorKey: "name", header: "워크플로" },
  { accessorKey: "trigger", header: "트리거" },
  {
    accessorKey: "status",
    header: "상태",
    cell: (ctx) => {
      const status = ctx.getValue() as Workflow["status"];
      const label = status === "active" ? "활성" : status === "paused" ? "일시중지" : "초안";
      return <Badge variant="default">{label}</Badge>;
    },
  },
  {
    accessorKey: "lastRunStatus",
    header: "마지막 실행",
    cell: (ctx) => {
      const row = ctx.row.original;
      if (!row.lastRunStatus || !row.lastRunId) {
        return <span className="text-neutral-400">-</span>;
      }
      return (
        <Link className="inline-flex items-center gap-2 text-sm text-white underline-offset-2 hover:underline" href={`/console/runs/${row.lastRunId}`}>
          <RunStatusBadge status={row.lastRunStatus} />
        </Link>
      );
    },
  },
];

type WorkflowsTableProps = {
  workflows: Workflow[];
};

export function WorkflowsTable({ workflows }: WorkflowsTableProps) {
  return <DataTable columns={columns} data={workflows} />;
}
