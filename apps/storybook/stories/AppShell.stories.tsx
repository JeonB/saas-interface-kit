import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell, AppShellSidebar, AppShellMain, AppShellHeader, AppShellContent } from "@repo/ui/app-shell";

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SaaS 대시보드용 최상위 레이아웃 셸입니다. Sidebar, Header, Content를 반응형 그리드로 조합합니다. **접근성:** 사이드바는 `<aside>`, 헤더는 `<header>`, 본문은 `<main>`. **권장:** 내비는 Sidebar·NavTabs와 조합. **비권장:** AppShell 중첩.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell className="ui:h-[400px]">
      <AppShellSidebar>
        <div className="ui:p-4 ui:text-sm ui:text-text-secondary">사이드바</div>
      </AppShellSidebar>
      <AppShellMain>
        <AppShellHeader>
          <span className="ui:text-sm ui:font-medium ui:text-text-primary">헤더</span>
        </AppShellHeader>
        <AppShellContent>
          <p className="ui:text-sm ui:text-text-secondary">본문 영역</p>
        </AppShellContent>
      </AppShellMain>
    </AppShell>
  ),
};
