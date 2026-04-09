import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@repo/ui/separator";

const meta = {
  title: "Utility/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`role=\"separator\"`와 `aria-orientation`이 있는 시각적 구분선입니다. **권장:** 논리적 콘텐츠 구역 사이에 사용. **비권장:** 순수 간격용 — 패딩·마진 사용.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <p className="ui:text-sm ui:text-text-primary">섹션 A</p>
      <Separator className="ui:my-3" />
      <p className="ui:text-sm ui:text-text-primary">섹션 B</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-3" style={{ height: 40 }}>
      <span className="ui:text-sm ui:text-text-primary">왼쪽</span>
      <Separator orientation="vertical" />
      <span className="ui:text-sm ui:text-text-primary">오른쪽</span>
    </div>
  ),
};
