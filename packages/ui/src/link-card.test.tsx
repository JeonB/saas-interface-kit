import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LinkCard } from "./link-card";

describe("링크 카드", () => {
  it("내부 href는 target·rel 없이 렌더", () => {
    render(
      <LinkCard href="/docs" title="Docs">
        Read more
      </LinkCard>,
    );
    const link = screen.getByRole("link", { name: /Docs/ });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("외부 링크는 noopener로 새 탭", () => {
    render(
      <LinkCard href="https://example.com/page" title="External">
        Out
      </LinkCard>,
    );
    const link = screen.getByRole("link", { name: /External/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("href", "https://example.com/page");
  });

  it("외부 href의 기존 쿼리는 그대로 유지", () => {
    render(
      <LinkCard href="https://example.com/p?q=1" title="Q">
        Body
      </LinkCard>,
    );
    const link = screen.getByRole("link", { name: /Q/ });
    expect(link).toHaveAttribute("href", "https://example.com/p?q=1");
  });

  it("앵커에 className 병합", () => {
    render(
      <LinkCard className="ui:max-w-xs" href="/x" title="T">
        C
      </LinkCard>,
    );
    expect(screen.getByRole("link", { name: /T/ })).toHaveClass("ui:max-w-xs");
  });
});
