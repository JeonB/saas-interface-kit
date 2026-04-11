import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Details here</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("다이얼로그", () => {
  it("트리거로 열리고 제목을 노출함", async () => {
    const user = userEvent.setup();
    render(<DialogDemo />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("heading", { name: "Title" })).toBeInTheDocument();
  });

  it("취소 이벤트 시 닫힘(실제 브라우저에서는 Escape)", async () => {
    const user = userEvent.setup();
    render(<DialogDemo />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("heading", { name: "Title" })).toBeInTheDocument();
    const dialog = screen.getByRole("heading", { name: "Title" }).closest("dialog")!;
    fireEvent(dialog, new Event("cancel"));
    expect(screen.queryByRole("heading", { name: "Title" })).not.toBeInTheDocument();
  });

  it("DialogClose 클릭 시 닫힘", async () => {
    const user = userEvent.setup();
    render(<DialogDemo />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByText("Details here")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("heading", { name: "Title" })).not.toBeInTheDocument();
  });

  it("close 이벤트 시 onOpenChange false", async () => {
    const user = userEvent.setup();
    render(<DialogDemo />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = (await screen.findByRole("heading", { name: "Title" })).closest("dialog")!;
    fireEvent(dialog, new Event("close"));
    expect(screen.queryByRole("heading", { name: "Title" })).not.toBeInTheDocument();
  });
});
