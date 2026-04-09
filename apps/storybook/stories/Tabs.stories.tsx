import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/tabs";

const meta = {
  title: "Utility/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "좌우 화살표 키 내비가 있는 제어 탭 패널입니다. **접근성:** `role=\"tablist\"`, `aria-selected`가 있는 `role=\"tab\"`, `tabIndex={0}`인 `role=\"tabpanel\"`. **권장:** 페이지 내 콘텐츠 전환. **비권장:** NavTabs(라우트 기반 내비)와 혼동.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("overview");
    return (
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="analytics">분석</TabsTrigger>
          <TabsTrigger value="settings">설정</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="ui:text-sm ui:text-text-secondary">대시보드 개요 콘텐츠입니다.</p>
        </TabsContent>
        <TabsContent value="analytics">
          <p className="ui:text-sm ui:text-text-secondary">분석 차트와 데이터입니다.</p>
        </TabsContent>
        <TabsContent value="settings">
          <p className="ui:text-sm ui:text-text-secondary">설정 옵션입니다.</p>
        </TabsContent>
      </Tabs>
    );
  },
};
