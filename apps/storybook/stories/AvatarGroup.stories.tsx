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
          "Stacked avatar group with overflow indicator. **A11y:** overflow chip has `role=\"img\"` with `aria-label` like \"+3 more\". **Do:** set `max` to limit visible count. **Don't:** use without Avatar children.",
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
