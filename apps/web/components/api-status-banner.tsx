import { Alert } from "@repo/ui/alert";
import { getConsoleApiClient } from "../lib/console-api";

export async function ApiStatusBanner() {
  const client = getConsoleApiClient();
  if (!client) {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
        <Alert title="API" variant="info">
          <code className="rounded bg-neutral-900 px-1">NEXT_PUBLIC_API_URL</code>이 비어 있으면 이 템플릿은
          프론트만 동작합니다. BFF나 백엔드 URL을 넣으면 <code className="rounded bg-neutral-900 px-1">/health</code>{" "}
          확인을 시도합니다.
        </Alert>
      </div>
    );
  }

  let healthOk = false;
  try {
    await client.healthCheck();
    healthOk = true;
  } catch {
    healthOk = false;
  }

  if (healthOk) {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
        <Alert title="API" variant="success">
          백엔드 health 확인에 성공했습니다.
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
      <Alert title="API" variant="warning">
        API URL은 설정됐지만 health 엔드포인트 호출에 실패했습니다. CORS·네트워크·경로를 확인하세요.
      </Alert>
    </div>
  );
}
