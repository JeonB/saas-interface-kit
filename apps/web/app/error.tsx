"use client";

import { Button } from "@repo/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-start justify-center gap-4 px-4 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">페이지 오류</h1>
      <p className="text-sm text-neutral-400">
        요청을 처리하는 중 오류가 발생했습니다. 계속되면 잠시 후 다시 시도하세요.
      </p>
      {error.digest ? <p className="text-xs text-neutral-500">digest: {error.digest}</p> : null}
      <Button name="retry-page" onClick={reset} type="button" variant="primary">
        다시 시도
      </Button>
    </main>
  );
}
