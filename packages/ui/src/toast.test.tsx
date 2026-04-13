import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
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

  it("자동으로 사라짐", () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Toast" }));
    expect(screen.getByText("Saved filters")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(4500);
    });
    expect(screen.queryByText("Saved filters")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("variant 톤 분기", () => {
    function VariantsDemo() {
      const { toast } = useToast();
      return (
        <Button
          name="go"
          onClick={() => {
            toast({ message: "ok", title: "T", variant: "success" });
            toast({ message: "warn", variant: "warning" });
            toast({ message: "bad", variant: "error" });
          }}
          type="button"
        >
          All
        </Button>
      );
    }
    render(
      <ToastProvider>
        <VariantsDemo />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "All" }));
    expect(screen.getByText("ok")).toBeInTheDocument();
    expect(screen.getByText("warn")).toBeInTheDocument();
    expect(screen.getByText("bad")).toBeInTheDocument();
    const surfaces = screen.getAllByRole("status");
    expect(surfaces.some((el) => el.className.includes("semantic-success"))).toBe(true);
    expect(surfaces.some((el) => el.className.includes("semantic-warning"))).toBe(true);
    expect(surfaces.some((el) => el.className.includes("semantic-danger"))).toBe(true);
  });

  it("ToastProvider 밖에서 useToast는 오류", () => {
    function Bad() {
      useToast();
      return null;
    }
    expect(() => render(<Bad />)).toThrow(/useToast must be used within ToastProvider/);
  });
});
