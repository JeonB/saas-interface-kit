import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, it } from "vitest";
import { axe } from "vitest-axe";

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

async function expectNoA11yViolations(ui: ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

describe("접근성 (axe-core)", () => {
  it("버튼 위반 없음", async () => {
    await expectNoA11yViolations(<Button name="test">Click me</Button>);
  });

  it("레이블 있는 입력 위반 없음", async () => {
    await expectNoA11yViolations(
      <Field id="a11y-input" label="Name">
        <Input name="name" />
      </Field>,
    );
  });

  it("레이블 있는 텍스트 영역 위반 없음", async () => {
    await expectNoA11yViolations(
      <Field id="a11y-textarea" label="Notes">
        <Textarea name="notes" />
      </Field>,
    );
  });

  it("체크박스 위반 없음", async () => {
    await expectNoA11yViolations(<Checkbox id="a11y-check" label="Agree" name="agree" />);
  });

  it("라디오 그룹 위반 없음", async () => {
    await expectNoA11yViolations(
      <RadioGroup value="a" onValueChange={() => {}}>
        <RadioItem id="a" label="Option A" value="a" />
        <RadioItem id="b" label="Option B" value="b" />
      </RadioGroup>,
    );
  });

  it("선택 위반 없음", async () => {
    await expectNoA11yViolations(
      <Select name="region" aria-label="Region">
        <option value="us">US</option>
      </Select>,
    );
  });

  it("스위치 위반 없음", async () => {
    await expectNoA11yViolations(
      <Switch checked={false} onCheckedChange={() => {}} aria-label="Toggle" />,
    );
  });

  it("알림 위반 없음", async () => {
    await expectNoA11yViolations(<Alert variant="info">Info message</Alert>);
  });

  it("알림 배너 위반 없음", async () => {
    await expectNoA11yViolations(
      <AlertBanner variant="warning">Warning message</AlertBanner>,
    );
  });

  it("배지 위반 없음", async () => {
    await expectNoA11yViolations(<Badge variant="success">Active</Badge>);
  });

  it("아바타 대체 위반 없음", async () => {
    await expectNoA11yViolations(<Avatar fallback="AB" size="md" />);
  });

  it("카드 위반 없음", async () => {
    await expectNoA11yViolations(
      <Card>
        <CardHeader><CardTitle>Title</CardTitle></CardHeader>
        <CardBody>Content</CardBody>
      </Card>,
    );
  });

  it("빈 상태 위반 없음", async () => {
    await expectNoA11yViolations(
      <EmptyState title="No data" description="Nothing here." />,
    );
  });

  it("통계 카드 위반 없음", async () => {
    await expectNoA11yViolations(
      <StatCard label="MRR" value="$50k" delta="+5%" trend="up" />,
    );
  });

  it("상태 표시 위반 없음", async () => {
    await expectNoA11yViolations(
      <StatusIndicator state="online" label="Operational" />,
    );
  });

  it("브레드크럼 위반 없음", async () => {
    await expectNoA11yViolations(
      <Breadcrumb>
        <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><span>Current</span></BreadcrumbItem>
      </Breadcrumb>,
    );
  });

  it("페이지네이션 위반 없음", async () => {
    await expectNoA11yViolations(
      <Pagination page={1} pageCount={5} onPageChange={() => {}} />,
    );
  });

  it("구분선 위반 없음", async () => {
    await expectNoA11yViolations(<Separator />);
  });

  it("필터 바 위반 없음", async () => {
    await expectNoA11yViolations(
      <FilterBar>
        <FilterChip active>All</FilterChip>
        <FilterChip>Active</FilterChip>
      </FilterBar>,
    );
  });

  it("스켈레톤 위반 없음", async () => {
    await expectNoA11yViolations(<Skeleton width="100px" height="20px" />);
  });

  it("스피너 위반 없음", async () => {
    await expectNoA11yViolations(<Spinner />);
  });
});
