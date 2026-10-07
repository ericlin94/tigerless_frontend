import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { BmiCalculator } from "./bmi-calculator";
const meta = {
  title: "Library/BMI Calculator",
  component: BmiCalculator,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BmiCalculator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ImperialEmpty: Story = {};
export const MaleSelected: Story = { args: { initialSex: "male" } };
export const Mobile: Story = {
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
export const SexSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const male = canvas.getByRole("radio", { name: "Male" });
    const female = canvas.getByRole("radio", { name: "Female" });
    await expect(female).toBeChecked();
    await userEvent.click(male);
    await expect(male).toBeChecked();
    await expect(female).not.toBeChecked();
    await userEvent.click(canvas.getByRole("button", { name: "cm / kg" }));
    await expect(male).toBeChecked();
    await userEvent.click(female);
    await expect(female).toBeChecked();
    await expect(male).not.toBeChecked();
  },
};
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
export const FullRingResult: Story = {
  args: { initialResult: { value: 56, category: "Obesity range" } },
};
export const MobileResult: Story = {
  args: { initialResult: { value: 27.2, category: "Overweight" } },
  globals: { viewport: { value: "mobile375", isRotated: false } },
};
export const AnimatedCalculation: Story = {
  args: { initialUnit: "metric" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const height = canvas.getByRole("spinbutton", {
      name: "Height in centimeters",
    });
    const weight = canvas.getByRole("spinbutton", { name: "Weight" });
    await userEvent.type(height, "200");
    for (const [kilograms, color, trackColor, offset] of [
      [68, "#3b82f6", "#dbeafe", 57.5],
      [92, "#1a8a79", "#cdece3", 42.5],
      [108, "#f59e0b", "#fef3c7", 32.5],
      [140, "#ef4444", "#fee2e2", 12.5],
      [68, "#3b82f6", "#dbeafe", 57.5],
    ] as const) {
      await userEvent.clear(weight);
      await userEvent.type(weight, String(kilograms));
      await userEvent.click(
        canvas.getByRole("button", { name: "Calculate BMI" }),
      );
      for (const arc of canvasElement.querySelectorAll(".bmi-ring-fill")) {
        await waitFor(() => {
          expect(arc).toHaveStyle({ stroke: color });
          expect(
            parseFloat(getComputedStyle(arc).strokeDashoffset),
          ).toBeCloseTo(offset, 1);
        });
      }
      for (const track of canvasElement.querySelectorAll(".bmi-ring-track")) {
        await waitFor(() => expect(track).toHaveStyle({ stroke: trackColor }));
      }
    }
  },
};
