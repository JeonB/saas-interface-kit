import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DataTable } from "./data-table";

type Row = { id: string; name: string };

describe("DataTable", () => {
  it("renders column header and cell text", () => {
    const columns = [{ accessorKey: "name", header: "Name" as const }];
    const data: Row[] = [{ id: "1", name: "Alpha" }];
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Alpha" })).toBeInTheDocument();
  });
});
