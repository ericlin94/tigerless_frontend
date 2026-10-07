"use client";
import { useId, useState } from "react";
import Image from "next/image";
import type { FormEvent } from "react";
import type { BmiResult } from "@/lib/contracts";
import { calculateBmi } from "@/lib/bmi";
import { Action, ActionLink } from "../ui/ui";
import { createClassNames } from "@/lib/component-class-names";
import uiStyles from "../ui/ui.module.css";
import styles from "./bmi-calculator.module.css";
const classNames = createClassNames({ ...uiStyles, ...styles });

function BmiRing({ result }: { result: BmiResult | null }) {
  const categoryColors: Record<
    BmiResult["category"],
    { arc: string; track: string }
  > = {
    Underweight: { arc: "#3b82f6", track: "#dbeafe" },
    "Healthy weight": { arc: "#1a8a79", track: "#cdece3" },
    Overweight: { arc: "#f59e0b", track: "#fef3c7" },
    "Obesity range": { arc: "#ef4444", track: "#fee2e2" },
  };
  // The ring uses a bounded visual scale, not a treatment eligibility score.
  const progress = result
    ? Math.min(100, Math.max(0, (result.value / 40) * 100))
    : 0;
  const segmentGap = 3;
  const trackLength = result
    ? Math.max(0, 100 - progress - segmentGap * 2)
    : 100;
  return (
    <div className={classNames("bmi-ring")}>
      <svg
        className={classNames("bmi-ring-chart")}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          className={classNames("bmi-ring-track")}
          cx="50"
          cy="50"
          r="47.5"
          pathLength="100"
          style={{
            stroke: result ? categoryColors[result.category].track : "#cdece3",
            strokeDasharray: `${trackLength} 100`,
            strokeDashoffset: result ? -(progress + segmentGap) : 0,
            opacity: trackLength > 0 ? 1 : 0,
          }}
        />
        <circle
          className={classNames("bmi-ring-fill")}
          cx="50"
          cy="50"
          r="47.5"
          pathLength="100"
          strokeDasharray="100"
          style={{
            strokeDashoffset: 100 - progress,
            stroke: result ? categoryColors[result.category].arc : "#cdece3",
            opacity: result ? 1 : 0,
          }}
        />
      </svg>
      <strong>{result?.value ?? "--"}</strong>
      <span>Your BMI Score</span>
    </div>
  );
}

export function BmiCalculator({
  initialUnit = "imperial",
  initialResult = null,
  initialSex = "female",
}: {
  initialUnit?: "imperial" | "metric";
  initialResult?: BmiResult | null;
  initialSex?: "male" | "female";
}) {
  const sexGroupName = useId();
  const [unit, setUnit] = useState(initialUnit);
  const [sex, setSex] = useState(initialSex);
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
    <section className={classNames("bmi-section")} aria-labelledby="bmi-title">
      <Image
        className={classNames("bmi-background")}
        src="/assets/8e0f8.png"
        alt=""
        width={4096}
        height={2733}
        sizes="(max-width: 767px) 335px, 1320px"
        loading="eager"
      />
      <form className={classNames("bmi-form")} onSubmit={submit} noValidate>
        <div className={classNames("bmi-labels")}>
          <span className={classNames("eyebrow")}>Check your eligibility</span>
          <span>BMI</span>
        </div>
        <h3 id="bmi-title">Could a GLP-1 program be right for you?</h3>
        <p className={classNames("bmi-description")}>
          Enter your height and weight below
        </p>
        <div className={classNames("bmi-mobile-result")} aria-live="polite">
          <BmiRing result={result} />
          <p className={classNames("bmi-category")}>
            {result?.category ?? "Enter your measurements"}
          </p>
        </div>
        <div
          className={classNames("unit-control")}
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
        <div className={classNames("bmi-fields")}>
          <fieldset>
            <legend>Height</legend>
            <div className={classNames("height-inputs")}>
              <label className={classNames("number-field")}>
                <span className={classNames("sr-only")}>
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
                <label className={classNames("number-field")}>
                  <span className={classNames("sr-only")}>
                    Additional height in inches
                  </span>
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
          <label className={classNames("weight-field")}>
            Weight
            <span className={classNames("number-field")}>
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
        <fieldset className={classNames("bmi-sex")}>
          <legend>Sex</legend>
          <div className={classNames("bmi-sex-options")}>
            {(["male", "female"] as const).map((option) => (
              <label className={classNames("bmi-sex-option")} key={option}>
                <input
                  type="radio"
                  name={sexGroupName}
                  value={option}
                  checked={sex === option}
                  onChange={() => setSex(option)}
                />
                <span>{option === "male" ? "Male" : "Female"}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className={classNames("bmi-note")}>
          For adults. BMI is a screening measure, not a diagnosis.
        </div>
        {error && (
          <p id="bmi-error" role="alert" className={classNames("form-error")}>
            {error}
          </p>
        )}
        <Action type="submit" className={classNames("bmi-submit")}>
          Calculate BMI
        </Action>
      </form>
      <div className={classNames("bmi-result")} aria-live="polite">
        <BmiRing result={result} />
        <p className={classNames("bmi-category")}>
          {result?.category ?? "Enter your measurements"}
        </p>
        <div className={classNames("bmi-scale")} />
        <div className={classNames("bmi-scale-labels")}>
          <span>Under 18.5</span>
          <span>18.5-24.9</span>
          <span>25-29.9</span>
          <span>30+</span>
        </div>
        <ActionLink href="#plans" arrow={false}>
          See your GLP-1 options
        </ActionLink>
        <p className={classNames("bmi-note")}>
          A physician assesses treatment eligibility.
        </p>
      </div>
    </section>
  );
}
