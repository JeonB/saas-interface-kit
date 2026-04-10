import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlertBanner } from "./alert-banner";

describe("알림 배너", () => {
  it("role=alert로 렌더", () => {
    render(<AlertBanner variant="warning">Maintenance scheduled.</AlertBanner>);
    expect(screen.getByRole("alert")).toHaveTextContent("Maintenance scheduled.");
  });

  it("제목이 있으면 표시", () => {
    render(<AlertBanner title="Notice" variant="info">Details here.</AlertBanner>);
    expect(screen.getByRole("alert")).toHaveTextContent("Notice");
    expect(screen.getByRole("alert")).toHaveTextContent("Details here.");
  });

  it("닫기 버튼 클릭 시 onDismiss 호출", async () => {
    const onDismiss = vi.fn();
    render(<AlertBanner onDismiss={onDismiss} variant="error">Error occurred.</AlertBanner>);
    await userEvent.click(screen.getByRole("button", { name: "배너 닫기" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("onDismiss가 없으면 닫기 버튼 미렌더", () => {
    render(<AlertBanner variant="success">All good.</AlertBanner>);
    expect(screen.queryByRole("button", { name: "배너 닫기" })).not.toBeInTheDocument();
  });
});
