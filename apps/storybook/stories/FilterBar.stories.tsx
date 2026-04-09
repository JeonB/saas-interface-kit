import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";

const FILTERS = [
  { id: "all", label: "전체" },
  { id: "active", label: "활성" },
  { id: "paused", label: "일시중지" },
  { id: "archived", label: "보관됨" },
] as const;

const meta = {
  title: "Form/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "토글 가능한 필터 칩이 있는 가로 바입니다. **접근성:** 각 칩은 포커스 링이 있는 `<button>`. **권장:** 활성 상태는 외부에서 관리. **비권장:** 내비게이션 — NavTabs 사용.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<(typeof FILTERS)[number]["id"]>("all");
    return (
      <FilterBar>
        {FILTERS.map(({ id, label }) => (
          <FilterChip key={id} active={active === id} onClick={() => setActive(id)}>
            {label}
          </FilterChip>
        ))}
      </FilterBar>
    );
  },
};
