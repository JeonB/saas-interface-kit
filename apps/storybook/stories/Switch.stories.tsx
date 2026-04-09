import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "@repo/ui/switch";

const meta = {
  title: "Form/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`role=\"switch\"`와 `aria-checked`가 있는 토글 스위치입니다. **접근성:** 포커스 링, 비활성 상태. 접근 가능한 이름은 `<label>`과 짝지으세요. **권장:** 즉시 반영되는 불리언(기능 플래그 등). **비권장:** \"동의\" 의미가 더 맞는 폼에서는 Checkbox.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="ui:flex ui:items-center ui:gap-3">
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          id="notifications"
          aria-label="알림 켜기"
        />
        <label
          htmlFor="notifications"
          className="ui:text-sm ui:text-text-primary"
        >
          알림 켜기
        </label>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(true);
    const [c, setC] = useState(true);
    return (
      <div className="ui:flex ui:items-center ui:gap-4">
        <Switch
          checked={a}
          onCheckedChange={setA}
          size="sm"
          aria-label="작게"
        />
        <Switch
          checked={b}
          onCheckedChange={setB}
          size="md"
          aria-label="보통"
        />
        <Switch
          checked={c}
          onCheckedChange={setC}
          size="lg"
          aria-label="크게"
        />
      </div>
    );
  },
};
