import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LinkCard } from "./link-card";

describe("LinkCard", () => {
  it("renders internal href without target or rel", () => {
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

  it("opens external links in new tab with noopener", () => {
    render(
      <LinkCard href="https://example.com/page" title="External">
        Out
      </LinkCard>,
    );
    const link = screen.getByRole("link", { name: /External/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.getAttribute("href")).toMatch(/^https:\/\/example\.com\/page\?/);
    expect(link.getAttribute("href")).toContain("utm_source=create-turbo");
  });

  it("appends UTM with ampersand when href already has query", () => {
    render(
      <LinkCard href="https://example.com/p?q=1" title="Q">
        Body
      </LinkCard>,
    );
    const link = screen.getByRole("link", { name: /Q/ });
    expect(link.getAttribute("href")).toContain("q=1");
    expect(link.getAttribute("href")).toContain("&utm_source=create-turbo");
  });

  it("merges className on the anchor", () => {
    render(
      <LinkCard className="ui:max-w-xs" href="/x" title="T">
        C
      </LinkCard>,
    );
    expect(screen.getByRole("link", { name: /T/ })).toHaveClass("ui:max-w-xs");
  });
});
