import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
