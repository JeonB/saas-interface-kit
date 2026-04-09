import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@repo/ui/breadcrumb";

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "계층 내비용 경로입니다. **접근성:** `<nav aria-label=\"경로\">`와 `<ol>`. 구분자는 `aria-hidden`. **권장:** 짧은 경로(3~4단계). **비권장:** 마지막 항목을 링크로 — 현재 페이지를 나타냅니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <a href="#" className="ui:text-text-secondary hover:ui:text-text-primary">
          홈
        </a>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <a href="#" className="ui:text-text-secondary hover:ui:text-text-primary">
          프로젝트
        </a>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <span className="ui:text-text-primary">Analytics API</span>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};
