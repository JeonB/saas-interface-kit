import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Pagination } from "@repo/ui/pagination";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Previous/Next pagination with page indicator. **A11y:** `<nav aria-label=\"Pagination\">`; buttons disable at bounds. **Do:** pair with DataTable. **Don't:** use for content carousels—use a dedicated slider.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} pageCount={10} onPageChange={setPage} />;
  },
};
