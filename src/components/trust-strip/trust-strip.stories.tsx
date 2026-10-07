import type { Meta, StoryObj } from "@storybook/react";
import { expect, waitFor, within } from "storybook/test";
import { TrustStrip } from "./trust-strip";

const meta = {
  title: "Library/Trust Strip",
  component: TrustStrip,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TrustStrip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  globals: { viewport: { value: "desktop1440", isRotated: false } },
};
export const Mobile: Story = {
  render: () => (
    <div style={{ maxWidth: 375 }}>
      <TrustStrip />
    </div>
  ),
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
export const Tablet: Story = {
  render: () => (
    <div style={{ maxWidth: 856 }}>
      <TrustStrip />
    </div>
  ),
};
export const ScrolledToEnd: Story = {
  ...Mobile,
  play: async ({ canvasElement }) => {
    const strip = within(canvasElement).getByRole("region", {
      name: "Care benefits",
    });
    strip.scrollTo({ left: strip.scrollWidth });
    await waitFor(() => {
      expect(strip.scrollLeft).toBeGreaterThan(0);
      expect(strip.scrollLeft + strip.clientWidth).toBeGreaterThanOrEqual(
        strip.scrollWidth - 1,
      );
    });
  },
};
