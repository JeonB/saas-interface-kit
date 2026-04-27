"use client";

import { Alert } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";

type ConsoleErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ConsoleErrorPage({ error, reset }: ConsoleErrorPageProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Alert title="콘솔 로드 실패" variant="error">
        {error.message || "콘솔 화면을 불러오지 못했습니다."}
      </Alert>
      <div className="mt-4">
        <Button name="retry-console" onClick={reset} type="button" variant="primary">
          다시 시도
        </Button>
      </div>
    </div>
  );
}
