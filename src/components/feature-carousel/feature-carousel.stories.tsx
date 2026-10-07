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
export const ProviderSupportMobile: Story = {
  args: { items: [homeContent.features[0]] },
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
export const MedicationMobile: Story = {
  args: { items: [homeContent.features[2]] },
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
