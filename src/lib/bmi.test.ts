import { describe, expect, it } from "vitest";
import { calculateBmi } from "./bmi";
describe("BMI screening calculation", () => {
  it("calculates metric measurements to one decimal", () => {
    expect(calculateBmi({ heightCm: 175, weightKg: 70 })).toEqual({
      value: 22.9,
      category: "Healthy weight",
    });
  });
  it("gives the same result for imperial measurements after conversion", () => {
    expect(
      calculateBmi({ heightCm: 69 * 2.54, weightKg: 154 * 0.45359237 }),
    ).toEqual({ value: 22.7, category: "Healthy weight" });
  });
  it.each([
    [18.49, "Underweight"],
    [18.5, "Healthy weight"],
    [24.99, "Healthy weight"],
    [25, "Overweight"],
    [29.99, "Overweight"],
    [30, "Obesity range"],
  ])("classifies the unrounded boundary %s", (bmi, category) => {
    expect(
      calculateBmi({ heightCm: 200, weightKg: Number(bmi) * 4 })?.category,
    ).toBe(category);
  });
  it.each([
    [0, 70],
    [175, 0],
    [NaN, 70],
    [175, Infinity],
    [99, 70],
    [251, 70],
    [175, 401],
  ])("rejects invalid measurements %s / %s", (heightCm, weightKg) => {
    expect(calculateBmi({ heightCm, weightKg })).toBeNull();
  });
});
