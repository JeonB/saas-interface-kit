import { Badge } from "@repo/ui/badge";
import Link from "next/link";

export default function FoundationsPage() {
  return (
    <>
      <Badge className="mb-4" variant="default">
        Foundations
      </Badge>
      <h1 className="text-3xl font-bold text-white">Design foundations</h1>
      <p className="mt-2 text-neutral-400">
        Tokens and naming conventions that power <code className="rounded bg-neutral-800 px-1 py-0.5">@repo/ui</code>.
        Components consume semantic roles so product surfaces stay consistent.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Where tokens live</h2>
        <ul className="list-disc space-y-2 pl-6 text-sm text-neutral-300">
          <li>
            <code className="rounded bg-neutral-900 px-1">packages/tailwind-config/shared-styles.css</code> —{" "}
            <code className="rounded bg-neutral-900 px-1">@theme</code> definitions (colors, radius, spacing, typography).
          </li>
          <li>
            <code className="rounded bg-neutral-900 px-1">packages/ui/src/styles.css</code> — imports Tailwind with the{" "}
            <code className="rounded bg-neutral-900 px-1">ui:</code> prefix for the component library.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Semantic tokens</h2>
        <p className="text-sm text-neutral-300">
          <code className="rounded bg-neutral-900 px-1">@repo/ui</code> uses the{" "}
          <code className="rounded bg-neutral-900 px-1">ui:</code> prefix. Utilities map to{" "}
          <code className="rounded bg-neutral-900 px-1">@theme</code> variables, for example:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-neutral-400">
          <li>
            <strong className="text-neutral-300">Feedback:</strong>{" "}
            <code className="rounded bg-neutral-900 px-1">semantic-brand</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">semantic-success</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">semantic-warning</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">semantic-danger</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">semantic-info</code>
          </li>
          <li>
            <strong className="text-neutral-300">Surfaces:</strong>{" "}
            <code className="rounded bg-neutral-900 px-1">surface-canvas</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">surface-raised</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">surface-muted</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">surface-overlay</code>
          </li>
          <li>
            <strong className="text-neutral-300">Text:</strong>{" "}
            <code className="rounded bg-neutral-900 px-1">text-primary</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">text-secondary</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">text-muted</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">text-on-brand</code>
          </li>
          <li>
            <strong className="text-neutral-300">Border / radius / shadow:</strong>{" "}
            <code className="rounded bg-neutral-900 px-1">border-default</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">rounded-ui-md</code>,{" "}
            <code className="rounded bg-neutral-900 px-1">shadow-ui-sm</code>
          </li>
        </ul>
        <p className="mt-2 text-sm text-neutral-400">
          Legacy palette keys (<code className="rounded bg-neutral-900 px-1">blue-1000</code>, etc.) remain in the
          theme for app-level styling outside the UI package.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold text-white">Next steps</h2>
        <ol className="list-decimal space-y-2 pl-6 text-sm text-neutral-300">
          <li>
            <Link href="/docs/design-system" className="text-blue-300 underline-offset-2 hover:underline">
              Design system
            </Link>{" "}
            — API contract for variants and sizes.
          </li>
          <li>
            <Link href="/docs/components" className="text-blue-300 underline-offset-2 hover:underline">
              Component reference
            </Link>{" "}
            — usage and examples.
          </li>
          <li>
            <Link href="/docs/quality-gates" className="text-blue-300 underline-offset-2 hover:underline">
              Quality gates
            </Link>{" "}
            — how changes are verified.
          </li>
        </ol>
      </section>
    </>
  );
}
