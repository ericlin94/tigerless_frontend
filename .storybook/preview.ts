import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
const preview: Preview = {
  parameters: {
    layout: "padded",
    a11y: { test: "todo" },
    viewport: {
      options: {
        mobile375: {
          name: "Figma Mobile (375)",
          styles: { width: "375px", height: "824px" },
        },
        desktop1440: {
          name: "Figma Desktop (1440)",
          styles: { width: "1440px", height: "1000px" },
        },
      },
    },
  },
};
export default preview;
