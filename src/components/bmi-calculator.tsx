"use client";
import { useState } from "react";
import Image from "next/image";
import type { FormEvent } from "react";
import type { BmiResult } from "@/lib/contracts";
import { calculateBmi } from "@/lib/bmi";
import { Action, ActionLink } from "./ui";
export function BmiCalculator({
  initialUnit = "imperial",
  initialResult = null,
}: {
  initialUnit?: "imperial" | "metric";
  initialResult?: BmiResult | null;
}) {
  const [unit, setUnit] = useState(initialUnit);
  const [height, setHeight] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BmiResult | null>(initialResult);
  const [error, setError] = useState("");
  function changeUnit(next: "imperial" | "metric") {
    setUnit(next);
    setHeight("");
    setInches("");
    setWeight("");
    setError("");
    setResult(null);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const heightCm =
      unit === "metric"
        ? Number(height)
        : (Number(height) * 12 + Number(inches)) * 2.54;
    const weightKg =
      unit === "metric" ? Number(weight) : Number(weight) * 0.45359237;
    const next = calculateBmi({ heightCm, weightKg });
    if (
      !next ||
      (unit === "imperial" && (Number(inches) < 0 || Number(inches) >= 12))
    ) {
      setError(
        "Enter a valid height and weight. Height must be 100-250 cm and weight 20-400 kg (or the equivalent in feet and pounds).",
      );
      setResult(null);
      return;
    }
    setError("");
    setResult(next);
  }
  return (
    <section className="bmi-section" aria-labelledby="bmi-title">
      <Image
        className="bmi-background"
        src="/assets/8e0f8.png"
        alt=""
        width={4096}
        height={2733}
        sizes="(max-width: 767px) 335px, 1320px"
        loading="eager"
      />
      <form className="bmi-form" onSubmit={submit} noValidate>
        <div className="bmi-labels">
          <span className="eyebrow">Check your eligibility</span>
          <span>BMI</span>
        </div>
        <h3 id="bmi-title">Could a GLP-1 program be right for you?</h3>
        <p className="bmi-description">Enter your height and weight below</p>
        <div className="bmi-mobile-result" aria-live="polite">
          <div className="bmi-ring">
            <strong>{result?.value ?? "--"}</strong>
            <span>Your BMI Score</span>
          </div>
          <p className="bmi-category">
            {result?.category ?? "Enter your measurements"}
          </p>
        </div>
        <div
          className="unit-control"
          role="group"
          aria-label="Measurement units"
        >
          <button
            type="button"
            aria-pressed={unit === "imperial"}
            onClick={() => changeUnit("imperial")}
          >
            ft / lbs
          </button>
          <button
            type="button"
            aria-pressed={unit === "metric"}
            onClick={() => changeUnit("metric")}
          >
            cm / kg
          </button>
        </div>
        <div className="bmi-fields">
          <fieldset>
            <legend>Height</legend>
            <div className="height-inputs">
              <label className="number-field">
                <span className="sr-only">
                  {unit === "metric"
                    ? "Height in centimeters"
                    : "Height in feet"}
                </span>
                <input
                  aria-label={
                    unit === "metric"
                      ? "Height in centimeters"
                      : "Height in feet"
                  }
                  type="number"
                  min={unit === "metric" ? 100 : 3}
                  max={unit === "metric" ? 250 : 8}
                  step={unit === "metric" ? "0.1" : "1"}
                  placeholder="0"
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    setResult(null);
                  }}
                  aria-describedby={error ? "bmi-error" : undefined}
                  aria-invalid={Boolean(error)}
                />
                <span>{unit === "metric" ? "cm" : "ft"}</span>
              </label>
              {unit === "imperial" && (
                <label className="number-field">
                  <span className="sr-only">Additional height in inches</span>
                  <input
                    aria-label="Additional height in inches"
                    type="number"
                    min="0"
                    max="11"
                    placeholder="0"
                    value={inches}
                    onChange={(e) => {
                      setInches(e.target.value);
                      setResult(null);
                    }}
                  />
                  <span>in</span>
                </label>
              )}
            </div>
          </fieldset>
          <label className="weight-field">
            Weight
            <span className="number-field">
              <input
                aria-label="Weight"
                type="number"
                min={unit === "metric" ? 20 : 44}
                max={unit === "metric" ? 400 : 882}
                step="0.1"
                placeholder="0"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  setResult(null);
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "bmi-error" : undefined}
              />
              <span>{unit === "metric" ? "kg" : "lbs"}</span>
            </span>
          </label>
        </div>
        <div className="bmi-note">
          For adults. BMI is a screening measure, not a diagnosis.
        </div>
        {error && (
          <p id="bmi-error" role="alert" className="form-error">
            {error}
          </p>
        )}
        <Action type="submit" className="bmi-submit">
          Calculate BMI
        </Action>
      </form>
      <div className="bmi-result" aria-live="polite">
        <div className="bmi-ring">
          <strong>{result?.value ?? "--"}</strong>
          <span>Your BMI Score</span>
        </div>
        <p className="bmi-category">
          {result?.category ?? "Enter your measurements"}
        </p>
        <div className="bmi-scale" />
        <div className="bmi-scale-labels">
          <span>Under 18.5</span>
          <span>18.5-24.9</span>
          <span>25-29.9</span>
          <span>30+</span>
        </div>
        <ActionLink href="#plans" arrow={false}>
          See your GLP-1 options
        </ActionLink>
        <p className="bmi-note">A physician assesses treatment eligibility.</p>
      </div>
    </section>
  );
}
