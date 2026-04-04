import { Alert } from "@repo/ui/alert";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { EmptyState } from "@repo/ui/empty-state";
import { Field } from "@repo/ui/field";
import { Gradient } from "@repo/ui/gradient";
import { Input } from "@repo/ui/input";
import { StatCard } from "@repo/ui/stat-card";
import { DOCS_BASE } from "../lib/config";

export default function Page() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-neutral-800 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Gradient
          className="left-1/2 top-[-280px] h-[560px] w-[560px] -translate-x-1/2 opacity-20"
          conic
        />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Badge className="mb-4" variant="default">
            Workspace · production
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Usage overview</h1>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Example B2B SaaS dashboard built only with <code className="rounded bg-neutral-900 px-1">@repo/ui</code>{" "}
            primitives—stats, filters, alerts, and empty states share one design language.
          </p>
          <div className="mt-8 max-w-xl">
            <Alert title="Billing" variant="info">
              Your trial ends in 9 days. Add a payment method to avoid interruption.
            </Alert>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Metrics</h2>
            <p className="text-sm text-neutral-400">Last 30 days · All regions</p>
          </div>
          <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-end" noValidate>
            <Field className="sm:flex-1" id="dashboard-search" label="Filter events">
              <Input name="eventFilter" placeholder="Search by user or event…" type="search" />
            </Field>
            <Button name="applyFilter" type="submit" variant="primary">
              Apply
            </Button>
          </form>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard delta="+6.1% vs prior period" label="MRR" trend="up" value="$48.2k" />
          <StatCard delta="-0.2pp" label="Churn" trend="up" value="1.0%" />
          <StatCard delta="+128" label="Active seats" trend="up" value="1,842" />
          <StatCard delta="Flat" label="NPS" trend="neutral" value="44" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-white">Integrations &amp; resources</h2>
        <p className="mt-1 text-sm text-neutral-400">
          Link cards use the same UI kit; external links open in a new tab.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card href={`${DOCS_BASE}/docs/components`} title="Component reference">
                Browse @repo/ui APIs, a11y notes, and examples in the docs app.
              </Card>
              <Card href={`${DOCS_BASE}/docs/foundations`} title="Foundations">
                Semantic tokens, surfaces, and feedback colors used across the kit.
              </Card>
            </div>
          </div>
          <EmptyState
            action={
              <Button name="connect-slack" variant="primary">
                Connect Slack
              </Button>
            }
            description="Get alerts in-channel when usage spikes or limits approach."
            title="No chat notifications"
          />
        </div>
      </section>
    </div>
  );
}
