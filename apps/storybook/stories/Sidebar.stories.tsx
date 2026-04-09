import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar, SidebarGroup, SidebarItem } from "@repo/ui/sidebar";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "그룹 링크가 있는 세로 내비 패널입니다. **접근성:** `<nav aria-label=\"주 메뉴\">`로 렌더링. **권장:** 논리 구역은 SidebarGroup, 링크는 SidebarItem. **비권장:** 사이드바 안에 폼 컨트롤을 직접 배치.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="ui:w-56 ui:rounded-ui-md ui:border ui:border-border-subtle ui:bg-surface-raised">
      <Sidebar>
        <SidebarGroup label="플랫폼">
          <SidebarItem href="#" active>
            개요
          </SidebarItem>
          <SidebarItem href="#">분석</SidebarItem>
          <SidebarItem href="#">설정</SidebarItem>
        </SidebarGroup>
        <SidebarGroup label="리소스">
          <SidebarItem href="#">문서</SidebarItem>
          <SidebarItem href="#">지원</SidebarItem>
        </SidebarGroup>
      </Sidebar>
    </div>
  ),
};
