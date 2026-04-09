import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";

const meta = {
  title: "UI/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "레이블 + 컨트롤 래퍼입니다. 자식에 `id`, `aria-describedby`, `aria-invalid`를 연결합니다. 상호작용 자식은 하나만 두세요(예: `Input`, `Textarea`).",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHint: Story = {
  render: () => (
    <div className="ui:w-80">
      <Field hint="청구서와 보고서에 표시됩니다." id="display-name" label="표시 이름">
        <Input name="displayName" placeholder="Acme Corp" />
      </Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="ui:w-80">
      <Field error="회사 이름은 필수입니다." id="company" label="회사">
        <Input name="company" />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "`error`가 설정되면 힌트는 숨겨지고 보조 기술용으로 `aria-invalid`가 적용됩니다.",
      },
    },
  },
};
