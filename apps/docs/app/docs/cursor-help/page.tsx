import { Badge } from "@repo/ui/badge";
import Link from "next/link";

export default function CursorHelpPage() {
  return (
    <>
      <Badge className="mb-4" variant="default">
        Slack
      </Badge>
      <h1 className="text-3xl font-bold text-white">Cursor in Slack</h1>
      <p className="mt-2 text-neutral-400">
        Quick reference for mentioning Cursor&apos;s Cloud Agents in Slack. Use{" "}
        <code className="rounded bg-neutral-800 px-1">@Cursor help</code> anytime you want this summary in-channel.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">What it is</h2>
        <p className="mt-2 text-neutral-300">
          Cursor Cloud Agents can make code changes, debug issues, and answer questions about your codebase directly
          from Slack. Mention <code className="rounded bg-neutral-800 px-1">@Cursor</code> in a channel and describe what
          you need.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">How to start a task</h2>
        <p className="mt-2 text-neutral-400">
          Tag the bot and write a clear task in plain language—for example, fixing something tied to the current
          thread:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`@Cursor fix the issue we discussed in this thread`}
        </pre>
        <p className="mt-3 text-sm text-neutral-400">
          Include enough context (repo, error messages, or thread history) so the agent can act without guessing.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">Help command</h2>
        <p className="mt-2 text-neutral-400">
          For capabilities, tips, and advanced options, send:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`@Cursor help`}
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white">This monorepo</h2>
        <p className="mt-2 text-neutral-300">
          Local development and design-system docs for this workspace live in the{" "}
          <Link className="text-white underline underline-offset-2 hover:text-neutral-200" href="/docs/getting-started">
            Getting started
          </Link>{" "}
          guide and the rest of this documentation site.
        </p>
      </section>
    </>
  );
}
