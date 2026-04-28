import { fireEvent, render, screen } from "@testing-library/react";
import { ConnectorCard } from "./connector-card";

describe("연동 카드", () => {
  it("이름, 벤더, 상태를 렌더", () => {
    render(
      <ConnectorCard
        description="CRM 고객 동기화"
        lastSyncAt="2026-04-28 19:00"
        name="Salesforce"
        status="connected"
        vendor="Salesforce"
      />,
    );

    expect(screen.getByRole("heading", { name: "Salesforce" })).toBeInTheDocument();
    expect(screen.getByText("CRM 고객 동기화")).toBeInTheDocument();
    expect(screen.getAllByText("연결됨").length).toBeGreaterThan(0);
    expect(screen.getByText("마지막 동기화:")).toBeInTheDocument();
  });

  it("액션 버튼 핸들러를 호출", () => {
    const onConnect = vi.fn();
    const onTest = vi.fn();

    render(
      <ConnectorCard
        name="Slack"
        onConnect={onConnect}
        onTest={onTest}
        status="disconnected"
        vendor="Slack"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "연결 테스트" }));
    fireEvent.click(screen.getByRole("button", { name: "연결" }));

    expect(onTest).toHaveBeenCalledTimes(1);
    expect(onConnect).toHaveBeenCalledTimes(1);
  });
});
