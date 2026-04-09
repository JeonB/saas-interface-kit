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
          "이전/다음과 페이지 표시가 있는 페이지네이션입니다. **접근성:** `<nav aria-label=\"페이지 탐색\">`; 경계에서 버튼 비활성. **권장:** DataTable과 짝. **비권장:** 콘텐츠 캐러셀 — 전용 슬라이더 사용.",
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
