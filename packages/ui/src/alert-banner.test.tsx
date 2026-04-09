import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlertBanner } from "./alert-banner";

describe("AlertBanner", () => {
  it("renders with role=alert", () => {
    render(<AlertBanner variant="warning">Maintenance scheduled.</AlertBanner>);
    expect(screen.getByRole("alert")).toHaveTextContent("Maintenance scheduled.");
  });

  it("shows title when provided", () => {
    render(<AlertBanner title="Notice" variant="info">Details here.</AlertBanner>);
    expect(screen.getByRole("alert")).toHaveTextContent("Notice");
    expect(screen.getByRole("alert")).toHaveTextContent("Details here.");
  });

  it("calls onDismiss when dismiss button clicked", async () => {
    const onDismiss = vi.fn();
    render(<AlertBanner onDismiss={onDismiss} variant="error">Error occurred.</AlertBanner>);
    await userEvent.click(screen.getByRole("button", { name: "배너 닫기" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("does not render dismiss button when onDismiss is omitted", () => {
    render(<AlertBanner variant="success">All good.</AlertBanner>);
    expect(screen.queryByRole("button", { name: "배너 닫기" })).not.toBeInTheDocument();
  });
});
