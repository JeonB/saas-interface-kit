import type { Meta, StoryObj } from "@storybook/react-vite";
import { AvatarGroup } from "@repo/ui/avatar-group";
import { Avatar } from "@repo/ui/avatar";

const meta = {
  title: "Navigation/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "겹쳐 쌓인 아바타 그룹과 넘침 표시입니다. **접근성:** 넘침 칩은 `role=\"img\"`와 `aria-label` 예: \"3명 더 있음\". **권장:** 보이는 개수 제한에 `max` 설정. **비권장:** Avatar 자식 없이 사용.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    max: { control: "number" },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar fallback="AB" size="md" />
      <Avatar fallback="CD" size="md" />
      <Avatar fallback="EF" size="md" />
      <Avatar fallback="GH" size="md" />
      <Avatar fallback="IJ" size="md" />
    </AvatarGroup>
  ),
};
