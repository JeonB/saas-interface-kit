import { useMemo, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { cn } from "./cn";

export type DataTableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue>;

function rowMatchesGlobalFilter<TData>(row: TData, needle: string): boolean {
  const q = needle.toLowerCase();
  if (typeof row !== "object" || row === null) {
    return String(row).toLowerCase().includes(q);
  }
  return Object.values(row as Record<string, unknown>).some((value) => {
    if (value === null || value === undefined) {
      return false;
    }
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return String(value).toLowerCase().includes(q);
    }
    return false;
  });
}

export type DataTableProps<TData> = {
  className?: string;
  columns: DataTableColumn<TData>[];
  data: TData[];
  /** When set, rows whose primitive cell values do not contain this string (case-insensitive) are hidden. */
  filterText?: string;
  /** Shown in a single table cell when there are no rows (including after filtering). Overrides the default message. */
  emptyContent?: ReactNode;
};

export function DataTable<TData>({
  className,
  columns,
  data,
  filterText,
  emptyContent,
}: DataTableProps<TData>) {
  const needle = filterText?.trim() ?? "";
  const filteredData = useMemo(() => {
    if (needle.length === 0) {
      return data;
    }
    return data.filter((row) => rowMatchesGlobalFilter(row, needle));
  }, [data, needle]);

  // TanStack Table returns unstable function references; safe for this headless table shell.
  // eslint-disable-next-line react-hooks/incompatible-library -- useReactTable is the supported API
  const table = useReactTable({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;
  const headerGroup = table.getHeaderGroups()[0];
  const columnCount = headerGroup?.headers.length ?? columns.length;

  return (
    <div className={cn("ui:overflow-x-auto", className)}>
      <table className="ui:w-full ui:border-collapse ui:text-sm">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr className="ui:border-b ui:border-border-subtle" key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  className="ui:px-3 ui:py-2 ui:text-left ui:text-xs ui:font-semibold ui:uppercase ui:tracking-wide ui:text-text-secondary"
                  key={header.id}
                  scope="col"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="ui:border-b ui:border-border-subtle/80">
              <td className="ui:px-3 ui:py-8 ui:text-center ui:text-text-secondary" colSpan={columnCount}>
                {emptyContent ?? (
                  <span aria-label="표시할 행이 없습니다." className="ui:text-sm" role="status">
                    표시할 행이 없습니다.
                  </span>
                )}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr className="ui:border-b ui:border-border-subtle/80" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="ui:px-3 ui:py-2 ui:text-text-primary" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
