import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { redirect } from "next/navigation";
import { buildLoginRedirectUrl } from "../../../lib/redirect-path";
import { getSession } from "../../../lib/session";

export default async function OrgSettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect(buildLoginRedirectUrl("/console/settings"));
  }

  return (
    <div className="ui:mx-auto ui:max-w-3xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">조직 설정</h1>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">워크스페이스 메타데이터와 세션 정보 (데모)</p>
      <Card className="ui:mt-8">
        <CardHeader>
          <CardTitle>조직</CardTitle>
          <CardDescription>현재 세션에 바인딩된 데모 조직입니다.</CardDescription>
        </CardHeader>
        <CardBody className="ui:space-y-2 ui:text-sm ui:text-text-secondary">
          <p>
            <span className="ui:text-text-muted">이름:</span> {session.orgName}
          </p>
          <p>
            <span className="ui:text-text-muted">ID:</span>{" "}
            <code className="ui:rounded ui:bg-surface-muted ui:px-1">{session.orgId}</code>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
