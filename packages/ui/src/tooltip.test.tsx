import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
});
