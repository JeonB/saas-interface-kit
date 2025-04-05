import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, useToast } from "@repo/ui/toast";
import { Button } from "@repo/ui/button";

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="ui:flex ui:flex-wrap ui:gap-2">
      <Button
        name="info"
        variant="default"
        onClick={() =>
          toast({ message: "Deployment queued.", variant: "info" })
        }
      >
        Info
      </Button>
      <Button
        name="success"
        variant="default"
        onClick={() =>
          toast({
            title: "Success",
            message: "Changes saved.",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        name="warning"
        variant="default"
        onClick={() =>
          toast({ message: "Rate limit approaching.", variant: "warning" })
        }
      >
        Warning
      </Button>
      <Button
        name="error"
        variant="default"
        onClick={() =>
          toast({
            title: "Error",
            message: "Build failed.",
            variant: "error",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}

const meta = {
  title: "Overlay/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Toast notification system via context provider. Auto-dismisses after 4.5s. **A11y:** region is `aria-live="polite"`, each toast is `role="status"`. **Do:** wrap your app root with ToastProvider. **Don\'t:** use for critical blocking errors—use Dialog or Alert instead.',
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
