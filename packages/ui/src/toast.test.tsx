import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { ToastProvider, useToast } from "./toast";

function ToastDemo() {
  const { toast } = useToast();
  return (
    <Button
      name="showToast"
      onClick={() => {
        toast({ message: "Saved filters", title: "Workspace" });
      }}
      type="button"
      variant="primary"
    >
      Toast
    </Button>
  );
}

describe("토스트 제공자", () => {
  it("트리거 시 토스트 표시", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Toast" }));
    await waitFor(() => {
      expect(screen.getByText("Saved filters")).toBeInTheDocument();
    });
  });
});
