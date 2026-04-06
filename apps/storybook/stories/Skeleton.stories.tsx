import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@repo/ui/skeleton";

const meta = {
  title: "Data/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Placeholder pulse animation for loading states. **A11y:** `aria-hidden` so assistive tech skips it—pair with a live region or Spinner for screen reader users. **Do:** match skeleton dimensions to expected content. **Don't:** use as a generic background shimmer.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    rounded: { control: "select", options: ["none", "sm", "md", "lg", "full"] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { width: "200px", height: "20px" },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="ui:flex ui:flex-col ui:gap-3 ui:rounded-ui-md ui:border ui:border-border-subtle ui:p-4" style={{ width: 280 }}>
      <Skeleton width="60%" height="14px" />
      <Skeleton width="100%" height="28px" />
      <Skeleton width="40%" height="12px" />
    </div>
  ),
  parameters: {
    docs: { description: { story: "Compose multiple skeletons to approximate card content during loading." } },
  },
};
