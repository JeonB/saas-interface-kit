import { Alert } from "@repo/ui/alert";
import { MembersTable, type MemberRow } from "../../../components/members-table";
import { PermissionGate } from "../../../components/permission-gate";

const MOCK_MEMBERS: MemberRow[] = [
  { id: "1", name: "김운영", email: "owner@example.com", role: "owner" },
  { id: "2", name: "이관리", email: "admin@example.com", role: "admin" },
  { id: "3", name: "박멤버", email: "member@example.com", role: "member" },
  { id: "4", name: "최뷰어", email: "viewer@example.com", role: "viewer" },
];

export default async function MembersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">멤버</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-400">
        데모 데이터입니다. 실제 제품에서는 <code className="rounded bg-neutral-900 px-1">@repo/api-client</code>로
        멤버 API를 호출하고 RBAC는 서버에서 검증하세요.
      </p>
      <PermissionGate
        fallback={
          <Alert title="권한" variant="info">
            멤버 목록 조회는 owner, admin, member, viewer 역할에서 가능합니다.
          </Alert>
        }
        permission="members:read"
      >
        <div className="mt-8 overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <MembersTable data={MOCK_MEMBERS} />
        </div>
      </PermissionGate>
    </div>
  );
}
