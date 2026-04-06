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
        <p className="mt-2 text-sm text-neutral-400">
          <strong className="text-neutral-300">Light mode (optional):</strong> add{" "}
          <code className="rounded bg-neutral-900 px-1">class=&quot;light&quot;</code> or{" "}
          <code className="rounded bg-neutral-900 px-1">data-theme=&quot;light&quot;</code> on a root ancestor to swap
          semantic surface and text tokens. Default tokens stay optimized for dark analytics dashboards.
        </p>
        <p className="mt-2 text-sm text-neutral-400">
          <strong className="text-neutral-300">Extended tokens:</strong> typography (<code className="rounded bg-neutral-900 px-1">text-ui-*</code>,{" "}
          <code className="rounded bg-neutral-900 px-1">leading-ui-*</code>), spacing scale (<code className="rounded bg-neutral-900 px-1">spacing-ui-*</code>),
          motion (<code className="rounded bg-neutral-900 px-1">duration-ui-*</code>, <code className="rounded bg-neutral-900 px-1">ease-ui-*</code>),
          z-index (<code className="rounded bg-neutral-900 px-1">z-index-ui-*</code>), and focus ring references (
          <code className="rounded bg-neutral-900 px-1">ring-*-ui</code>) are defined alongside semantic colors.
        </p>
      </section>

      {/* ── Token Visualization ─────────────────────────── */}
      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Color tokens</h2>
        <p className="text-sm text-neutral-400">
          Semantic colors used across <code className="rounded bg-neutral-900 px-1">@repo/ui</code>.
          Each maps to a CSS custom property in <code className="rounded bg-neutral-900 px-1">@theme</code>.
        </p>

        <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-400">Feedback</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "semantic-brand", color: "var(--color-semantic-brand)" },
            { name: "semantic-success", color: "var(--color-semantic-success)" },
            { name: "semantic-warning", color: "var(--color-semantic-warning)" },
            { name: "semantic-danger", color: "var(--color-semantic-danger)" },
            { name: "semantic-info", color: "var(--color-semantic-info)" },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-1.5">
              <div className="h-12 w-12 rounded-lg border border-neutral-700" style={{ backgroundColor: t.color }} />
              <span className="text-[10px] text-neutral-400">{t.name}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-400">Surfaces</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "surface-canvas", color: "var(--color-surface-canvas)" },
            { name: "surface-raised", color: "var(--color-surface-raised)" },
            { name: "surface-muted", color: "var(--color-surface-muted)" },
            { name: "surface-overlay", color: "var(--color-surface-overlay)" },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-1.5">
              <div className="h-12 w-12 rounded-lg border border-neutral-700" style={{ backgroundColor: t.color }} />
              <span className="text-[10px] text-neutral-400">{t.name}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-400">Text</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "text-primary", color: "var(--color-text-primary)" },
            { name: "text-secondary", color: "var(--color-text-secondary)" },
            { name: "text-muted", color: "var(--color-text-muted)" },
            { name: "text-on-brand", color: "var(--color-text-on-brand)" },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-1.5">
              <div className="h-12 w-12 rounded-lg border border-neutral-700" style={{ backgroundColor: t.color }} />
              <span className="text-[10px] text-neutral-400">{t.name}</span>
            </div>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-400">Border</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "border-default", color: "var(--color-border-default)" },
            { name: "border-subtle", color: "var(--color-border-subtle)" },
            { name: "border-strong", color: "var(--color-border-strong)" },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-1.5">
              <div className="h-12 w-12 rounded-lg border border-neutral-700" style={{ backgroundColor: t.color }} />
              <span className="text-[10px] text-neutral-400">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Spacing scale</h2>
        <p className="text-sm text-neutral-400">
          4px-based scale from <code className="rounded bg-neutral-900 px-1">spacing-ui-0</code> to{" "}
          <code className="rounded bg-neutral-900 px-1">spacing-ui-16</code>.
        </p>
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => (
            <div key={n} className="flex items-center gap-3">
              <code className="w-20 text-right text-xs text-neutral-400">ui-{n}</code>
              <div className="h-3 rounded-sm bg-blue-1000/60" style={{ width: `${n * 4}px` }} />
              <span className="text-xs text-neutral-500">{n * 4}px</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Typography scale</h2>
        <p className="text-sm text-neutral-400">
          Font sizes from <code className="rounded bg-neutral-900 px-1">text-ui-xs</code> to{" "}
          <code className="rounded bg-neutral-900 px-1">text-ui-2xl</code>.
        </p>
        <div className="flex flex-col gap-3">
          {[
            { name: "text-ui-xs", size: "0.75rem" },
            { name: "text-ui-sm", size: "0.875rem" },
            { name: "text-ui-base", size: "1rem" },
            { name: "text-ui-lg", size: "1.125rem" },
            { name: "text-ui-xl", size: "1.25rem" },
            { name: "text-ui-2xl", size: "1.5rem" },
          ].map((t) => (
            <div key={t.name} className="flex items-baseline gap-4">
              <code className="w-28 shrink-0 text-right text-xs text-neutral-400">{t.name}</code>
              <span className="text-white" style={{ fontSize: t.size }}>The quick brown fox</span>
              <span className="text-xs text-neutral-500">{t.size}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Radius &amp; Shadow</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { name: "rounded-ui-sm", radius: "var(--radius-ui-sm)", shadow: "" },
            { name: "rounded-ui-md", radius: "var(--radius-ui-md)", shadow: "" },
            { name: "rounded-ui-lg", radius: "var(--radius-ui-lg)", shadow: "" },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 border border-neutral-600 bg-neutral-800"
                style={{ borderRadius: t.radius, boxShadow: t.shadow }}
              />
              <span className="text-[10px] text-neutral-400">{t.name}</span>
            </div>
          ))}
          {[
            { name: "shadow-ui-sm", shadow: "var(--shadow-ui-sm)" },
            { name: "shadow-ui-md", shadow: "var(--shadow-ui-md)" },
          ].map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-lg border border-neutral-600 bg-neutral-800"
                style={{ boxShadow: t.shadow }}
              />
              <span className="text-[10px] text-neutral-400">{t.name}</span>
            </div>
          ))}
        </div>
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
