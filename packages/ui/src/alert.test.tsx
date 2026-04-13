import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "./alert";

describe("알림", () => {
  it("role alert로 렌더", () => {
    render(<Alert>Notice</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent("Notice");
  });

  it("선택 제목 렌더", () => {
    render(<Alert title="Warning">Take care</Alert>);

    expect(screen.getByText("Warning")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Take care");
  });

  it.each([
    ["success", "Saved"],
    ["warning", "Caution"],
    ["error", "Failed"],
  ] as const)("variant %s 스타일·아이콘 분기", (variant, title) => {
    render(
      <Alert title={title} variant={variant}>
        Body
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(title);
    expect(screen.getByRole("alert")).toHaveTextContent("Body");
  });

  it("닫기 버튼으로 onDismiss 호출", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Closable</Alert>);
    await user.click(screen.getByRole("button", { name: "알림 닫기" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
