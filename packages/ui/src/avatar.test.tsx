import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("아바타", () => {
  it("src가 있을 때 alt와 함께 이미지 렌더", () => {
    render(<Avatar src="https://example.com/a.png" alt="User" />);
    const img = screen.getByRole("img", { name: "User" });
    expect(img).toHaveAttribute("src", "https://example.com/a.png");
    expect(img).toHaveAttribute("referrerpolicy", "no-referrer");
  });

  it("span role=img·aria-label로 대체 렌더", () => {
    render(<Avatar fallback="AB" alt="Team member" />);
    const fallback = screen.getByRole("img", { name: "Team member" });
    expect(fallback).toHaveTextContent("AB");
  });

  it("alt가 비었을 때 대체 텍스트를 aria-label에 사용", () => {
    render(<Avatar fallback="XY" />);
    expect(screen.getByRole("img", { name: "XY" })).toBeInTheDocument();
  });

  it("이미지 분기에 className 적용", () => {
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

  it.each(["sm", "lg"] as const)("size %s 분기", (size) => {
    render(<Avatar fallback="U" size={size} />);
    expect(screen.getByRole("img", { name: "U" })).toBeInTheDocument();
  });

  it("alt·fallback 없을 때 기본 레이블과 물음표", () => {
    render(<Avatar />);
    expect(screen.getByRole("img", { name: "아바타" })).toHaveTextContent("?");
  });
});
