import { Badge } from "@repo/ui/badge";
import Link from "next/link";

export default function PatternsPage() {
  return (
    <>
      <Badge className="mb-4" variant="default">
        패턴
      </Badge>
      <h1 className="text-3xl font-bold text-white">조합 패턴</h1>
      <p className="mt-2 text-neutral-400">
        <code className="rounded bg-neutral-800 px-1">@repo/ui</code> 컴포넌트를 묶어 실제 기능으로 만드는 레시피입니다.
        각 패턴은 관련 컴포넌트, 연결 방식, 접근성 고려 사항을 보여 줍니다.
      </p>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">1. 폼 패턴</h2>
        <p className="text-sm text-neutral-400">
          <strong>컴포넌트:</strong> Field + Input / Textarea / Select / Checkbox + Button
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">레시피</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              각 컨트롤을 <code className="rounded bg-neutral-800 px-1">Field</code>로 감쌉니다 —{" "}
              <code className="rounded bg-neutral-800 px-1">htmlFor/id</code>,{" "}
              <code className="rounded bg-neutral-800 px-1">aria-describedby</code>,{" "}
              <code className="rounded bg-neutral-800 px-1">aria-invalid</code>를 자동으로 연결합니다.
            </li>
            <li>
              검증 메시지는 Field의 <code className="rounded bg-neutral-800 px-1">error</code> prop으로 넘깁니다.
              자식 input에는 <code className="rounded bg-neutral-800 px-1">aria-invalid=&quot;true&quot;</code>가 적용됩니다.
            </li>
            <li>
              모든 폼 요소에 <code className="rounded bg-neutral-800 px-1">name</code>을 반드시 설정합니다 —
              폼 데이터·분석·&quot;폼 필드에 id 또는 name이 있어야 한다&quot; 경고 방지에 필요합니다.
            </li>
            <li>
              <code className="rounded bg-neutral-800 px-1">&lt;form&gt;</code> 안에서는{" "}
              <code className="rounded bg-neutral-800 px-1">Button type=&quot;submit&quot;</code>을 사용합니다.
              폼 밖에서는 기본 <code className="rounded bg-neutral-800 px-1">type=&quot;button&quot;</code>으로
              의도치 않은 제출을 막습니다.
            </li>
          </ol>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
{`<form onSubmit={handleSubmit}>
  <Field id="name" label="프로젝트 이름" error={errors.name}>
    <Input name="name" placeholder="Analytics API" />
  </Field>
  <Field id="desc" label="설명" hint="선택">
    <Textarea name="desc" rows={3} />
  </Field>
  <Button type="submit" variant="primary" name="createProject">
    프로젝트 만들기
  </Button>
</form>`}
        </pre>
        <p className="text-sm text-neutral-400">
          <strong>접근성:</strong> 검증 실패 시 스크린 리더가 &quot;프로젝트 이름, 필수, 유효하지 않음: [오류 메시지]&quot;처럼
          읽습니다. 추가 ARIA 배선이 필요 없습니다.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">2. 대시보드 패턴</h2>
        <p className="text-sm text-neutral-400">
          <strong>컴포넌트:</strong> AppShell + Sidebar + NavTabs + KPIGrid + StatCard / MetricCard + FilterBar
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">레시피</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              <code className="rounded bg-neutral-800 px-1">AppShell</code>이 그리드 셸을 제공합니다. 왼쪽 레일은{" "}
              <code className="rounded bg-neutral-800 px-1">AppShellSidebar</code>, 본문은{" "}
              <code className="rounded bg-neutral-800 px-1">AppShellMain</code>에 둡니다.
            </li>
            <li>
              AppShellSidebar 안에서 <code className="rounded bg-neutral-800 px-1">Sidebar</code>와{" "}
              <code className="rounded bg-neutral-800 px-1">SidebarGroup</code>,{" "}
              <code className="rounded bg-neutral-800 px-1">SidebarItem</code>으로 내비를 구성합니다.
            </li>
            <li>
              AppShellHeader 아래에 <code className="rounded bg-neutral-800 px-1">NavTabs</code>로 섹션 전환을 둡니다.
            </li>
            <li>
              KPI 타일은 <code className="rounded bg-neutral-800 px-1">KPIGrid</code>로 감싸 반응형 1~4열 레이아웃을 맞춥니다.
            </li>
            <li>
              데이터 테이블 위에 <code className="rounded bg-neutral-800 px-1">FilterBar</code>로 빠른 필터를 둡니다.
            </li>
          </ol>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
{`<AppShell>
  <AppShellSidebar>
    <Sidebar>
      <SidebarGroup label="플랫폼">
        <SidebarItem href="/" active>개요</SidebarItem>
        <SidebarItem href="/analytics">분석</SidebarItem>
      </SidebarGroup>
    </Sidebar>
  </AppShellSidebar>
  <AppShellMain>
    <AppShellHeader>
      <NavTabs>
        <NavTabsItem href="/" active>개요</NavTabsItem>
        <NavTabsItem href="/analytics">분석</NavTabsItem>
      </NavTabs>
    </AppShellHeader>
    <AppShellContent>
      <KPIGrid>
        <StatCard label="MRR" value="$52k" trend="up" delta="+4%" />
        <StatCard label="이탈률" value="1.1%" trend="down" delta="-0.4pp" />
      </KPIGrid>
    </AppShellContent>
  </AppShellMain>
</AppShell>`}
        </pre>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">3. 커맨드 팔레트 패턴</h2>
        <p className="text-sm text-neutral-400">
          <strong>컴포넌트:</strong> Command(Dialog) + CommandInput + CommandList + CommandGroup + CommandItem
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">레시피</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              <code className="rounded bg-neutral-800 px-1">Command</code>는 Dialog를 다시보냅니다. 열림/닫힘은{" "}
              <code className="rounded bg-neutral-800 px-1">open</code>과{" "}
              <code className="rounded bg-neutral-800 px-1">onOpenChange</code>로 제어합니다.
            </li>
            <li>
              <code className="rounded bg-neutral-800 px-1">CommandInput</code>은 항상 자동 포커스이며{" "}
              <code className="rounded bg-neutral-800 px-1">type=&quot;search&quot;</code>입니다. 필터링은 제어{" "}
              <code className="rounded bg-neutral-800 px-1">value/onValueChange</code>로 합니다.
            </li>
            <li>
              항목은 <code className="rounded bg-neutral-800 px-1">CommandGroup heading=&quot;...&quot;</code>으로 묶습니다.
              각 <code className="rounded bg-neutral-800 px-1">CommandItem</code>은{" "}
              <code className="rounded bg-neutral-800 px-1">onSelect</code>를 발생시키고{" "}
              <code className="rounded bg-neutral-800 px-1">role=&quot;option&quot;</code>입니다.
            </li>
            <li>
              필터 결과가 없으면 <code className="rounded bg-neutral-800 px-1">CommandEmpty</code>를 표시합니다.
            </li>
          </ol>
        </div>
        <p className="text-sm text-neutral-400">
          <strong>단축키:</strong> 전역에서 <code className="rounded bg-neutral-800 px-1">Cmd+K</code> /{" "}
          <code className="rounded bg-neutral-800 px-1">Ctrl+K</code>로 팔레트를 토글합니다.
        </p>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">4. 테이블 + 페이지네이션 + FilterBar 패턴</h2>
        <p className="text-sm text-neutral-400">
          <strong>컴포넌트:</strong> DataTable + Pagination + FilterBar + FilterChip
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">레시피</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              테이블 위에 <code className="rounded bg-neutral-800 px-1">FilterBar</code>를 둡니다. 각{" "}
              <code className="rounded bg-neutral-800 px-1">FilterChip</code>이 상태·역할·기간 등 필터 차원을 토글합니다.
            </li>
            <li>
              <code className="rounded bg-neutral-800 px-1">DataTable</code>에는 필터된{" "}
              <code className="rounded bg-neutral-800 px-1">data</code>와 TanStack{" "}
              <code className="rounded bg-neutral-800 px-1">columns</code>(ColumnDef)를 넘깁니다.
            </li>
            <li>
              테이블 아래에 <code className="rounded bg-neutral-800 px-1">Pagination</code>을 두고{" "}
              <code className="rounded bg-neutral-800 px-1">page/pageCount/onPageChange</code>를 쿼리 상태에 연결합니다.
            </li>
            <li>
              데이터가 비었을 때는 테이블 대신 <code className="rounded bg-neutral-800 px-1">EmptyState</code>를 렌더합니다.
            </li>
          </ol>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
{`<FilterBar>
  <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>전체</FilterChip>
  <FilterChip active={filter === "active"} onClick={() => setFilter("active")}>활성</FilterChip>
</FilterBar>

{data.length > 0 ? (
  <>
    <DataTable columns={columns} data={data} />
    <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
  </>
) : (
  <EmptyState title="결과 없음" description="필터를 조정해 보세요." />
)}`}
        </pre>
      </section>

      <section className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold text-white">더 많은 패턴</h2>
        <p className="text-sm text-neutral-400">
          개별 컴포넌트 문서는{" "}
          <Link href="/docs/components" className="text-blue-300 underline-offset-2 hover:underline">
            컴포넌트 참고
          </Link>
          를, 여러 패턴이 합쳐진 동작 예시는{" "}
          <Link href="/" className="text-blue-300 underline-offset-2 hover:underline">
            웹 데모
          </Link>
          를 보세요.
        </p>
      </section>
    </>
  );
}
