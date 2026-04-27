import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-start justify-center gap-4 px-4 text-white sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm text-neutral-400">요청한 경로가 없거나 이동되었습니다.</p>
      <Link
        className="inline-flex items-center rounded-ui-md bg-semantic-brand px-4 py-2 text-sm font-medium text-text-on-brand transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-brand/40"
        href="/"
      >
        홈으로 이동
      </Link>
    </main>
  );
}
