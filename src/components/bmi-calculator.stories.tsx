import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "storybook/test";
import { BmiCalculator } from "./bmi-calculator";
const meta = {
  title: "Library/BMI Calculator",
  component: BmiCalculator,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BmiCalculator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ImperialEmpty: Story = {};
export const MetricEmpty: Story = { args: { initialUnit: "metric" } };
export const Invalid: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Calculate BMI" }),
    );
  },
};
export const HealthyResult: Story = {
  args: { initialResult: { value: 22.9, category: "Healthy weight" } },
};
export const UnderweightResult: Story = {
  args: { initialResult: { value: 17, category: "Underweight" } },
};
export const OverweightResult: Story = {
  args: { initialResult: { value: 27.2, category: "Overweight" } },
};
export const ObesityRangeResult: Story = {
  args: { initialResult: { value: 31.1, category: "Obesity range" } },
};
