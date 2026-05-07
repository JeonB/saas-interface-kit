import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { PermissionGate } from "../../../../components/permission-gate";

export default function BillingPage() {
  return (
    <div className="ui:mx-auto ui:max-w-3xl ui:px-4 ui:py-10 ui:text-text-primary sm:ui:px-6 lg:ui:px-8">
      <h1 className="ui:text-2xl ui:font-bold ui:tracking-tight">청구</h1>
      <p className="ui:mt-2 ui:text-sm ui:text-text-secondary">플랜·결제 수단 UI 자리 (프론트 템플릿)</p>

      <Card className="ui:mt-8">
        <CardHeader>
          <CardTitle>플랜</CardTitle>
          <CardDescription>모든 로그인 사용자가 볼 수 있는 영역입니다.</CardDescription>
        </CardHeader>
        <CardBody>
          <p className="ui:text-sm ui:text-text-secondary">Pro 플랜 · 월 청구 (데모)</p>
        </CardBody>
      </Card>

      <div className="ui:mt-8">
        <PermissionGate
          fallback={
            <Alert title="권한" variant="info">
              결제 수단 관리는 owner 또는 admin 역할이 필요합니다. 로그아웃 후 역할을 바꿔 다시 로그인해 보세요.
            </Alert>
          }
          permission="billing:manage"
        >
          <Card>
            <CardHeader>
              <CardTitle>결제 수단</CardTitle>
              <CardDescription>
                <code className="ui:rounded ui:bg-surface-muted ui:px-1">billing:manage</code> 권한이 있을 때만
                표시됩니다.
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
