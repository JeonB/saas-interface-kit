"use client";

import type { Run, RunStatus } from "@repo/api-client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable, type DataTableColumn } from "@repo/ui/data-table";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import { RunStatusBadge } from "@repo/ui/run-status-badge";
import { Select } from "@repo/ui/select";

type RunsTableProps = {
  runs: Run[];
};

type RunRow = Run & {
  stepCount: number;
};

const STATUS_OPTIONS: Array<{ value: "all" | RunStatus; label: string }> = [
  { value: "all", label: "전체" },
  { value: "queued", label: "대기" },
  { value: "running", label: "실행 중" },
  { value: "succeeded", label: "성공" },
  { value: "failed", label: "실패" },
  { value: "cancelled", label: "취소" },
];

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
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | RunStatus>("all");

  const rows = useMemo(() => toRows(runs), [runs]);
  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesStatus = status === "all" || row.status === status;
      if (!matchesStatus) {
        return false;
      }
      if (normalizedQuery.length === 0) {
        return true;
      }
      return (
        row.id.toLowerCase().includes(normalizedQuery) ||
        row.workflowId.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, rows, status]);
  const columns = useMemo(() => createColumns(), []);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Field id="runs-query" label="검색">
          <Input
            name="runsQuery"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder="run ID 또는 workflow ID"
            type="search"
            value={query}
          />
        </Field>
        <Field id="runs-status" label="상태">
          <Select
            name="runsStatus"
            onChange={(event) => {
              setStatus(event.target.value as "all" | RunStatus);
            }}
            value={status}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <DataTable columns={columns} data={filteredRows} />
    </div>
  );
}
