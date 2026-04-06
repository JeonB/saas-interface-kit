import type { Meta, StoryObj } from "@storybook/react-vite";
import { CommandBar } from "@repo/ui/command-bar";
import { Input } from "@repo/ui/input";
import { FilterChip } from "@repo/ui/filter-bar";

const meta = {
  title: "Overlay/CommandBar",
  component: CommandBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Inline search bar container with `role="search"`. **A11y:** wrapping `role="search"` landmark. **Do:** compose with Input and FilterChip. **Don\'t:** use as form—use a `<form>` element instead.',
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CommandBar>
      <Input
        name="search"
        placeholder="Search resources..."
        aria-label="Search"
        size="sm"
      />
      <FilterChip active>All</FilterChip>
      <FilterChip>Active</FilterChip>
      <FilterChip>Archived</FilterChip>
    </CommandBar>
  ),
};
