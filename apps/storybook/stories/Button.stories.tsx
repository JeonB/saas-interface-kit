import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SaaS 화면의 주요 동작 컨트롤입니다. **Variant**는 의미를 (`primary` = 주요 동작, `danger` = 파괴적, `default` = 보조). **Size**는 밀도를 나타냅니다 — 큰 `className` 패딩으로 대체하지 마세요. 기본 `type=\"button\"`은 의도치 않은 폼 제출을 막습니다. 폼·분석에 참여할 때는 `name`을 함께 두세요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "danger"],
    },
    disabled: { control: "boolean" },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    children: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "버튼",
    variant: "default",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    children: "주요",
    variant: "primary",
    size: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "위험",
    variant: "danger",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    children: "비활성",
    variant: "default",
    size: "md",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="ui:flex ui:items-center ui:gap-2">
      <Button size="sm">작게</Button>
      <Button size="md">보통</Button>
      <Button size="lg">크게</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "밀집한 맥락에는 `sm`, 주요 CTA에만 `lg`를 쓰세요. 페이지마다 크기 결정을 일관되게 유지하세요.",
      },
    },
  },
};

export const DoAndDont: Story = {
  render: () => (
    <div className="ui:grid ui:gap-4">
      <div className="ui:flex ui:items-center ui:gap-2">
        <Button variant="primary">권장: 주요 동작</Button>
        <Button variant="default">보조</Button>
      </div>
      <div className="ui:flex ui:items-center ui:gap-2">
        <Button className="ui:px-14">비권장: 간격을 과하게 덮어쓰기</Button>
        <Button variant="danger">삭제</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "시맨틱 variant는 제품 문구와 맞추세요. `className`으로 새 variant를 흉내 내지 말고 variant를 추가하거나 레이아웃 래퍼로 조합하세요.",
      },
    },
  },
};
