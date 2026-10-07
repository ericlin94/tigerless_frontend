import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "storybook/test";
import { Action } from "./ui";
const meta = {
  title: "Library/Action",
  component: Action,
  args: { children: "Get started" },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Action>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const WithArrow: Story = {
  args: { arrow: true, children: "Start a free consultation" },
};
export const Disabled: Story = { args: { disabled: true } };
export const Hover: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.hover(within(canvasElement).getByRole("button"));
  },
};
export const Focus: Story = {
  play: async ({ canvasElement }) => {
    within(canvasElement).getByRole("button").focus();
  },
};
export const Pressed: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.pointer({
      target: within(canvasElement).getByRole("button"),
      keys: "[MouseLeft>]",
    });
  },
};
