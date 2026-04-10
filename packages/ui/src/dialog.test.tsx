import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Title</DialogTitle>
        <DialogClose>Close</DialogClose>
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
});
