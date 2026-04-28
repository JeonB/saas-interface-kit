import type { Meta, StoryObj } from "@storybook/react-vite";
import { StepLogPanel } from "@repo/ui/step-log-panel";

const meta = {
  title: "Integration/StepLogPanel",
  component: StepLogPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "워크플로 실행 단계를 타임라인 형태로 보여주는 로그 패널입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StepLogPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: [
      {
        id: "step-1",
        level: "info",
        message: "이벤트 페이로드 파싱이 완료되었습니다.",
        startedAt: "20:12:10",
        title: "Parse Webhook",
      },
      {
        id: "step-2",
        level: "warning",
        message: "중복 고객 레코드를 발견하여 최신값으로 병합했습니다.",
        startedAt: "20:12:12",
        title: "Upsert Customer",
      },
      {
        id: "step-3",
        level: "error",
        message: "대상 API rate limit을 초과했습니다.",
        startedAt: "20:12:13",
        title: "Send Notification",
      },
    ],
  },
};
