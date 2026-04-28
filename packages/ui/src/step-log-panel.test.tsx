import { render, screen } from "@testing-library/react";
import { StepLogPanel } from "./step-log-panel";

describe("스텝 로그 패널", () => {
  it("빈 로그 메시지 표시", () => {
    render(<StepLogPanel steps={[]} />);
    expect(screen.getByText("로그가 없습니다.")).toBeInTheDocument();
  });

  it("로그 항목 렌더", () => {
    render(
      <StepLogPanel
        steps={[
          {
            id: "1",
            level: "info",
            message: "웹훅 수신 완료",
            startedAt: "2026-04-28 20:00",
            title: "Webhook Trigger",
          },
          {
            id: "2",
            level: "error",
            message: "CRM API 인증 실패",
            startedAt: "2026-04-28 20:01",
            title: "Upsert Contact",
          },
        ]}
      />,
    );

    expect(screen.getByText("Webhook Trigger")).toBeInTheDocument();
    expect(screen.getByText("CRM API 인증 실패")).toBeInTheDocument();
    expect(screen.getByText("[ERROR]")).toBeInTheDocument();
  });
});
