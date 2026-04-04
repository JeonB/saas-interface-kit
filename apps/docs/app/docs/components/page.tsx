import { Alert } from "@repo/ui/alert";
import { Avatar } from "@repo/ui/avatar";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/card";
import { LinkCard } from "@repo/ui/link-card";
import { EmptyState } from "@repo/ui/empty-state";
import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import { StatCard } from "@repo/ui/stat-card";
import { Textarea } from "@repo/ui/textarea";

export default function ComponentReferencePage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white">Component reference</h1>
      <p className="mt-2 text-neutral-400">
        Usage, accessibility notes, and examples for <code className="rounded bg-neutral-800 px-1">@repo/ui</code>{" "}
        (B2B SaaS-oriented).
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

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Button</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> primary actions, form submits, destructive confirmations.{" "}
          <strong>A11y:</strong> native <code className="rounded bg-neutral-800 px-1">button</code>; use explicit{" "}
          <code className="rounded bg-neutral-800 px-1">type=&quot;submit&quot;</code> in forms.{" "}
          <strong>Do:</strong> choose <code className="rounded bg-neutral-800 px-1">variant</code> for meaning,{" "}
          <code className="rounded bg-neutral-800 px-1">size</code> for density. <strong>Don&apos;t:</strong> encode new
          meanings via huge <code className="rounded bg-neutral-800 px-1">className</code> padding overrides.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Button } from "@repo/ui/button";`}
        </pre>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button name="demo-default" variant="default">
            Default
          </Button>
          <Button name="demo-primary" variant="primary">
            Primary
          </Button>
          <Button name="demo-danger" variant="danger">
            Danger
          </Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Input &amp; Textarea</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> filters, settings, and record forms. <strong>A11y:</strong> always expose an accessible
          name (<code className="rounded bg-neutral-800 px-1">label</code> via <code className="rounded bg-neutral-800 px-1">Field</code> or{" "}
          <code className="rounded bg-neutral-800 px-1">aria-label</code>). <strong>Do:</strong> set{" "}
          <code className="rounded bg-neutral-800 px-1">name</code> on every field. <strong>Don&apos;t:</strong> rely on
          placeholder alone as the only label.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Field } from "@repo/ui/field";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";`}
        </pre>
        <div className="mt-4 max-w-md space-y-4">
          <Field hint="Used in notifications." id="docs-project" label="Project name">
            <Input name="project" placeholder="Analytics API" />
          </Field>
          <Field id="docs-notes" label="Notes">
            <Textarea name="notes" placeholder="Optional context…" rows={3} />
          </Field>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Field</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> one labeled control with optional hint or error. <strong>A11y:</strong> wires{" "}
          <code className="rounded bg-neutral-800 px-1">htmlFor</code>/<code className="rounded bg-neutral-800 px-1">id</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">aria-describedby</code>, and{" "}
          <code className="rounded bg-neutral-800 px-1">aria-invalid</code>. <strong>Do:</strong> pass a single input
          child. <strong>Don&apos;t:</strong> nest multiple controls inside one Field.
        </p>
        <div className="mt-4 max-w-md">
          <Field error="This field is required." id="docs-error-demo" label="Workspace">
            <Input name="workspace" />
          </Field>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">StatCard</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> KPI tiles on dashboards. <strong>A11y:</strong> structured as text; keep labels short.
          <strong>Do:</strong> use <code className="rounded bg-neutral-800 px-1">trend</code> for delta semantics.{" "}
          <strong>Don&apos;t:</strong> overload with charts—link to a detail view instead.
        </p>
        <div className="mt-4 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard delta="+4.2%" label="MRR" trend="up" value="$52.1k" />
          <StatCard delta="-0.4pp" label="Churn" trend="down" value="1.1%" />
          <StatCard delta="—" label="Active orgs" trend="neutral" value="86" />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">EmptyState</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> zero-state panels in tables or overview sections. <strong>A11y:</strong> headings are
          plain text; place actions as real <code className="rounded bg-neutral-800 px-1">Button</code> elements.{" "}
          <strong>Do:</strong> offer one clear CTA. <strong>Don&apos;t:</strong> hide critical navigation only inside the
          empty state.
        </p>
        <div className="mt-4 max-w-lg">
          <EmptyState
            action={
              <Button name="docs-invite" variant="primary">
                Invite teammate
              </Button>
            }
            description="Invite colleagues to collaborate on this workspace."
            title="No members yet"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Badge</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> status and metadata chips. <strong>A11y:</strong> text is exposed as span content—keep
          labels concise. Semantic colors map to design tokens (<code className="rounded bg-neutral-800 px-1">success</code>{" "}
          uses success feedback color).
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Badge } from "@repo/ui/badge";`}
        </pre>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Avatar</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> user or org identity. <strong>A11y:</strong> image uses <code className="rounded bg-neutral-800 px-1">alt</code>; fallback uses{" "}
          <code className="rounded bg-neutral-800 px-1">role=&quot;img&quot;</code> and <code className="rounded bg-neutral-800 px-1">aria-label</code>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Avatar } from "@repo/ui/avatar";`}
        </pre>
        <div className="mt-4 flex items-center gap-2">
          <Avatar fallback="AB" size="sm" />
          <Avatar fallback="CD" size="md" />
          <Avatar fallback="EF" size="lg" />
          <Avatar alt="Vercel" size="md" src="https://github.com/vercel.png" />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">LinkCard</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> link tiles to external resources or routes. <strong>A11y:</strong> single anchor with
          heading + description. External URLs open in a new tab with <code className="rounded bg-neutral-800 px-1">rel</code>{" "}
          set appropriately.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { LinkCard } from "@repo/ui/link-card";`}
        </pre>
        <div className="mt-4 max-w-[280px]">
          <LinkCard href="https://turborepo.com/docs" title="Documentation">
            Find in-depth information about Turborepo.
          </LinkCard>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Card (compound)</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> generic panels and summaries. Compose <code className="rounded bg-neutral-800 px-1">CardHeader</code>,{" "}
          <code className="rounded bg-neutral-800 px-1">CardBody</code>, and <code className="rounded bg-neutral-800 px-1">CardFooter</code>.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Card, CardBody, CardFooter, CardHeader, CardTitle } from "@repo/ui/card";`}
        </pre>
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
              <Button name="card-details" variant="primary">
                View trace
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Alert</h2>
        <p className="mt-2 text-sm text-neutral-400">
          <strong>Usage:</strong> inline messages, validation summaries, system notices. <strong>A11y:</strong>{" "}
          <code className="rounded bg-neutral-800 px-1">role=&quot;alert&quot;</code>. <code className="rounded bg-neutral-800 px-1">success</code> and{" "}
          <code className="rounded bg-neutral-800 px-1">info</code> are visually distinct via semantic tokens.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Alert } from "@repo/ui/alert";`}
        </pre>
        <div className="mt-4 max-w-md space-y-2">
          <Alert title="Info" variant="info">
            General information message.
          </Alert>
          <Alert variant="success">Operation completed.</Alert>
          <Alert title="Warning" variant="warning">
            Please review before continuing.
          </Alert>
          <Alert variant="error">An error occurred.</Alert>
        </div>
      </section>
    </>
  );
}
