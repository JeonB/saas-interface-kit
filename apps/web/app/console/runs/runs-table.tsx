"use client";

import type { Run, RunStatus } from "@repo/api-client";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable, type DataTableColumn } from "@repo/ui/data-table";
import { RunStatusBadge } from "@repo/ui/run-status-badge";

type RunsTableProps = {
  runs: Run[];
};

type RunRow = Run & {
  stepCount: number;
};

function toRows(runs: Run[]): RunRow[] {
  return runs.map((run) => ({
    ...run,
    stepCount: run.steps.length,
  }));
}

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function createColumns(): DataTableColumn<RunRow>[] {
  return [
    {
      accessorKey: "id",
      header: "Run ID",
      cell: (ctx) => {
        const row = ctx.row.original;
        return (
          <Link className="text-white underline-offset-2 hover:underline" href={`/console/runs/${row.id}`}>
            {row.id}
          </Link>
        );
      },
    },
    { accessorKey: "workflowId", header: "워크플로 ID" },
    {
      accessorKey: "status",
      header: "상태",
      cell: (ctx) => <RunStatusBadge status={ctx.getValue() as RunStatus} />,
    },
    {
      accessorKey: "startedAt",
      header: "시작 시각",
      cell: (ctx) => <span className="text-neutral-300">{formatDateTime(String(ctx.getValue()))}</span>,
    },
    {
      accessorKey: "stepCount",
      header: "스텝 수",
      cell: (ctx) => <span>{String(ctx.getValue())}</span>,
    },
  ];
}

export function RunsTable({ runs }: RunsTableProps) {
  const rows = useMemo(() => toRows(runs), [runs]);
  const columns = useMemo(() => createColumns(), []);

  return <DataTable columns={columns} data={rows} />;
}
