import { Alert } from "@repo/ui/alert";
import { MembersTable } from "../../../components/members-table";
import { PermissionGate } from "../../../components/permission-gate";
import { getMembersData } from "../../../lib/members-mock";

export default async function MembersPage() {
  const members = await getMembersData();

  return (
    <div className="ui:mx-auto ui:max-w-5xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">멤버</h1>
      <p className="ui:mt-2 ui:max-w-2xl ui:text-sm ui:text-text-secondary">
        데모 데이터입니다. 실제 제품에서는{" "}
        <code className="ui:rounded ui:bg-surface-muted ui:px-1">@repo/api-client</code>로 멤버 API를 호출하고 RBAC는
        서버에서 검증하세요.
      </p>
      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            멤버 목록 조회는 owner, admin, member, viewer 역할에서 가능합니다.
          </Alert>
        }
        permission="members:read"
      >
        <div className="ui:mt-8 ui:overflow-x-auto ui:rounded-ui-lg ui:border ui:border-border-subtle ui:bg-surface-raised ui:p-4">
          <MembersTable data={members} />
        </div>
      </PermissionGate>
    </div>
  );
}
