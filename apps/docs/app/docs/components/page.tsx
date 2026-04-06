import { Alert } from "@repo/ui/alert";
import { AlertBanner } from "@repo/ui/alert-banner";
import { Avatar } from "@repo/ui/avatar";
import { AvatarGroup } from "@repo/ui/avatar-group";
import { Badge } from "@repo/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@repo/ui/breadcrumb";
import { Button } from "@repo/ui/button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/card";
import { EmptyState } from "@repo/ui/empty-state";
import { Field } from "@repo/ui/field";
import { FilterBar, FilterChip } from "@repo/ui/filter-bar";
import { Input } from "@repo/ui/input";
import { LinkCard } from "@repo/ui/link-card";
import { NavTabs, NavTabsItem } from "@repo/ui/nav-tabs";
import { Separator } from "@repo/ui/separator";
import { Skeleton } from "@repo/ui/skeleton";
import { Spinner } from "@repo/ui/spinner";
import { StatCard } from "@repo/ui/stat-card";
import { StatusIndicator } from "@repo/ui/status-indicator";
import { Textarea } from "@repo/ui/textarea";

export default function ComponentReferencePage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white">Component reference</h1>
      <p className="mt-2 text-neutral-400">
        Usage, accessibility notes, and examples for <code className="rounded bg-neutral-800 px-1">@repo/ui</code>{" "}
        (B2B SaaS-oriented). Components are grouped by role.
      </p>
      <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
        <h2 className="text-sm font-semibold text-white">Documentation template</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-300">
          <li>
            <strong>Usage:</strong> when to use vs. plain HTML or app-level layout
          </li>
          <li>
            <strong>A11y:</strong> roles, labels, keyboard, and what the component guarantees
          </li>
          <li>
            <strong>Do / Don&apos;t:</strong> API-first patterns; avoid token drift via ad-hoc classes
          </li>
        </ul>
      </div>

      {/* ── Form ──────────────────────────────────────────── */}
      <h2 className="mt-14 border-b border-neutral-800 pb-2 text-2xl font-bold text-white">Form</h2>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-white">Button</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> primary actions, form submits, destructive confirmations.{" "}
          <strong>A11y:</strong> native <code className="rounded bg-neutral-800 px-1">button</code>; use explicit{" "}
          <code className="rounded bg-neutral-800 px-1">type=&quot;submit&quot;</code> in forms.{" "}
          <strong>Do:</strong> choose <code className="rounded bg-neutral-800 px-1">variant</code> for meaning,{" "}
          <code className="rounded bg-neutral-800 px-1">size</code> for density.{" "}
          <strong>Don&apos;t:</strong> override spacing with large <code className="rounded bg-neutral-800 px-1">className</code> paddings.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button name="demo-default" variant="default">Default</Button>
          <Button name="demo-primary" variant="primary">Primary</Button>
          <Button name="demo-danger" variant="danger">Danger</Button>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Input &amp; Textarea</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> filters, settings, and record forms.{" "}
          <strong>A11y:</strong> always expose an accessible name via <code className="rounded bg-neutral-800 px-1">Field</code> or{" "}
          <code className="rounded bg-neutral-800 px-1">aria-label</code>.{" "}
          <strong>Do:</strong> set <code className="rounded bg-neutral-800 px-1">name</code> on every field.{" "}
          <strong>Don&apos;t:</strong> rely on placeholder as the only label.
        </p>
        <div className="mt-4 max-w-md space-y-4">
          <Field hint="Used in notifications." id="docs-project" label="Project name">
            <Input name="project" placeholder="Analytics API" />
          </Field>
          <Field id="docs-notes" label="Notes">
            <Textarea name="notes" placeholder="Optional context…" rows={3} />
          </Field>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Field</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> one labeled control with optional hint or error.{" "}
          <strong>A11y:</strong> wires <code className="rounded bg-neutral-800 px-1">htmlFor/id</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">aria-describedby</code>, and{" "}
          <code className="rounded bg-neutral-800 px-1">aria-invalid</code>.{" "}
          <strong>Do:</strong> pass a single input child.{" "}
          <strong>Don&apos;t:</strong> nest multiple controls inside one Field.
        </p>
        <div className="mt-4 max-w-md">
          <Field error="This field is required." id="docs-error-demo" label="Workspace">
            <Input name="workspace" />
          </Field>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Select</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> native dropdown for short option lists.{" "}
          <strong>A11y:</strong> built-in keyboard and screen reader support.{" "}
          <strong>Do:</strong> always provide <code className="rounded bg-neutral-800 px-1">name</code> and label.{" "}
          <strong>Don&apos;t:</strong> use for 15+ options — consider Command palette.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Checkbox &amp; RadioGroup</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> Checkbox for multi-select toggles; RadioGroup for exclusive single-select.{" "}
          <strong>A11y:</strong> native inputs with <code className="rounded bg-neutral-800 px-1">label</code> association;{" "}
          RadioGroup has <code className="rounded bg-neutral-800 px-1">role=&quot;radiogroup&quot;</code>.{" "}
          <strong>Do:</strong> provide unique <code className="rounded bg-neutral-800 px-1">id</code> per item.{" "}
          <strong>Don&apos;t:</strong> use Checkbox for instant boolean toggles — use Switch instead.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Switch</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> instant boolean toggles (feature flags, preferences).{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">role=&quot;switch&quot;</code> with{" "}
          <code className="rounded bg-neutral-800 px-1">aria-checked</code>; focus ring; disabled state.{" "}
          <strong>Do:</strong> pair with a label.{" "}
          <strong>Don&apos;t:</strong> use inside forms where Checkbox is more appropriate.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">FilterBar &amp; FilterChip</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> horizontal filter bar with toggle-able chips.{" "}
          <strong>A11y:</strong> chips are buttons with focus ring.{" "}
          <strong>Do:</strong> manage active state externally.{" "}
          <strong>Don&apos;t:</strong> use for navigation — use NavTabs.
        </p>
        <div className="mt-4">
          <FilterBar>
            <FilterChip active>All</FilterChip>
            <FilterChip>Active</FilterChip>
            <FilterChip>Paused</FilterChip>
          </FilterBar>
        </div>
      </section>

      {/* ── Data Display ──────────────────────────────────── */}
      <h2 className="mt-14 border-b border-neutral-800 pb-2 text-2xl font-bold text-white">Data Display</h2>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-white">StatCard &amp; MetricCard</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> KPI tiles on dashboards. MetricCard extends StatCard with chart slot and comparison label.{" "}
          <strong>A11y:</strong> structured as text; keep labels short.{" "}
          <strong>Do:</strong> use <code className="rounded bg-neutral-800 px-1">trend</code> for delta semantics.{" "}
          <strong>Don&apos;t:</strong> overload with charts — link to detail view.
        </p>
        <div className="mt-4 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard delta="+4.2%" label="MRR" trend="up" value="$52.1k" />
          <StatCard delta="-0.4pp" label="Churn" trend="down" value="1.1%" />
          <StatCard delta="—" label="Active orgs" trend="neutral" value="86" />
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">DataTable</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> headless table shell powered by TanStack Table.{" "}
          <strong>A11y:</strong> semantic <code className="rounded bg-neutral-800 px-1">&lt;table&gt;</code> with{" "}
          <code className="rounded bg-neutral-800 px-1">&lt;th scope=&quot;col&quot;&gt;</code>.{" "}
          <strong>Do:</strong> define columns with TanStack ColumnDef.{" "}
          <strong>Don&apos;t:</strong> add inline sorting — extend with TanStack sorting model.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Badge</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> status and metadata chips. Semantic colors map to design tokens.{" "}
          <strong>A11y:</strong> text exposed as span content.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">StatusIndicator</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> colored dot + label for system health.{" "}
          <strong>A11y:</strong> dot is <code className="rounded bg-neutral-800 px-1">aria-hidden</code>; label conveys meaning.{" "}
          <strong>Do:</strong> use standard states (<code className="rounded bg-neutral-800 px-1">online</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">degraded</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">offline</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">maintenance</code>).
        </p>
        <div className="mt-4 flex flex-wrap gap-6">
          <StatusIndicator state="online" label="Operational" />
          <StatusIndicator state="degraded" label="Degraded" />
          <StatusIndicator state="offline" label="Down" />
          <StatusIndicator state="maintenance" label="Maintenance" />
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Skeleton &amp; Spinner</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> Skeleton for content-shaped loading; Spinner for indeterminate loading.{" "}
          <strong>A11y:</strong> Skeleton is <code className="rounded bg-neutral-800 px-1">aria-hidden</code>;{" "}
          Spinner uses <code className="rounded bg-neutral-800 px-1">role=&quot;status&quot;</code> with{" "}
          <code className="rounded bg-neutral-800 px-1">aria-label</code>.{" "}
          Set <code className="rounded bg-neutral-800 px-1">decorative</code> on Spinner when inside a busy button.
        </p>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton width="200px" height="14px" />
            <Skeleton width="140px" height="14px" />
          </div>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Timeline</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> vertical activity feed with connector lines and optional icons.{" "}
          <strong>A11y:</strong> semantic <code className="rounded bg-neutral-800 px-1">&lt;ul&gt;/&lt;li&gt;</code>.{" "}
          <strong>Do:</strong> use <code className="rounded bg-neutral-800 px-1">time</code> prop for timestamps.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">EmptyState</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> zero-state panels in tables or overview sections.{" "}
          <strong>A11y:</strong> plain text headings; place actions as real Button elements.{" "}
          <strong>Do:</strong> offer one clear CTA.
        </p>
        <div className="mt-4 max-w-lg">
          <EmptyState
            action={<Button name="docs-invite" variant="primary">Invite teammate</Button>}
            description="Invite colleagues to collaborate on this workspace."
            title="No members yet"
          />
        </div>
      </section>

      {/* ── Layout ────────────────────────────────────────── */}
      <h2 className="mt-14 border-b border-neutral-800 pb-2 text-2xl font-bold text-white">Layout</h2>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-white">Card (compound)</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> generic panels and summaries. Compose{" "}
          <code className="rounded bg-neutral-800 px-1">CardHeader</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">CardBody</code>, and{" "}
          <code className="rounded bg-neutral-800 px-1">CardFooter</code>.
        </p>
        <div className="mt-4 max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>API latency</CardTitle>
              <CardDescription>P95 over the last hour</CardDescription>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-neutral-300">124 ms — within SLO.</p>
            </CardBody>
            <CardFooter>
              <Button name="card-details" variant="primary">View trace</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">AppShell</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> top-level layout shell for SaaS dashboards.{" "}
          <strong>A11y:</strong> sidebar renders as <code className="rounded bg-neutral-800 px-1">&lt;aside&gt;</code>,{" "}
          header as <code className="rounded bg-neutral-800 px-1">&lt;header&gt;</code>,{" "}
          content as <code className="rounded bg-neutral-800 px-1">&lt;main&gt;</code>.{" "}
          <strong>Do:</strong> compose with Sidebar and NavTabs.{" "}
          <strong>Don&apos;t:</strong> nest AppShell inside another AppShell.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">KPIGrid</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> responsive grid for KPI cards (1-column mobile to 4-column desktop).{" "}
          <strong>Do:</strong> fill with StatCard or MetricCard.{" "}
          <strong>Don&apos;t:</strong> mix non-metric content inside.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Separator</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> visual divider between sections.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">role=&quot;separator&quot;</code> with{" "}
          <code className="rounded bg-neutral-800 px-1">aria-orientation</code>.
        </p>
        <div className="mt-4 max-w-xs">
          <p className="text-sm text-neutral-300">Section A</p>
          <Separator className="my-3" />
          <p className="text-sm text-neutral-300">Section B</p>
        </div>
      </section>

      {/* ── Navigation ────────────────────────────────────── */}
      <h2 className="mt-14 border-b border-neutral-800 pb-2 text-2xl font-bold text-white">Navigation</h2>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-white">Sidebar</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> vertical navigation panel with grouped links.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">&lt;nav aria-label=&quot;Main&quot;&gt;</code>.{" "}
          <strong>Do:</strong> use SidebarGroup for logical sections.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">NavTabs</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> horizontal anchor-based navigation tabs.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">&lt;nav aria-label=&quot;Sections&quot;&gt;</code>.{" "}
          <strong>Do:</strong> use for page-level route switching.{" "}
          <strong>Don&apos;t:</strong> confuse with Tabs (controlled tab panels).
        </p>
        <div className="mt-4">
          <NavTabs>
            <NavTabsItem href="#" active>Overview</NavTabsItem>
            <NavTabsItem href="#">Analytics</NavTabsItem>
            <NavTabsItem href="#">Settings</NavTabsItem>
          </NavTabs>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Tabs</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> controlled tab panels for in-page content switching.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">role=&quot;tablist&quot;</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">role=&quot;tab&quot;</code> with{" "}
          <code className="rounded bg-neutral-800 px-1">aria-selected</code>;{" "}
          ArrowLeft/ArrowRight keyboard navigation.{" "}
          <strong>Don&apos;t:</strong> confuse with NavTabs (route-based).
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Breadcrumb</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> breadcrumb trail for hierarchical navigation.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;</code>{" "}
          with <code className="rounded bg-neutral-800 px-1">&lt;ol&gt;</code>; separators are{" "}
          <code className="rounded bg-neutral-800 px-1">aria-hidden</code>.
        </p>
        <div className="mt-4">
          <Breadcrumb>
            <BreadcrumbItem><span className="text-neutral-400">Home</span></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><span className="text-neutral-400">Projects</span></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><span className="text-white">Analytics API</span></BreadcrumbItem>
          </Breadcrumb>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Pagination</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> Previous/Next pagination with page indicator.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">&lt;nav aria-label=&quot;Pagination&quot;&gt;</code>;{" "}
          buttons disable at bounds.{" "}
          <strong>Do:</strong> pair with DataTable.
        </p>
      </section>

      {/* ── Feedback ──────────────────────────────────────── */}
      <h2 className="mt-14 border-b border-neutral-800 pb-2 text-2xl font-bold text-white">Feedback</h2>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-white">Alert</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> inline messages, validation summaries, system notices.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">role=&quot;alert&quot;</code>.
        </p>
        <div className="mt-4 max-w-md space-y-2">
          <Alert title="Info" variant="info">General information.</Alert>
          <Alert variant="success">Operation completed.</Alert>
          <Alert title="Warning" variant="warning">Review before continuing.</Alert>
          <Alert variant="error">An error occurred.</Alert>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">AlertBanner</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> full-width banner for system-level notices.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">role=&quot;alert&quot;</code>;{" "}
          dismiss button has <code className="rounded bg-neutral-800 px-1">aria-label=&quot;Dismiss banner&quot;</code>.{" "}
          <strong>Do:</strong> place at top of page, outside AppShell.{" "}
          <strong>Don&apos;t:</strong> stack multiple banners.
        </p>
        <div className="mt-4">
          <AlertBanner variant="warning" title="Maintenance">
            Platform will be briefly unavailable on Sunday 2:00 AM UTC.
          </AlertBanner>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Dialog</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> modal dialog using native <code className="rounded bg-neutral-800 px-1">&lt;dialog&gt;</code>.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">aria-labelledby</code> from DialogTitle;{" "}
          Escape closes via cancel event.{" "}
          <strong>Do:</strong> always include DialogTitle.{" "}
          <strong>Don&apos;t:</strong> stack multiple dialogs.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Toast</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> ephemeral notifications via context provider (auto-dismiss 4.5s).{" "}
          <strong>A11y:</strong> region is <code className="rounded bg-neutral-800 px-1">aria-live=&quot;polite&quot;</code>;{" "}
          each toast is <code className="rounded bg-neutral-800 px-1">role=&quot;status&quot;</code>.{" "}
          <strong>Don&apos;t:</strong> use for critical blocking errors — use Dialog or Alert.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Tooltip</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> hover/focus tooltip using Floating UI.{" "}
          <strong>A11y:</strong> <code className="rounded bg-neutral-800 px-1">role=&quot;tooltip&quot;</code>;{" "}
          shows on hover (120ms delay) and focus; Escape dismisses.{" "}
          <strong>Don&apos;t:</strong> put interactive elements inside tooltip content.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">DropdownMenu</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> click-triggered dropdown with <code className="rounded bg-neutral-800 px-1">role=&quot;menu&quot;</code>.{" "}
          <strong>A11y:</strong> trigger sets <code className="rounded bg-neutral-800 px-1">aria-expanded</code> and{" "}
          <code className="rounded bg-neutral-800 px-1">aria-haspopup=&quot;menu&quot;</code>;{" "}
          items are <code className="rounded bg-neutral-800 px-1">role=&quot;menuitem&quot;</code> buttons.{" "}
          <strong>Don&apos;t:</strong> nest dropdowns.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">Command</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> command palette (Dialog + searchable list).{" "}
          <strong>A11y:</strong> input is <code className="rounded bg-neutral-800 px-1">type=&quot;search&quot;</code>;{" "}
          items are <code className="rounded bg-neutral-800 px-1">role=&quot;option&quot;</code> inside{" "}
          <code className="rounded bg-neutral-800 px-1">role=&quot;listbox&quot;</code>.{" "}
          <strong>Don&apos;t:</strong> use for simple select — use Select or RadioGroup.
        </p>
      </section>

      {/* ── Identity ──────────────────────────────────────── */}
      <h2 className="mt-14 border-b border-neutral-800 pb-2 text-2xl font-bold text-white">Identity</h2>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-white">Avatar &amp; AvatarGroup</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> user or org identity.{" "}
          <strong>A11y:</strong> image uses <code className="rounded bg-neutral-800 px-1">alt</code>; fallback uses{" "}
          <code className="rounded bg-neutral-800 px-1">role=&quot;img&quot;</code> with{" "}
          <code className="rounded bg-neutral-800 px-1">aria-label</code>.{" "}
          AvatarGroup overflow chip has <code className="rounded bg-neutral-800 px-1">aria-label=&quot;+N more&quot;</code>.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <Avatar fallback="AB" size="sm" />
          <Avatar fallback="CD" size="md" />
          <Avatar fallback="EF" size="lg" />
          <AvatarGroup max={3}>
            <Avatar fallback="A" size="md" />
            <Avatar fallback="B" size="md" />
            <Avatar fallback="C" size="md" />
            <Avatar fallback="D" size="md" />
            <Avatar fallback="E" size="md" />
          </AvatarGroup>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">LinkCard</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> link tiles to external resources or routes.{" "}
          <strong>A11y:</strong> single anchor with heading + description. External URLs open in new tab with{" "}
          <code className="rounded bg-neutral-800 px-1">rel</code> set.
        </p>
        <div className="mt-4 max-w-[280px]">
          <LinkCard href="https://turborepo.com/docs" title="Documentation">
            Find in-depth information about Turborepo.
          </LinkCard>
        </div>
      </section>

      {/* ── Utility ───────────────────────────────────────── */}
      <h2 className="mt-14 border-b border-neutral-800 pb-2 text-2xl font-bold text-white">Utility</h2>

      <section className="mt-8">
        <h3 className="text-xl font-semibold text-white">VisuallyHidden</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> hides content visually while keeping it accessible to screen readers.{" "}
          <strong>Do:</strong> use for skip links, icon-only button labels, or extra context.{" "}
          <strong>Don&apos;t:</strong> use to hide decorative content — use{" "}
          <code className="rounded bg-neutral-800 px-1">aria-hidden</code> instead.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="text-xl font-semibold text-white">CommandBar</h3>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> inline search bar container with{" "}
          <code className="rounded bg-neutral-800 px-1">role=&quot;search&quot;</code>.{" "}
          <strong>Do:</strong> compose with Input and FilterChip.{" "}
          <strong>Don&apos;t:</strong> use as form — use a <code className="rounded bg-neutral-800 px-1">&lt;form&gt;</code> element.
        </p>
      </section>
    </>
  );
}
