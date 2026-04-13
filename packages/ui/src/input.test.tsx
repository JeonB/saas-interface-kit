import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./input";

describe("입력", () => {
  it("접근 가능한 이름과 name 속성으로 렌더", () => {
    render(<Input aria-label="Search" name="search" placeholder="Query" />);

    const field = screen.getByRole("textbox", { name: "Search" });
    expect(field).toHaveAttribute("name", "search");
  });

  it("disabled일 때 비활성", () => {
    render(<Input aria-label="Code" disabled name="code" />);

    expect(screen.getByRole("textbox", { name: "Code" })).toBeDisabled();
  });

  it.each(["sm", "lg"] as const)("size %s 단일 입력 분기", (size) => {
    render(<Input aria-label="Sized" name="s" size={size} />);
    expect(screen.getByRole("textbox", { name: "Sized" })).toBeInTheDocument();
  });

  it("좌·우 애드온 래퍼 분기", () => {
    render(
      <Input
        aria-label="With addons"
        leftAddon="$"
        name="price"
        rightAddon="USD"
      />,
    );
    expect(screen.getByText("$")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "With addons" })).toHaveAttribute(
      "name",
      "price",
    );
  });

  it("한쪽 애드온만 있을 때 래퍼 사용", () => {
    render(<Input aria-label="Prefix only" leftAddon="#" name="id" />);
    expect(screen.getByRole("textbox", { name: "Prefix only" })).toBeInTheDocument();
    expect(screen.getByText("#")).toBeInTheDocument();
  });

  it("애드온과 size lg 래퍼·내부 패딩 분기", () => {
    render(
      <Input aria-label="Large addon" leftAddon="@" name="email" size="lg" />,
    );
    expect(screen.getByRole("textbox", { name: "Large addon" })).toBeInTheDocument();
  });

  it("애드온과 size sm 래퍼·내부 패딩 분기", () => {
    render(
      <Input aria-label="Small addon" rightAddon="%" name="pct" size="sm" />,
    );
    expect(screen.getByRole("textbox", { name: "Small addon" })).toBeInTheDocument();
  });
});
