import type { Meta, StoryObj } from "@storybook/react";
import { HomePage } from "./home-page";
import { homeContent } from "@/lib/mock-content";
const meta = {
  title: "Pages/Home",
  component: HomePage,
  args: { content: homeContent },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof HomePage>;
export default meta;
export const Desktop: StoryObj<typeof meta> = {
  globals: { viewport: { value: "desktop1440", isRotated: false } },
};
export const Mobile: StoryObj<typeof meta> = {
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
