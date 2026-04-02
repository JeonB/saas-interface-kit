import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("renders image with alt when src is provided", () => {
    render(<Avatar src="https://example.com/a.png" alt="User" />);
    const img = screen.getByRole("img", { name: "User" });
    expect(img).toHaveAttribute("src", "https://example.com/a.png");
    expect(img).toHaveAttribute("referrerpolicy", "no-referrer");
  });

  it("renders fallback in a span with role img and aria-label", () => {
    render(<Avatar fallback="AB" alt="Team member" />);
    const fallback = screen.getByRole("img", { name: "Team member" });
    expect(fallback).toHaveTextContent("AB");
  });

  it("uses fallback text in aria-label when alt is empty", () => {
    render(<Avatar fallback="XY" />);
    expect(screen.getByRole("img", { name: "XY" })).toBeInTheDocument();
  });

  it("applies className to image branch", () => {
    render(
      <Avatar
        className="ui:border ui:border-white"
        src="https://example.com/b.png"
        alt="X"
      />,
    );
    const img = screen.getByRole("img", { name: "X" });
    expect(img).toHaveClass("ui:border");
  });
});
