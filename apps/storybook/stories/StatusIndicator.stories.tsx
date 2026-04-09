import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusIndicator } from "@repo/ui/status-indicator";

const meta = {
  title: "Data/StatusIndicator",
  component: StatusIndicator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "시스템 상태용 색 점 + 레이블입니다. **접근성:** 점은 `aria-hidden`; 의미는 레이블 텍스트로 전달. **권장:** 표준 상태(`online`, `degraded`, `offline`, `maintenance`). **비권장:** className으로 임의 색 — 상태 유니온을 확장하세요.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    state: { control: "select", options: ["online", "degraded", "offline", "maintenance"] },
  },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = { args: { state: "online", label: "모든 시스템 정상" } };
export const Degraded: Story = { args: { state: "degraded", label: "일부 장애" } };
export const Offline: Story = { args: { state: "offline", label: "서비스 중단" } };
export const Maintenance: Story = { args: { state: "maintenance", label: "예정 점검" } };
