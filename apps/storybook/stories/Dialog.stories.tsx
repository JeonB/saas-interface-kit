import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@repo/ui/dialog";
import { Button } from "@repo/ui/button";

const meta = {
  title: "Overlay/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "네이티브 `<dialog>`와 `showModal`을 쓰는 모달입니다. **접근성:** DialogTitle의 `aria-labelledby`; Escape는 `cancel`로 닫힘. **권장:** 스크린 리더를 위해 DialogTitle 항상 포함. **비권장:** 다이얼로그 중첩.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button name="openDialog" variant="primary">
            대화상자 열기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>동작 확인</DialogTitle>
            <DialogDescription>리소스가 영구적으로 삭제됩니다.</DialogDescription>
          </DialogHeader>
          <div className="ui:px-6 ui:py-4">
            <p className="ui:text-sm ui:text-text-secondary">계속하시겠습니까?</p>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button name="cancel" variant="default">
                취소
              </Button>
            </DialogClose>
            <Button name="confirm" variant="danger">
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
