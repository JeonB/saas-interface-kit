import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Command,
  CommandTrigger,
  CommandContent,
  CommandHeader,
  CommandTitle,
  CommandClose,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@repo/ui/command";
import { Button } from "@repo/ui/button";

const meta = {
  title: "Overlay/Command",
  component: CommandInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "커맨드 팔레트 패턴: Dialog + 검색 목록. **접근성:** 입력은 `type=\"search\"`; 항목은 `role=\"listbox\"` 안의 `role=\"option\"`. **권장:** CommandGroup으로 묶기. **비권장:** 단순 선택 — Select나 RadioGroup.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const items = [
      {
        group: "내비게이션",
        items: ["대시보드", "분석", "설정"],
      },
      {
        group: "동작",
        items: ["프로젝트 만들기", "멤버 초대", "데이터 내보내기"],
      },
    ];
    return (
      <Command open={open} onOpenChange={setOpen}>
        <CommandTrigger>
          <Button name="openCommand" variant="default">
            커맨드 팔레트 열기
          </Button>
        </CommandTrigger>
        <CommandContent>
          <CommandHeader>
            <CommandTitle>커맨드 팔레트</CommandTitle>
          </CommandHeader>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="명령 검색…"
            aria-label="명령 검색"
          />
          <CommandList>
            {items.map((g) => (
              <CommandGroup key={g.group} heading={g.group}>
                {g.items
                  .filter((i) =>
                    i.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((i) => (
                    <CommandItem key={i} onSelect={() => setOpen(false)}>
                      {i}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
            {items.every(
              (g) =>
                g.items.filter((i) =>
                  i.toLowerCase().includes(search.toLowerCase())
                ).length === 0
            ) && <CommandEmpty>결과가 없습니다.</CommandEmpty>}
          </CommandList>
          <div className="ui:border-t ui:border-border-subtle ui:px-4 ui:py-2">
            <CommandClose>
              <Button name="closeCmd" variant="default" size="sm">
                닫기
              </Button>
            </CommandClose>
          </div>
        </CommandContent>
      </Command>
    );
  },
};
