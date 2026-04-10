import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

describe("카드", () => {
  it("제목·본문 복합 구조 렌더", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Last 24 hours</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Content</p>
        </CardBody>
        <CardFooter>
          <Button name="ok" variant="primary">
            OK
          </Button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Usage" })).toBeInTheDocument();
    expect(screen.getByText("Last 24 hours")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
  });

  it("루트에 className 병합", () => {
    const { container } = render(
      <Card className="ui:max-w-sm">
        <CardBody>X</CardBody>
      </Card>,
    );
    expect(container.firstChild).toHaveClass("ui:max-w-sm");
  });
});
