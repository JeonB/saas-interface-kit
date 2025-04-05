import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Command,
  CommandTrigger,
  CommandContent,
  CommandHeader,
  CommandTitle,
  CommandClose,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@repo/ui/command";
import { Button } from "@repo/ui/button";

const meta = {
  title: "Overlay/Command",
  component: CommandInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Command palette pattern: Dialog + searchable list. **A11y:** input is `type="search"`; items are `role="option"` inside `role="listbox"`. **Do:** group items with CommandGroup. **Don\'t:** use for simple select—use Select or RadioGroup instead.',
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const items = [
      {
        group: "Navigation",
        items: ["Dashboard", "Analytics", "Settings"],
      },
      {
        group: "Actions",
        items: ["Create project", "Invite member", "Export data"],
      },
    ];
    return (
      <Command open={open} onOpenChange={setOpen}>
        <CommandTrigger>
          <Button name="openCommand" variant="default">
            Open command palette
          </Button>
        </CommandTrigger>
        <CommandContent>
          <CommandHeader>
            <CommandTitle>Command palette</CommandTitle>
          </CommandHeader>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search commands..."
            aria-label="Search commands"
          />
          <CommandList>
            {items.map((g) => (
              <CommandGroup key={g.group} heading={g.group}>
                {g.items
                  .filter((i) =>
                    i.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((i) => (
                    <CommandItem key={i} onSelect={() => setOpen(false)}>
                      {i}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
            {items.every(
              (g) =>
                g.items.filter((i) =>
                  i.toLowerCase().includes(search.toLowerCase())
                ).length === 0
            ) && <CommandEmpty>No results found.</CommandEmpty>}
          </CommandList>
          <div className="ui:border-t ui:border-border-subtle ui:px-4 ui:py-2">
            <CommandClose>
              <Button name="closeCmd" variant="default" size="sm">
                Close
              </Button>
            </CommandClose>
          </div>
        </CommandContent>
      </Command>
    );
  },
};
