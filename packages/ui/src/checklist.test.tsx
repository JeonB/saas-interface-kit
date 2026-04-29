import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Checklist, ChecklistItem } from "./checklist";

describe("Checklist", () => {
  it("완료 항목 기준으로 진행률과 카운트를 표시", () => {
    render(
      <Checklist
        items={[
          { id: "1", status: "done", title: "첫 번째" },
          { id: "2", status: "todo", title: "두 번째" },
          { id: "3", status: "done", title: "세 번째" },
          { id: "4", status: "skipped", title: "네 번째" },
        ]}
        title="온보딩"
      />,
    );

    expect(screen.getByText("2/4 완료")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "진행률 50%" })).toBeInTheDocument();
  });

  it("리스트 role과 항목 제목을 렌더", () => {
    render(
      <Checklist
        items={[
          { id: "1", status: "todo", title: "조직 설정" },
          { id: "2", status: "done", title: "멤버 초대" },
        ]}
        title="시작하기"
      />,
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("조직 설정")).toBeInTheDocument();
    expect(screen.getByText("멤버 초대")).toBeInTheDocument();
  });
});

describe("ChecklistItem", () => {
  it("action 버튼 클릭 핸들러를 호출", async () => {
    const onAction = vi.fn();
    render(<ChecklistItem actionLabel="실행" onAction={onAction} status="todo" title="테스트" />);

    const button = screen.getByRole("button", { name: "실행" });
    button.click();

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
