import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { Tooltip } from "./tooltip";

describe("툴팁", () => {
  it("호버 시 툴팁 표시", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Extra detail">
        <button type="button">Target</button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole("button", { name: "Target" }));
    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveTextContent("Extra detail");
    });
  });

  it("단일 React 요소가 아니면 오류", () => {
    expect(() =>
      render(<Tooltip content="x">{null as unknown as ReactElement}</Tooltip>),
    ).toThrow(/expects a single React element child/);
  });
});
