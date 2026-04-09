import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/ui/dropdown-menu";
import { Button } from "@repo/ui/button";

const meta = {
  title: "Overlay/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`role=\"menu\"` 클릭 트리거 드롭다운입니다. **접근성:** 트리거에 `aria-expanded`와 `aria-haspopup=\"menu\"`; 항목은 `role=\"menuitem\"` 버튼. 바깥 클릭 시 닫힘. **권장:** 항목 레이블은 짧게. **비권장:** 드롭다운 중첩.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button name="actions" variant="default">
          동작
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {}}>편집</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>복제</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
