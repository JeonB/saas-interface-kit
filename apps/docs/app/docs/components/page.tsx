import { Alert } from "@repo/ui/alert";
import { Avatar } from "@repo/ui/avatar";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export default function ComponentReferencePage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-white">Component reference</h1>
      <p className="mt-2 text-neutral-400">
        Usage and examples for @repo/ui components.
      </p>
      <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4">
        <h2 className="text-sm font-semibold text-white">
          Story documentation template
        </h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-300">
          <li>Usage: 언제 이 컴포넌트를 써야 하는지</li>
          <li>A11y: role/aria/keyboard에서 보장되는 동작</li>
          <li>Do / Don&apos;t: 권장 패턴과 금지 패턴</li>
        </ul>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Button</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Actions and form submit. Variants: default, primary, danger.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Button } from "@repo/ui/button";`}
        </pre>
        <div className="mt-4 flex gap-2">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Badge</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Labels and status indicators. Variants: default, success, warning,
          danger.
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
          User or entity image with optional fallback. Sizes: sm, md, lg.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Avatar } from "@repo/ui/avatar";`}
        </pre>
        <div className="mt-4 flex items-center gap-2">
          <Avatar fallback="AB" size="sm" />
          <Avatar fallback="CD" size="md" />
          <Avatar fallback="EF" size="lg" />
          <Avatar src="https://github.com/vercel.png" alt="Vercel" size="md" />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Card</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Link card with title and description.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Card } from "@repo/ui/card";`}
        </pre>
        <div className="mt-4 max-w-[280px]">
          <Card href="https://turborepo.com/docs" title="Documentation">
            Find in-depth information about Turborepo.
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Alert</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Message or notification box. Variants: info, success, warning, error.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-neutral-900 p-4 text-sm text-neutral-300">
          {`import { Alert } from "@repo/ui/alert";`}
        </pre>
        <div className="mt-4 max-w-md space-y-2">
          <Alert variant="info" title="Info">
            General information message.
          </Alert>
          <Alert variant="success">Operation completed.</Alert>
          <Alert variant="warning" title="Warning">
            Please review before continuing.
          </Alert>
          <Alert variant="error">An error occurred.</Alert>
        </div>
      </section>
    </>
  );
}
