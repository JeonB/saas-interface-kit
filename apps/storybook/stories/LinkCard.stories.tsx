import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinkCard } from "@repo/ui/link-card";

const meta = {
  title: "UI/LinkCard",
  component: LinkCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    href: { control: "text" },
  },
} satisfies Meta<typeof LinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "문서",
    children: "이 프로젝트와 사용법에 대한 자세한 정보를 확인하세요.",
    href: "https://turbo.build/repo/docs",
  },
};

export const LearnMore: Story = {
  args: {
    title: "더 알아보기",
    children: "Next.js, React, 모노레포 모범 사례를 알아보세요.",
    href: "https://nextjs.org/learn",
  },
};
