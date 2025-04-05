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
          "Controlled tab panels with ArrowLeft/ArrowRight keyboard navigation. **A11y:** `role=\"tablist\"`, `role=\"tab\"` with `aria-selected`, and `role=\"tabpanel\"` with `tabIndex={0}`. **Do:** use for in-page content switching. **Don't:** confuse with NavTabs (route-based navigation).",
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
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="ui:text-sm ui:text-text-secondary">Dashboard overview content.</p>
        </TabsContent>
        <TabsContent value="analytics">
          <p className="ui:text-sm ui:text-text-secondary">Analytics charts and data.</p>
        </TabsContent>
        <TabsContent value="settings">
          <p className="ui:text-sm ui:text-text-secondary">Configuration options.</p>
        </TabsContent>
      </Tabs>
    );
  },
};
