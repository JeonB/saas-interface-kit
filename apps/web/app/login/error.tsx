"use client";

import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";

type LoginErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function LoginErrorPage({ error, reset }: LoginErrorPageProps) {
  return (
    <div className="w-full max-w-md" id="main-content">
      <Alert title="로그인 화면 오류" variant="error">
        {error.message || "로그인 페이지를 렌더링하는 중 문제가 발생했습니다."}
      </Alert>
      <div className="mt-4">
        <Button name="retry-login-page" onClick={reset} type="button" variant="primary">
          다시 시도
        </Button>
      </div>
    </div>
  );
}
