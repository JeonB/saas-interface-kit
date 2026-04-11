import Link from "next/link";
import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import { Select } from "@repo/ui/select";
import { loginAction } from "../actions/auth";

type LoginPageProps = {
  searchParams: Promise<{ from?: string; error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { from: fromParam, error } = await searchParams;
  const from = typeof fromParam === "string" && fromParam.startsWith("/") && !fromParam.startsWith("//")
    ? fromParam
    : "/app";

  return (
    <div className="w-full max-w-md" id="main-content">
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>데모 로그인</CardTitle>
          <CardDescription className="text-neutral-400">
            이메일과 역할을 선택하면 서명된 세션 쿠키가 설정됩니다. 백엔드 없이 RBAC UI만 검증할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardBody className="space-y-6">
          {error === "invalid" ? (
            <Alert title="입력 오류" variant="warning">
              이메일 형식을 확인하거나 역할을 다시 선택하세요.
            </Alert>
          ) : null}
          <form action={loginAction} className="space-y-4">
            <input name="from" type="hidden" value={from} />
            <Field id="login-email" label="이메일">
              <Input
                autoComplete="email"
                name="email"
                placeholder="you@company.com"
                required
                type="email"
              />
            </Field>
            <Field id="login-role" label="역할 (RBAC 데모)">
              <Select defaultValue="member" name="role" required>
                <option value="owner">owner</option>
                <option value="admin">admin</option>
                <option value="member">member</option>
                <option value="viewer">viewer</option>
              </Select>
            </Field>
            <Button className="w-full" name="signIn" type="submit" variant="primary">
              계속
            </Button>
          </form>
          <p className="text-center text-sm text-neutral-500">
            <Link className="text-neutral-300 underline underline-offset-2 hover:text-white" href="/">
              마케팅 홈
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
