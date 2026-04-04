import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("renders compound structure with heading and body", () => {
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

  it("merges className on root", () => {
    const { container } = render(
      <Card className="ui:max-w-sm">
        <CardBody>X</CardBody>
      </Card>,
    );
    expect(container.firstChild).toHaveClass("ui:max-w-sm");
  });
});
