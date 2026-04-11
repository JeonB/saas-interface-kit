import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { getSession } from "../../../lib/session";

export default async function OrgSettingsPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">조직 설정</h1>
      <p className="mt-2 text-sm text-neutral-400">워크스페이스 메타데이터와 세션 정보 (데모)</p>
      <Card className="mt-8 border-neutral-800 bg-neutral-900/50">
        <CardHeader>
          <CardTitle>조직</CardTitle>
          <CardDescription className="text-neutral-400">현재 세션에 바인딩된 데모 조직입니다.</CardDescription>
        </CardHeader>
        <CardBody className="space-y-2 text-sm text-neutral-300">
          <p>
            <span className="text-neutral-500">이름:</span> {session.orgName}
          </p>
          <p>
            <span className="text-neutral-500">ID:</span>{" "}
            <code className="rounded bg-neutral-950 px-1">{session.orgId}</code>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
