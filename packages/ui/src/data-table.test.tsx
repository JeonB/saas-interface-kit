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

  it("데이터가 없을 때 빈 상태 메시지를 한 행으로 표시", () => {
    const columns = [{ accessorKey: "name", header: "Name" as const }];
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByRole("status", { name: "표시할 행이 없습니다." })).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "Alpha" })).not.toBeInTheDocument();
  });

  it("filterText로 원시 필드 부분 일치 필터", () => {
    const columns = [
      { accessorKey: "name", header: "Name" as const },
      { accessorKey: "id", header: "ID" as const },
    ];
    const data: Row[] = [
      { id: "1", name: "Alpha" },
      { id: "2", name: "Beta" },
    ];
    render(<DataTable columns={columns} data={data} filterText="bet" />);
    expect(screen.getByRole("cell", { name: "Beta" })).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "Alpha" })).not.toBeInTheDocument();
  });

  it("filterText 결과가 없으면 emptyContent 또는 기본 메시지", () => {
    const columns = [{ accessorKey: "name", header: "Name" as const }];
    const data: Row[] = [{ id: "1", name: "Alpha" }];
    render(<DataTable columns={columns} data={data} filterText="zzz" emptyContent={<span>No hits</span>} />);
    expect(screen.getByText("No hits")).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "Alpha" })).not.toBeInTheDocument();
  });
});
