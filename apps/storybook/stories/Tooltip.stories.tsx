import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "@repo/ui/tooltip";
import { Button } from "@repo/ui/button";

const meta = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Floating UI 기반 호버/포커스 툴팁입니다. **접근성:** `role=\"tooltip\"`; 호버(120ms 지연)·포커스 시 표시, Escape로 닫힘. **권장:** 짧은 한 문장. **비권장:** 툴팁 안에 상호작용 요소.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "툴팁입니다",
    children: (
      <Button name="tooltipDemo" variant="default">
        마우스를 올리세요
      </Button>
    ),
  },
};

export const Placements: Story = {
  render: () => (
    <div className="ui:flex ui:gap-4">
      <Tooltip content="위" placement="top">
        <Button name="top" variant="default">
          위
        </Button>
      </Tooltip>
      <Tooltip content="아래" placement="bottom">
        <Button name="bottom" variant="default">
          아래
        </Button>
      </Tooltip>
      <Tooltip content="왼쪽" placement="left">
        <Button name="left" variant="default">
          왼쪽
        </Button>
      </Tooltip>
      <Tooltip content="오른쪽" placement="right">
        <Button name="right" variant="default">
          오른쪽
        </Button>
      </Tooltip>
    </div>
  ),
};
