import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { LinkCard } from "@repo/ui/link-card";
import { EmptyState } from "@repo/ui/empty-state";
import { Field } from "@repo/ui/field";
import { Gradient } from "@repo/ui/gradient";
import { Input } from "@repo/ui/input";
import { StatCard } from "@repo/ui/stat-card";
import { DOCS_BASE } from "../lib/config";

function isExternalDocsHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function DashboardOverview() {
  const cursorHelpHref = `${DOCS_BASE}/docs/cursor-help`;
  const cursorHelpExternal = isExternalDocsHref(cursorHelpHref);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-neutral-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Gradient
          className="left-1/2 top-[-280px] h-[560px] w-[560px] -translate-x-1/2 opacity-20"
          conic
        />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Badge className="mb-4" variant="default">
            워크스페이스 · 운영
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">사용량 개요</h1>
          <p className="mt-3 max-w-2xl text-neutral-400">
            <code className="rounded bg-neutral-900 px-1">@repo/ui</code> 프리미티브만으로 구성한 B2B SaaS 대시보드 예시입니다.
            지표, 필터, 알림, 빈 상태가 하나의 디자인 언어를 공유합니다.
          </p>
          <div className="mt-8 max-w-xl">
            <Alert title="결제" variant="info">
              체험이 9일 후 종료됩니다. 서비스 중단을 피하려면 결제 수단을 등록하세요.
            </Alert>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">지표</h2>
            <p className="text-sm text-neutral-400">최근 30일 · 전체 리전</p>
          </div>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-end" noValidate>
            <Field className="sm:flex-1" id="dashboard-search" label="이벤트 필터">
              <Input name="eventFilter" placeholder="사용자 또는 이벤트로 검색…" type="search" />
            </Field>
            <Button name="applyFilter" type="submit" variant="primary">
              적용
            </Button>
          </form>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard delta="전기 대비 +6.1%" label="MRR" trend="up" value="$48.2k" />
          <StatCard delta="-0.2pp" label="이탈률" trend="up" value="1.0%" />
          <StatCard delta="+128" label="활성 시트" trend="up" value="1,842" />
          <StatCard delta="변동 없음" label="NPS" trend="neutral" value="44" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-white">연동 및 리소스</h2>
        <p className="mt-1 text-sm text-neutral-400">
          링크 카드도 동일한 UI 키트를 사용하며, 외부 링크는 새 탭에서 열립니다.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              <LinkCard href={`${DOCS_BASE}/docs/components`} title="컴포넌트 참고">
                문서 앱에서 @repo/ui API, 접근성 메모, 예시를 확인하세요.
              </LinkCard>
              <LinkCard href={`${DOCS_BASE}/docs/foundations`} title="파운데이션">
                키트 전반에서 쓰는 시맨틱 토큰, 서피스, 피드백 색상입니다.
              </LinkCard>
            </div>
          </div>
          <EmptyState
            action={
              <Button name="connect-slack" variant="primary">
                Slack 연결
              </Button>
            }
            description={
              <>
                사용량이 급증하거나 한도에 가까워지면 채널에서 알림을 받으세요. Cursor가 연결된 경우 Cloud Agent 팁은{" "}
                <code className="rounded bg-neutral-800 px-1 text-xs">@Cursor help</code>를 사용하고, 자세한 내용은{" "}
                <a
                  className="text-white underline underline-offset-2 hover:text-neutral-200"
                  href={cursorHelpHref}
                  {...(cursorHelpExternal && { rel: "noopener noreferrer", target: "_blank" })}
                >
                  Slack의 Cursor
                </a>
                를 참고하세요.
              </>
            }
            title="채팅 알림 없음"
          />
        </div>
      </section>
    </div>
  );
}
