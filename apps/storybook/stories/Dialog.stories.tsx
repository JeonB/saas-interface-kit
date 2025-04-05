import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@repo/ui/dialog";
import { Button } from "@repo/ui/button";

const meta = {
  title: "Overlay/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal dialog using native `<dialog>` with `showModal`. **A11y:** `aria-labelledby` from DialogTitle; Escape closes via `cancel` event. **Do:** always include DialogTitle for screen readers. **Don't:** stack multiple dialogs.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button name="openDialog" variant="primary">
            Open dialog
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>
              This will permanently delete the resource.
            </DialogDescription>
          </DialogHeader>
          <div className="ui:px-6 ui:py-4">
            <p className="ui:text-sm ui:text-text-secondary">
              Are you sure you want to continue?
            </p>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button name="cancel" variant="default">
                Cancel
              </Button>
            </DialogClose>
            <Button name="confirm" variant="danger">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
