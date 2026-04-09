import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertBanner } from "@repo/ui/alert-banner";

const meta = {
  title: "Navigation/AlertBanner",
  component: AlertBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "시스템 수준 공지(점검, 장애)용 전폭 배너입니다. **접근성:** `role=\"alert\"`; 닫기 버튼은 `aria-label=\"배너 닫기\"`. **권장:** 페이지 상단, AppShell 밖. **비권장:** 배너 여러 개 쌓기.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
  },
} satisfies Meta<typeof AlertBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "예정된 점검",
    children: "일요일 02:00 UTC에 플랫폼이 잠시 중단될 수 있습니다.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "장애 감지",
    children: "US-East에서 오류율이 높습니다. 팀이 조사 중입니다.",
    onDismiss: () => {},
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "새 대시보드 기능이 출시되었습니다. 변경 로그를 확인하세요.",
    onDismiss: () => {},
  },
};
