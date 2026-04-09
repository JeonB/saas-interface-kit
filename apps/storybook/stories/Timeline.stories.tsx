import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline, TimelineItem } from "@repo/ui/timeline";

const meta = {
  title: "Data/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "연결선·선택 아이콘이 있는 세로 활동 피드입니다. **접근성:** 시맨틱 `<ul>/<li>`. **권장:** 타임스탬프는 `time` prop. **비권장:** 타임라인 항목 안에 복잡한 상호작용 폼.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="ui:max-w-md">
      <Timeline>
        <TimelineItem time="2분 전">배포가 성공적으로 완료되었습니다.</TimelineItem>
        <TimelineItem time="15분 전">커밋 abc1234에 대한 빌드가 시작되었습니다.</TimelineItem>
        <TimelineItem time="1시간 전">풀 리퀘스트 #42가 머지되었습니다.</TimelineItem>
      </Timeline>
    </div>
  ),
};
