import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { cn } from "./cn";

export type DataTableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue>;

export type DataTableProps<TData> = {
  className?: string;
  columns: DataTableColumn<TData>[];
  data: TData[];
};

export function DataTable<TData>({ className, columns, data }: DataTableProps<TData>) {
  // TanStack Table returns unstable function references; safe for this headless table shell.
  // eslint-disable-next-line react-hooks/incompatible-library -- useReactTable is the supported API
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("ui:overflow-x-auto", className)}>
      <table className="ui:w-full ui:border-collapse ui:text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="ui:border-b ui:border-border-subtle" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
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
          {table.getRowModel().rows.map((row) => (
            <tr className="ui:border-b ui:border-border-subtle/80" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="ui:px-3 ui:py-2 ui:text-text-primary" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
