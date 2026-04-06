import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "@repo/ui/tooltip";
import { Button } from "@repo/ui/button";

const meta = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Hover/focus tooltip using Floating UI. **A11y:** `role="tooltip"`; shows on hover (120ms delay) and focus; dismisses on Escape. **Do:** keep content to a single short phrase. **Don\'t:** put interactive elements inside tooltip content.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: (
      <Button name="tooltipDemo" variant="default">
        Hover me
      </Button>
    ),
  },
};

export const Placements: Story = {
  render: () => (
    <div className="ui:flex ui:gap-4">
      <Tooltip content="Top" placement="top">
        <Button name="top" variant="default">
          Top
        </Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button name="bottom" variant="default">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button name="left" variant="default">
          Left
        </Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button name="right" variant="default">
          Right
        </Button>
      </Tooltip>
    </div>
  ),
};
