import type { BmiInput, BmiResult } from "./contracts";
export function calculateBmi({
  heightCm,
  weightKg,
}: BmiInput): BmiResult | null {
  if (
    !Number.isFinite(heightCm) ||
    !Number.isFinite(weightKg) ||
    heightCm < 100 ||
    heightCm > 250 ||
    weightKg < 20 ||
    weightKg > 400
  )
    return null;
  const raw = weightKg / (heightCm / 100) ** 2;
  return {
    value: Math.round(raw * 10) / 10,
    category:
      raw < 18.5
        ? "Underweight"
        : raw < 25
          ? "Healthy weight"
          : raw < 30
            ? "Overweight"
            : "Obesity range",
  };
}
