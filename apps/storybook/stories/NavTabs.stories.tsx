import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavTabs, NavTabsItem } from "@repo/ui/nav-tabs";

const meta = {
  title: "Layout/NavTabs",
  component: NavTabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "헤더 아래에 두는 가로 앵커 기반 내비 탭입니다. **접근성:** `<nav aria-label=\"섹션\">`과 앵커 자식. **권장:** 페이지 수준 라우트 전환. **비권장:** `Tabs`(제어 탭 패널)와 혼동.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavTabs>
      <NavTabsItem href="#" active>
        개요
      </NavTabsItem>
      <NavTabsItem href="#">분석</NavTabsItem>
      <NavTabsItem href="#">설정</NavTabsItem>
    </NavTabs>
  ),
};
