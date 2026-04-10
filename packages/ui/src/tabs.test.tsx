import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function TabsDemo() {
  const [v, setV] = useState("a");
  return (
    <Tabs onValueChange={setV} value={v}>
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Panel A</TabsContent>
      <TabsContent value="b">Panel B</TabsContent>
    </Tabs>
  );
}

describe("탭", () => {
  it("탭 활성화 시 패널 전환", async () => {
    const user = userEvent.setup();
    render(<TabsDemo />);
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
    await user.click(screen.getByRole("tab", { name: "B" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel B");
  });

  it("ArrowRight로 탭 간 포커스 이동", async () => {
    const user = userEvent.setup();
    render(<TabsDemo />);
    const tabA = screen.getByRole("tab", { name: "A" });
    tabA.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "B" })).toHaveFocus();
  });
});
