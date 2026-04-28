import { render, screen } from "@testing-library/react";
import { RunStatusBadge } from "./run-status-badge";

describe("실행 상태 배지", () => {
  it.each([
    ["queued", "대기"],
    ["running", "실행 중"],
    ["succeeded", "성공"],
    ["failed", "실패"],
    ["cancelled", "취소"],
  ] as const)("상태 %s를 %s로 표시", (status, label) => {
    render(<RunStatusBadge status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
