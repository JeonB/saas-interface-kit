"use client";

import { Button } from "@repo/ui/button";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  return (
    <html lang="ko">
      <body className="bg-neutral-950 text-white">
        <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-start justify-center gap-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold">예상치 못한 오류</h1>
          <p className="text-sm text-neutral-400">
            앱 렌더링 중 전역 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
          </p>
          {error.digest ? <p className="text-xs text-neutral-500">digest: {error.digest}</p> : null}
          <Button name="retry-global" onClick={reset} type="button" variant="primary">
            다시 시도
          </Button>
        </main>
      </body>
    </html>
  );
}
