import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommandBar } from "@repo/ui/command-bar";
import { Input } from "@repo/ui/input";
import { FilterChip } from "@repo/ui/filter-bar";

const meta = {
  title: "Overlay/CommandBar",
  component: CommandBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "`role=\"search\"` 인라인 검색 바 컨테이너입니다. **접근성:** `role=\"search\"` 랜드마크로 감쌈. **권장:** Input·FilterChip과 조합. **비권장:** 폼 대용 — `<form>` 요소 사용.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CommandBar>
      <Input
        name="search"
        placeholder="리소스 검색…"
        aria-label="검색"
        size="sm"
      />
      <FilterChip active>전체</FilterChip>
      <FilterChip>활성</FilterChip>
      <FilterChip>보관됨</FilterChip>
    </CommandBar>
  ),
};
