import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "@repo/ui/data-table";
import type { DataTableColumn } from "@repo/ui/data-table";

type Row = { name: string; role: string; status: string };

const columns: DataTableColumn<Row>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "role", header: "역할" },
  { accessorKey: "status", header: "상태" },
];

const data: Row[] = [
  { name: "박지은", role: "관리자", status: "활성" },
  { name: "김민수", role: "편집자", status: "활성" },
  { name: "이준호", role: "뷰어", status: "초대됨" },
];

const meta = {
  title: "Data/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "TanStack Table 기반 헤드리스 테이블 셸입니다. **접근성:** 시맨틱 `<table>`, `<th scope=\"col\">`, `<thead>`, `<tbody>`. **권장:** TanStack `ColumnDef`로 열 정의. **비권장:** 인라인 정렬만 추가 — TanStack 정렬 모델로 확장.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DataTable columns={columns} data={data} />,
};
