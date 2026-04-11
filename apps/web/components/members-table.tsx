"use client";

import { Badge } from "@repo/ui/badge";
import { DataTable, type DataTableColumn } from "@repo/ui/data-table";
import type { Role } from "../lib/rbac";

export type MemberRow = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

const columns: DataTableColumn<MemberRow>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
  {
    accessorKey: "role",
    header: "역할",
    cell: (ctx) => {
      const role = ctx.getValue() as Role;
      return <Badge variant="default">{role}</Badge>;
    },
  },
];

type MembersTableProps = {
  data: MemberRow[];
};

export function MembersTable({ data }: MembersTableProps) {
  return <DataTable columns={columns} data={data} />;
}
