import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RadioGroup, RadioItem } from "@repo/ui/radio-group";

const meta = {
  title: "Form/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "`role=\"radiogroup\"` 제어 라디오 그룹입니다. **접근성:** 네이티브 `<input type=\"radio\">`와 연결된 `<label>`. **권장:** RadioItem마다 고유 `id`. **비권장:** 다중 선택 — Checkbox 사용.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("monthly");
    return (
      <RadioGroup name="billing" value={value} onValueChange={setValue}>
        <RadioItem id="monthly" label="월간 결제" value="monthly" />
        <RadioItem
          id="annual"
          label="연간 결제 (20% 절약)"
          value="annual"
        />
      </RadioGroup>
    );
  },
};
