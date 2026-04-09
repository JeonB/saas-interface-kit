import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/button";
import { EmptyState } from "@repo/ui/empty-state";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "데이터가 없는 대시보드 영역에 사용합니다. 문구는 행동을 유도하고, 주요 CTA는 폼·내비 맥락에 맞게 `name`이 있는 `Button`으로 두세요.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "아직 배포가 없습니다",
    description: "저장소를 연결하거나 수동 배포를 실행하면 여기에 활동이 표시됩니다.",
  },
};

export const WithAction: Story = {
  render: () => (
    <div className="ui:max-w-md">
      <EmptyState
        action={
          <Button name="new-integration" variant="primary">
            연동 추가
          </Button>
        }
        description="CRM 딜을 동기화하면 이 워크스페이스에서 파이프라인 가치를 볼 수 있습니다."
        title="연결된 데이터 소스 없음"
      />
    </div>
  ),
};
