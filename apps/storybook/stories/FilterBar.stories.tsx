import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";

const meta = {
  title: "Form/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal bar of toggle-able filter chips. **A11y:** each chip is a `<button>` with focus ring. **Do:** manage active state externally. **Don't:** use for navigation—use NavTabs instead.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("all");
    const filters = ["all", "active", "paused", "archived"];
    return (
      <FilterBar>
        {filters.map((f) => (
          <FilterChip key={f} active={active === f} onClick={() => setActive(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </FilterChip>
        ))}
      </FilterBar>
    );
  },
};
