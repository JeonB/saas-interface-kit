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
        <CardTitle>Usage spike</CardTitle>
        <CardDescription>Last 24 hours · All regions</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="ui:text-sm ui:text-text-secondary">
          Requests are up 12% vs prior day. No SLO breaches detected.
        </p>
      </CardBody>
      <CardFooter>
        <Button name="open-runbook" variant="primary">
          Open runbook
        </Button>
      </CardFooter>
    </Card>
  ),
};
