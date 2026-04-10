import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./field";
import { Input } from "./input";

describe("필드", () => {
  it("레이블을 컨트롤에 연결하고 힌트용 aria-describedby 설정", () => {
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

  it("오류가 있을 때 aria-invalid와 오류 설명 설정", () => {
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
