import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuTrigger } from "./dropdown-menu";

describe("드롭다운 컨텍스트", () => {
  it("DropdownMenu 밖에서 Trigger 사용 시 오류", () => {
    expect(() =>
      render(
        <DropdownMenuTrigger>
          <Button name="x" variant="default">
            X
          </Button>
        </DropdownMenuTrigger>,
      ),
    ).toThrow(/must be used within DropdownMenu/);
  });

  it("Trigger는 단일 React 요소만 허용", () => {
    expect(() =>
      render(
        <DropdownMenu>
          <DropdownMenuTrigger>
            {null as unknown as ReactElement<Record<string, unknown>>}
          </DropdownMenuTrigger>
        </DropdownMenu>,
      ),
    ).toThrow(/expects a single React element/);
  });
});
