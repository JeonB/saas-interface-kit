import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

describe("명령 입력", () => {
  it("검색 입력 렌더", () => {
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

  it("입력 시 onValueChange에 값 전달", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <Command open onOpenChange={() => {}}>
          <CommandContent>
            <CommandInput
              aria-label="Filter"
              onValueChange={(next) => {
                onValueChange(next);
                setValue(next);
              }}
              value={value}
            />
          </CommandContent>
        </Command>
      );
    }
    render(<Controlled />);
    await user.type(screen.getByRole("searchbox", { name: "Filter" }), "ab");
    expect(onValueChange).toHaveBeenCalled();
  });
});

describe("명령 항목", () => {
  it("클릭 시 onSelect 호출", async () => {
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

  it("CommandGroup·CommandEmpty 렌더", () => {
    render(
      <Command open onOpenChange={() => {}}>
        <CommandContent>
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => {}}>One</CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandEmpty>No matches</CommandEmpty>
        </CommandContent>
      </Command>,
    );
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });
});
