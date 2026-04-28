import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConnectorCard } from "@repo/ui/connector-card";

const meta = {
  title: "Integration/ConnectorCard",
  component: ConnectorCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "연동 커넥터 상태 카드입니다. **접근성:** 액션은 버튼으로 제공됩니다. **권장:** status 유니온으로 상태를 표현. **비권장:** 임의 텍스트 상태 직접 렌더.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ConnectorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Connected: Story = {
  args: {
    description: "고객 및 계정 변경사항을 실시간 동기화합니다.",
    lastSyncAt: "2026-04-28 20:20",
    name: "Salesforce",
    status: "connected",
    vendor: "Salesforce",
  },
};

export const ErrorState: Story = {
  args: {
    description: "권한 토큰이 만료되어 인증이 실패했습니다.",
    name: "HubSpot",
    status: "error",
    vendor: "HubSpot",
  },
};
