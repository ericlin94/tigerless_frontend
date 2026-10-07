import type { Meta, StoryObj } from "@storybook/react";
import { ServicePanel } from "./service-panel";
import { homeContent } from "@/lib/mock-content";
const meta = {
  title: "Library/Service Panel",
  component: ServicePanel,
  args: { service: homeContent.services[0], onStart: () => {} },
} satisfies Meta<typeof ServicePanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const WeightLoss: Story = {};
export const BirthControl: Story = {
  args: { service: homeContent.services[1] },
};
export const Sleep: Story = { args: { service: homeContent.services[2] } };
