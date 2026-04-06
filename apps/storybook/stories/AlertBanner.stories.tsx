import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertBanner } from "@repo/ui/alert-banner";

const meta = {
  title: "Navigation/AlertBanner",
  component: AlertBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Full-width banner for system-level notices (maintenance, incidents). **A11y:** `role=\"alert\"`; dismiss button has `aria-label=\"Dismiss banner\"`. **Do:** use at the top of the page, outside AppShell. **Don't:** stack multiple banners.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
  },
} satisfies Meta<typeof AlertBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Scheduled maintenance",
    children: "Platform will be briefly unavailable on Sunday 2:00 AM UTC.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Incident detected",
    children: "Elevated error rates on US-East. Our team is investigating.",
    onDismiss: () => {},
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "New dashboard features are now available. Check the changelog.",
    onDismiss: () => {},
  },
};
