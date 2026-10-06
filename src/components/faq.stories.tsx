import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FaqItem } from "./faq";
import { homeContent } from "@/lib/mock-content";
const meta = {
  title: "Library/FAQ",
  component: FaqItem,
  args: { item: homeContent.faqs[0], expanded: false, onToggle: () => {} },
  render: function Render(args) {
    const [expanded, setExpanded] = useState(args.expanded);
    return (
      <div style={{ maxWidth: 760 }}>
        <FaqItem
          {...args}
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
        />
      </div>
    );
  },
} satisfies Meta<typeof FaqItem>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Collapsed: Story = {};
export const Expanded: Story = { args: { expanded: true } };
export const LongAnswer: Story = {
  args: { item: homeContent.faqs[3], expanded: true },
};
