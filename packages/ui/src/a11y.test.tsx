import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { toHaveNoViolations } from "vitest-axe/matchers";

import { Alert } from "./alert";
import { AlertBanner } from "./alert-banner";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "./breadcrumb";
import { Button } from "./button";
import { Card, CardBody, CardHeader, CardTitle } from "./card";
import { Checkbox } from "./checkbox";
import { EmptyState } from "./empty-state";
import { Field } from "./field";
import { FilterBar, FilterChip } from "./filter-bar";
import { Input } from "./input";
import { Pagination } from "./pagination";
import { RadioGroup, RadioItem } from "./radio-group";
import { Select } from "./select";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Spinner } from "./spinner";
import { StatCard } from "./stat-card";
import { StatusIndicator } from "./status-indicator";
import { Switch } from "./switch";
import { Textarea } from "./textarea";

expect.extend({ toHaveNoViolations });

async function expectNoA11yViolations(ui: ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

describe("Accessibility (axe-core)", () => {
  it("Button has no violations", async () => {
    await expectNoA11yViolations(<Button name="test">Click me</Button>);
  });

  it("Input with label has no violations", async () => {
    await expectNoA11yViolations(
      <Field id="a11y-input" label="Name">
        <Input name="name" />
      </Field>,
    );
  });

  it("Textarea with label has no violations", async () => {
    await expectNoA11yViolations(
      <Field id="a11y-textarea" label="Notes">
        <Textarea name="notes" />
      </Field>,
    );
  });

  it("Checkbox has no violations", async () => {
    await expectNoA11yViolations(<Checkbox id="a11y-check" label="Agree" name="agree" />);
  });

  it("RadioGroup has no violations", async () => {
    await expectNoA11yViolations(
      <RadioGroup value="a" onValueChange={() => {}}>
        <RadioItem id="a" label="Option A" value="a" />
        <RadioItem id="b" label="Option B" value="b" />
      </RadioGroup>,
    );
  });

  it("Select has no violations", async () => {
    await expectNoA11yViolations(
      <Select name="region" aria-label="Region">
        <option value="us">US</option>
      </Select>,
    );
  });

  it("Switch has no violations", async () => {
    await expectNoA11yViolations(
      <Switch checked={false} onCheckedChange={() => {}} aria-label="Toggle" />,
    );
  });

  it("Alert has no violations", async () => {
    await expectNoA11yViolations(<Alert variant="info">Info message</Alert>);
  });

  it("AlertBanner has no violations", async () => {
    await expectNoA11yViolations(
      <AlertBanner variant="warning">Warning message</AlertBanner>,
    );
  });

  it("Badge has no violations", async () => {
    await expectNoA11yViolations(<Badge variant="success">Active</Badge>);
  });

  it("Avatar fallback has no violations", async () => {
    await expectNoA11yViolations(<Avatar fallback="AB" size="md" />);
  });

  it("Card has no violations", async () => {
    await expectNoA11yViolations(
      <Card>
        <CardHeader><CardTitle>Title</CardTitle></CardHeader>
        <CardBody>Content</CardBody>
      </Card>,
    );
  });

  it("EmptyState has no violations", async () => {
    await expectNoA11yViolations(
      <EmptyState title="No data" description="Nothing here." />,
    );
  });

  it("StatCard has no violations", async () => {
    await expectNoA11yViolations(
      <StatCard label="MRR" value="$50k" delta="+5%" trend="up" />,
    );
  });

  it("StatusIndicator has no violations", async () => {
    await expectNoA11yViolations(
      <StatusIndicator state="online" label="Operational" />,
    );
  });

  it("Breadcrumb has no violations", async () => {
    await expectNoA11yViolations(
      <Breadcrumb>
        <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><span>Current</span></BreadcrumbItem>
      </Breadcrumb>,
    );
  });

  it("Pagination has no violations", async () => {
    await expectNoA11yViolations(
      <Pagination page={1} pageCount={5} onPageChange={() => {}} />,
    );
  });

  it("Separator has no violations", async () => {
    await expectNoA11yViolations(<Separator />);
  });

  it("FilterBar has no violations", async () => {
    await expectNoA11yViolations(
      <FilterBar>
        <FilterChip active>All</FilterChip>
        <FilterChip>Active</FilterChip>
      </FilterBar>,
    );
  });

  it("Skeleton has no violations", async () => {
    await expectNoA11yViolations(<Skeleton width="100px" height="20px" />);
  });

  it("Spinner has no violations", async () => {
    await expectNoA11yViolations(<Spinner />);
  });
});
