import type { Meta, StoryObj } from "@storybook/react-vite";
import { VisuallyHidden } from "@repo/ui/visually-hidden";

const meta = {
  title: "Utility/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "시각적으로는 숨기고 스크린 리더에만 노출합니다. CSS clip-path 방식입니다. **권장:** 건너뛰기 링크, 아이콘 전용 버튼 레이블, 추가 맥락. **비권장:** 장식용 숨김 — `aria-hidden` 사용.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <p className="ui:text-sm ui:text-text-primary">
        아래 텍스트는 화면에는 보이지 않지만 스크린 리더는 읽습니다.
      </p>
      <VisuallyHidden>보조 기술 전용 텍스트입니다.</VisuallyHidden>
      <p className="ui:mt-2 ui:text-xs ui:text-text-muted">(DOM을 확인하면 숨겨진 span을 볼 수 있습니다.)</p>
    </div>
  ),
};
