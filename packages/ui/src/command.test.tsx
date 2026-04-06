import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Command, CommandContent } from "./command";
import { CommandInput, CommandList, CommandItem } from "./command";

describe("CommandInput", () => {
  it("renders a search input", () => {
    render(
      <Command open onOpenChange={() => {}}>
        <CommandContent>
          <CommandInput value="" onValueChange={() => {}} aria-label="Search" />
        </CommandContent>
      </Command>
    );
    expect(
      screen.getByRole("searchbox", { name: "Search" })
    ).toBeInTheDocument();
  });
});

describe("CommandItem", () => {
  it("calls onSelect when clicked", async () => {
    const onSelect = vi.fn();
    render(
      <Command open onOpenChange={() => {}}>
        <CommandContent>
          <CommandList>
            <CommandItem onSelect={onSelect}>Go to dashboard</CommandItem>
          </CommandList>
        </CommandContent>
      </Command>
    );
    await userEvent.click(
      screen.getByRole("option", { name: "Go to dashboard" })
    );
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
