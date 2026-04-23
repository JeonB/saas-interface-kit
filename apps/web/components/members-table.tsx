"use client";

import { useId, useState } from "react";
import { Badge } from "@repo/ui/badge";
import { DataTable, type DataTableColumn } from "@repo/ui/data-table";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
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
  const searchFieldId = useId();
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-4">
      <Field
        className="max-w-md"
        hint="이름, 이메일, 역할로 필터합니다."
        id={searchFieldId}
        label="멤버 검색"
      >
        <Input
          autoComplete="off"
          name="memberSearch"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색…"
          type="search"
          value={query}
        />
      </Field>
      <DataTable
        columns={columns}
        data={data}
        emptyContent={
          query.trim().length > 0 ? (
            <span aria-label="검색과 일치하는 멤버가 없습니다." className="text-sm" role="status">
              검색과 일치하는 멤버가 없습니다.
            </span>
          ) : undefined
        }
        filterText={query}
      />
    </div>
  );
}
