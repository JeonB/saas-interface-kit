import Link from "next/link";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Gradient } from "@repo/ui/gradient";

export default function MarketingHomePage() {
  return (
    <div className="relative flex flex-col">
      <section className="relative overflow-hidden border-b border-neutral-800 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Gradient
          className="left-1/2 top-[-320px] h-[640px] w-[640px] -translate-x-1/2 opacity-25"
          conic
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Badge className="mb-4" variant="default">
            Turborepo · @repo/ui
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Northline</h1>
          <p className="mt-4 text-lg text-neutral-400">
            B2B SaaS 콘솔을 위한 모노레포 템플릿입니다. 공유 UI, 문서, Storybook, 품질 게이트 위에 인증·조직·RBAC·청구
            흐름을 얹었습니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild name="ctaLogin" variant="primary">
              <Link href="/login">로그인</Link>
            </Button>
            <Button asChild name="ctaConsole" variant="default">
              <Link href="/console">콘솔 열기</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm text-neutral-500">
          콘솔은 세션이 필요합니다. 데모 로그인에서 이메일과 역할을 선택하면{" "}
          <code className="rounded bg-neutral-900 px-1 text-neutral-300">/console</code> 아래 라우트가 열립니다.
        </p>
      </section>
    </div>
  );
}
