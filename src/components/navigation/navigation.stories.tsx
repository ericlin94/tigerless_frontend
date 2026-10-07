import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "./navigation";
import { homeContent } from "@/lib/mock-content";
const meta = {
  title: "Library/Navigation",
  component: Navigation,
  args: { items: homeContent.navigation, onStart: () => {}, onLogin: () => {} },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Navigation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {
  globals: { viewport: { value: "desktop1440", isRotated: false } },
};
export const MobileClosed: Story = {
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
export const MobileOpen: Story = {
  args: { initialOpen: true },
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
