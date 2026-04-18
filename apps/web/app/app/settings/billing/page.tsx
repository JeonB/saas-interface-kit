import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { PermissionGate } from "../../../../components/permission-gate";

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight">청구</h1>
      <p className="mt-2 text-sm text-neutral-400">플랜·결제 수단 UI 자리 (프론트 템플릿)</p>

      <Card className="mt-8 border-neutral-800 bg-neutral-900/50">
        <CardHeader>
          <CardTitle>플랜</CardTitle>
          <CardDescription className="text-neutral-400">모든 로그인 사용자가 볼 수 있는 영역입니다.</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-neutral-300">Pro 플랜 · 월 청구 (데모)</p>
        </CardBody>
      </Card>

      <div className="mt-8">
        <PermissionGate
          fallback={
            <Alert title="권한" variant="info">
              결제 수단 관리는 owner 또는 admin 역할이 필요합니다. 로그아웃 후 역할을 바꿔 다시 로그인해 보세요.
            </Alert>
          }
          permission="billing:manage"
        >
          <Card className="border-neutral-800 bg-neutral-900/50">
            <CardHeader>
              <CardTitle>결제 수단</CardTitle>
              <CardDescription className="text-neutral-400">
                <code className="rounded bg-neutral-950 px-1">billing:manage</code> 권한이 있을 때만 표시됩니다.
              </CardDescription>
            </CardHeader>
            <CardBody>
              <Button name="addPaymentMethod" type="button" variant="primary">
                결제 수단 등록 (데모)
              </Button>
            </CardBody>
          </Card>
        </PermissionGate>
      </div>
    </div>
  );
}
