import Link from "next/link";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<{ from?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { from: fromParam } = await searchParams;
  const from = typeof fromParam === "string" && fromParam.startsWith("/") && !fromParam.startsWith("//")
    ? fromParam
    : "/console";

  return (
    <div className="w-full max-w-md">
      <Card className="border-neutral-800 bg-neutral-900/60">
        <CardHeader>
          <CardTitle>데모 로그인</CardTitle>
          <CardDescription className="text-neutral-400">
            이메일과 역할을 선택하면 서명된 세션 쿠키가 설정됩니다. 백엔드 없이 RBAC UI만 검증할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardBody className="space-y-6">
          <LoginForm from={from} />
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
