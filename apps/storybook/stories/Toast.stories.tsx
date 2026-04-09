import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, useToast } from "@repo/ui/toast";
import { Button } from "@repo/ui/button";

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="ui:flex ui:flex-wrap ui:gap-2">
      <Button
        name="info"
        variant="default"
        onClick={() =>
          toast({ message: "배포가 대기열에 추가되었습니다.", variant: "info" })
        }
      >
        안내
      </Button>
      <Button
        name="success"
        variant="default"
        onClick={() =>
          toast({
            title: "성공",
            message: "변경 사항이 저장되었습니다.",
            variant: "success",
          })
        }
      >
        성공
      </Button>
      <Button
        name="warning"
        variant="default"
        onClick={() =>
          toast({ message: "요율 한도에 가까워집니다.", variant: "warning" })
        }
      >
        경고
      </Button>
      <Button
        name="error"
        variant="default"
        onClick={() =>
          toast({
            title: "오류",
            message: "빌드에 실패했습니다.",
            variant: "error",
          })
        }
      >
        오류
      </Button>
    </div>
  );
}

const meta = {
  title: "Overlay/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "컨텍스트 프로바이더 기반 토스트 알림입니다. 약 4.5초 후 자동으로 사라집니다. **접근성:** 영역은 `aria-live=\"polite\"`, 각 토스트는 `role=\"status\"`. **권장:** 앱 루트를 ToastProvider로 감싸기. **비권장:** 막는 치명 오류 — Dialog나 Alert 사용.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
