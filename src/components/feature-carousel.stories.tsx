import type { Meta, StoryObj } from "@storybook/react";
import { FeatureCarousel } from "./feature-carousel";
import { homeContent } from "@/lib/mock-content";
const meta = {
  title: "Library/Feature Carousel",
  component: FeatureCarousel,
  args: { items: homeContent.features },
  render: (args) => (
    <div style={{ maxWidth: 800 }}>
      <FeatureCarousel {...args} />
    </div>
  ),
} satisfies Meta<typeof FeatureCarousel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Start: Story = {};
export const Middle: Story = { args: { initialIndex: 1 } };
export const End: Story = { args: { initialIndex: 3 } };
