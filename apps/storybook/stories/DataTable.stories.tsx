import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "@repo/ui/data-table";
import type { DataTableColumn } from "@repo/ui/data-table";

type Row = { name: string; role: string; status: string };

const columns: DataTableColumn<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

const data: Row[] = [
  { name: "Alice Park", role: "Admin", status: "Active" },
  { name: "Bob Kim", role: "Editor", status: "Active" },
  { name: "Charlie Lee", role: "Viewer", status: "Invited" },
];

const meta = {
  title: "Data/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Headless table shell powered by TanStack Table. **A11y:** uses semantic `<table>`, `<th scope=\"col\">`, `<thead>`, `<tbody>`. **Do:** define columns with TanStack `ColumnDef`. **Don't:** add inline sorting—extend with TanStack sorting model instead.",
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
