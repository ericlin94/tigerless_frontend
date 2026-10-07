import type { Meta, StoryObj } from "@storybook/react";
import { homeContent } from "@/lib/mock-content";
import { StoryCard } from "./story-card";

const meta = {
  title: "Library/Story Card",
  component: StoryCard,
  args: { story: homeContent.testimonials[0], onShare: () => {} },
  render: (args) => (
    <div style={{ maxWidth: 424 }}>
      <StoryCard {...args} />
    </div>
  ),
} satisfies Meta<typeof StoryCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Quote: Story = {};
export const Portrait: Story = { args: { story: homeContent.testimonials[1] } };
