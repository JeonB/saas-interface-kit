import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="ui:w-80">
      <CardHeader>
        <CardTitle>사용량 급증</CardTitle>
        <CardDescription>최근 24시간 · 전체 리전</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="ui:text-sm ui:text-text-secondary">
          요청이 전일 대비 12% 증가했습니다. SLO 위반은 없습니다.
        </p>
      </CardBody>
      <CardFooter>
        <Button name="open-runbook" variant="primary">
          런북 열기
        </Button>
      </CardFooter>
    </Card>
  ),
};
