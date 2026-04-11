import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./data-table";

type Row = { id: string; name: string };

describe("데이터 테이블", () => {
  it("열 헤더와 셀 텍스트 렌더", () => {
    const columns = [{ accessorKey: "name", header: "Name" as const }];
    const data: Row[] = [{ id: "1", name: "Alpha" }];
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Alpha" })).toBeInTheDocument();
  });

  it("placeholder 헤더 셀 분기", () => {
    const columns = [
      {
        id: "spacer",
        header: () => null,
      },
      { accessorKey: "name", header: "Name" as const },
    ];
    const data: Row[] = [{ id: "1", name: "Beta" }];
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Beta" })).toBeInTheDocument();
  });
});
