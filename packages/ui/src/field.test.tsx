import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./field";
import { Input } from "./input";

describe("Field", () => {
  it("associates label with control and sets aria-describedby for hint", () => {
    render(
      <Field hint="Use your work email." id="email" label="Email">
        <Input name="email" type="email" />
      </Field>,
    );

    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("id", "email");
    expect(input).toHaveAttribute("aria-describedby", "email-hint");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("sets aria-invalid and error description when error is present", () => {
    render(
      <Field error="Required." id="org" label="Organization">
        <Input name="org" />
      </Field>,
    );

    const input = screen.getByRole("textbox", { name: "Organization" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "org-error");
    expect(screen.getByRole("alert")).toHaveTextContent("Required.");
  });
});
