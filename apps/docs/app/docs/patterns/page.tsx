import { Badge } from "@repo/ui/badge";
import Link from "next/link";

export default function PatternsPage() {
  return (
    <>
      <Badge className="mb-4" variant="default">
        Patterns
      </Badge>
      <h1 className="text-3xl font-bold text-white">Composition patterns</h1>
      <p className="mt-2 text-neutral-400">
        Real-world recipes that combine <code className="rounded bg-neutral-800 px-1">@repo/ui</code> components into
        production-ready features. Each pattern shows the components involved, their wiring, and a11y considerations.
      </p>

      {/* ── Pattern 1: Form ────────────────────────────────── */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">1. Form pattern</h2>
        <p className="text-sm text-neutral-400">
          <strong>Components:</strong> Field + Input / Textarea / Select / Checkbox + Button
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">Recipe</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              Wrap each control with <code className="rounded bg-neutral-800 px-1">Field</code> — it handles{" "}
              <code className="rounded bg-neutral-800 px-1">htmlFor/id</code>,{" "}
              <code className="rounded bg-neutral-800 px-1">aria-describedby</code>, and{" "}
              <code className="rounded bg-neutral-800 px-1">aria-invalid</code> automatically.
            </li>
            <li>
              Pass <code className="rounded bg-neutral-800 px-1">error</code> prop to Field for validation messages.
              The child input receives <code className="rounded bg-neutral-800 px-1">aria-invalid=&quot;true&quot;</code>.
            </li>
            <li>
              Always set <code className="rounded bg-neutral-800 px-1">name</code> on every form element —
              required for form data, analytics, and the &quot;form field should have an id or name&quot; warning.
            </li>
            <li>
              Use <code className="rounded bg-neutral-800 px-1">Button type=&quot;submit&quot;</code> inside{" "}
              <code className="rounded bg-neutral-800 px-1">&lt;form&gt;</code>. Outside forms, default{" "}
              <code className="rounded bg-neutral-800 px-1">type=&quot;button&quot;</code> prevents accidental submits.
            </li>
          </ol>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
{`<form onSubmit={handleSubmit}>
  <Field id="name" label="Project name" error={errors.name}>
    <Input name="name" placeholder="Analytics API" />
  </Field>
  <Field id="desc" label="Description" hint="Optional">
    <Textarea name="desc" rows={3} />
  </Field>
  <Button type="submit" variant="primary" name="createProject">
    Create project
  </Button>
</form>`}
        </pre>
        <p className="text-sm text-neutral-400">
          <strong>A11y:</strong> screen readers announce &quot;Project name, required, invalid: [error message]&quot;
          when validation fails. No extra ARIA wiring needed.
        </p>
      </section>

      {/* ── Pattern 2: Dashboard ───────────────────────────── */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">2. Dashboard pattern</h2>
        <p className="text-sm text-neutral-400">
          <strong>Components:</strong> AppShell + Sidebar + NavTabs + KPIGrid + StatCard / MetricCard + FilterBar
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">Recipe</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              <code className="rounded bg-neutral-800 px-1">AppShell</code> provides the grid shell. Place{" "}
              <code className="rounded bg-neutral-800 px-1">AppShellSidebar</code> for the left rail and{" "}
              <code className="rounded bg-neutral-800 px-1">AppShellMain</code> for the content area.
            </li>
            <li>
              Inside AppShellSidebar, use <code className="rounded bg-neutral-800 px-1">Sidebar</code> with{" "}
              <code className="rounded bg-neutral-800 px-1">SidebarGroup</code> and{" "}
              <code className="rounded bg-neutral-800 px-1">SidebarItem</code> for nav.
            </li>
            <li>
              Use <code className="rounded bg-neutral-800 px-1">NavTabs</code> below AppShellHeader for section switching.
            </li>
            <li>
              Wrap KPI tiles in <code className="rounded bg-neutral-800 px-1">KPIGrid</code> — it handles responsive
              1-to-4 column layout.
            </li>
            <li>
              Add <code className="rounded bg-neutral-800 px-1">FilterBar</code> above data tables for quick filtering.
            </li>
          </ol>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
{`<AppShell>
  <AppShellSidebar>
    <Sidebar>
      <SidebarGroup label="Platform">
        <SidebarItem href="/" active>Overview</SidebarItem>
        <SidebarItem href="/analytics">Analytics</SidebarItem>
      </SidebarGroup>
    </Sidebar>
  </AppShellSidebar>
  <AppShellMain>
    <AppShellHeader>
      <NavTabs>
        <NavTabsItem href="/" active>Overview</NavTabsItem>
        <NavTabsItem href="/analytics">Analytics</NavTabsItem>
      </NavTabs>
    </AppShellHeader>
    <AppShellContent>
      <KPIGrid>
        <StatCard label="MRR" value="$52k" trend="up" delta="+4%" />
        <StatCard label="Churn" value="1.1%" trend="down" delta="-0.4pp" />
      </KPIGrid>
    </AppShellContent>
  </AppShellMain>
</AppShell>`}
        </pre>
      </section>

      {/* ── Pattern 3: Command Palette ─────────────────────── */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">3. Command palette pattern</h2>
        <p className="text-sm text-neutral-400">
          <strong>Components:</strong> Command (Dialog) + CommandInput + CommandList + CommandGroup + CommandItem
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">Recipe</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              <code className="rounded bg-neutral-800 px-1">Command</code> re-exports Dialog. Open/close state is
              controlled via <code className="rounded bg-neutral-800 px-1">open</code> and{" "}
              <code className="rounded bg-neutral-800 px-1">onOpenChange</code>.
            </li>
            <li>
              <code className="rounded bg-neutral-800 px-1">CommandInput</code> is always autoFocused and{" "}
              <code className="rounded bg-neutral-800 px-1">type=&quot;search&quot;</code>. Use controlled{" "}
              <code className="rounded bg-neutral-800 px-1">value/onValueChange</code> for filtering.
            </li>
            <li>
              Group items with <code className="rounded bg-neutral-800 px-1">CommandGroup heading=&quot;...&quot;</code>.
              Each <code className="rounded bg-neutral-800 px-1">CommandItem</code> fires{" "}
              <code className="rounded bg-neutral-800 px-1">onSelect</code> and is <code className="rounded bg-neutral-800 px-1">role=&quot;option&quot;</code>.
            </li>
            <li>
              Show <code className="rounded bg-neutral-800 px-1">CommandEmpty</code> when no results match the filter.
            </li>
          </ol>
        </div>
        <p className="text-sm text-neutral-400">
          <strong>Keyboard shortcut:</strong> bind <code className="rounded bg-neutral-800 px-1">Cmd+K</code> /
          <code className="rounded bg-neutral-800 px-1">Ctrl+K</code> globally to toggle the palette.
        </p>
      </section>

      {/* ── Pattern 4: Table ───────────────────────────────── */}
      <section className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold text-white">4. Table + Pagination + FilterBar pattern</h2>
        <p className="text-sm text-neutral-400">
          <strong>Components:</strong> DataTable + Pagination + FilterBar + FilterChip
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
          <h3 className="text-sm font-semibold text-white">Recipe</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-neutral-300">
            <li>
              Place <code className="rounded bg-neutral-800 px-1">FilterBar</code> above the table. Each{" "}
              <code className="rounded bg-neutral-800 px-1">FilterChip</code> toggles a filter dimension
              (status, role, date range).
            </li>
            <li>
              <code className="rounded bg-neutral-800 px-1">DataTable</code> receives filtered{" "}
              <code className="rounded bg-neutral-800 px-1">data</code> and{" "}
              <code className="rounded bg-neutral-800 px-1">columns</code> (TanStack ColumnDef).
            </li>
            <li>
              Place <code className="rounded bg-neutral-800 px-1">Pagination</code> below the table.
              Wire <code className="rounded bg-neutral-800 px-1">page/pageCount/onPageChange</code> to your
              query state.
            </li>
            <li>
              For empty state, render <code className="rounded bg-neutral-800 px-1">EmptyState</code> when data
              is empty instead of the table.
            </li>
          </ol>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
{`<FilterBar>
  <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>All</FilterChip>
  <FilterChip active={filter === "active"} onClick={() => setFilter("active")}>Active</FilterChip>
</FilterBar>

{data.length > 0 ? (
  <>
    <DataTable columns={columns} data={data} />
    <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
  </>
) : (
  <EmptyState title="No results" description="Try adjusting your filters." />
)}`}
        </pre>
      </section>

      {/* ── Next Steps ─────────────────────────────────────── */}
      <section className="mt-12 space-y-3">
        <h2 className="text-xl font-semibold text-white">More patterns</h2>
        <p className="text-sm text-neutral-400">
          Browse the{" "}
          <Link href="/docs/components" className="text-blue-300 underline-offset-2 hover:underline">
            component reference
          </Link>{" "}
          for individual component documentation, or see the live{" "}
          <Link href="/" className="text-blue-300 underline-offset-2 hover:underline">
            web demo
          </Link>{" "}
          for a working dashboard that combines many of these patterns.
        </p>
      </section>
    </>
  );
}
