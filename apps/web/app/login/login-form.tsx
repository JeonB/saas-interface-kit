"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import { Select } from "@repo/ui/select";
import { loginAction, type LoginActionState } from "../actions/auth";

type LoginFormProps = {
  from: string;
};

const INITIAL_STATE: LoginActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending} name="signIn" type="submit" variant="primary">
      {pending ? "로그인 중..." : "계속"}
    </Button>
  );
}

export function LoginForm({ from }: LoginFormProps) {
  const [state, formAction] = useActionState(loginAction, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-4">
      <input name="from" type="hidden" value={from} />
      {state.error ? (
        <Alert title="입력 오류" variant="warning">
          {state.error}
        </Alert>
      ) : null}
      <Field id="login-email" label="이메일">
        <Input autoComplete="email" name="email" placeholder="you@company.com" required type="email" />
      </Field>
      <Field id="login-role" label="역할 (RBAC 데모)">
        <Select defaultValue="member" name="role" required>
          <option value="owner">owner</option>
          <option value="admin">admin</option>
          <option value="member">member</option>
          <option value="viewer">viewer</option>
        </Select>
      </Field>
      <SubmitButton />
    </form>
  );
}
