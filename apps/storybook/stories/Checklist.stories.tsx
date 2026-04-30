import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checklist } from "@repo/ui/checklist";

const meta = {
  title: "Data/Checklist",
  component: Checklist,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "온보딩/설정 진행 상태를 보여주는 체크리스트입니다. 완료 비율과 각 항목 액션 링크를 함께 제공합니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checklist>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "워크스페이스 시작하기",
    items: [
      {
        id: "org-settings",
        title: "조직 설정 확인",
        description: "팀 이름, 로고, 기본 타임존을 설정합니다.",
        status: "done",
        actionLabel: "열기",
        actionHref: "/console/settings",
      },
      {
        id: "integration",
        title: "첫 통합 연결",
        description: "Slack 또는 CRM 연동을 활성화합니다.",
        status: "todo",
        actionLabel: "연결",
        actionHref: "/console/integrations",
      },
      {
        id: "billing",
        title: "결제 수단 등록",
        description: "체험 종료 전에 결제 정보를 등록합니다.",
        status: "skipped",
        actionLabel: "이동",
        actionHref: "/console/settings/billing",
      },
    ],
  },
};
