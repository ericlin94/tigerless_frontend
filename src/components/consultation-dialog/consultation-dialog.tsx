"use client";
import { useEffect, useRef, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import type { FormEvent } from "react";
import type {
  ServiceId,
  ConsultationRequest,
  ConsultationPreview,
} from "@/lib/contracts";
import { previewConsultation } from "@/lib/content-repository";
import { Action } from "../ui/ui";
import { createClassNames } from "@/lib/component-class-names";
import uiStyles from "../ui/ui.module.css";
import styles from "./consultation-dialog.module.css";
const classNames = createClassNames({ ...uiStyles, ...styles });

export type DialogMode =
  | { kind: "consultation"; serviceId: ServiceId }
  | { kind: "login" }
  | { kind: "information"; title: string; body: string };
export function ConsultationDialog({
  mode,
  onClose,
  languages,
  initialState = "form",
}: {
  mode: DialogMode | null;
  onClose: () => void;
  languages: readonly string[];
  initialState?: "form" | "error" | "success";
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState(initialState);
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState<ConsultationPreview | null>(null);
  useEffect(() => {
    if (mode) {
      setState(initialState);
      setEmail("");
      setPreview(null);
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mode, initialState]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    if (mode?.kind === "consultation") {
      const request: ConsultationRequest = {
        serviceId: data.get("service") as ServiceId,
        language: String(data.get("language")),
        email,
      };
      setPreview(previewConsultation(request));
    }
    setState("success");
  }
  return (
    <dialog
      ref={dialog}
      className={classNames("consultation-dialog")}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={classNames("dialog-content")}>
        <button
          className={classNames("icon-button dialog-close")}
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X />
        </button>
        {mode && (
          <>
            <h2 id="dialog-title">
              {mode.kind === "information"
                ? mode.title
                : mode.kind === "login"
                  ? "Welcome back"
                  : "Start a free consultation"}
            </h2>
            {mode.kind === "information" ? (
              <p>{mode.body}</p>
            ) : state === "success" ? (
              <div className={classNames("dialog-success")} role="status">
                <CheckCircle2 size={40} />
                <h3>
                  {mode.kind === "login"
                    ? "Email validated"
                    : "Your details are ready"}
                </h3>
                {preview && (
                  <p>
                    {preview.serviceLabel} in {preview.language}
                    <br />
                    {preview.email}
                  </p>
                )}
                <p>
                  This is a frontend demonstration.{" "}
                  {mode.kind === "login"
                    ? "No login link has been sent."
                    : "Your information has not been submitted and no consultation has been booked."}
                </p>
                <Action onClick={onClose}>Done</Action>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p>
                  {mode.kind === "login"
                    ? "Enter your email to preview the sign-in flow."
                    : "Choose your care and preferred language."}
                </p>
                {mode.kind === "consultation" && (
                  <>
                    <label>
                      Care program
                      <select name="service" defaultValue={mode.serviceId}>
                        <option value="weight-loss">Weight Loss</option>
                        <option value="birth-control">Birth Control</option>
                        <option value="sleep">Sleep</option>
                      </select>
                    </label>
                    <label>
                      Preferred language
                      <select name="language">
                        {languages.map((language) => (
                          <option key={language}>{language}</option>
                        ))}
                      </select>
                    </label>
                  </>
                )}
                <label>
                  Email
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={state === "error"}
                    aria-describedby={
                      state === "error" ? "email-error" : undefined
                    }
                  />
                </label>
                {state === "error" && (
                  <p
                    className={classNames("form-error")}
                    id="email-error"
                    role="alert"
                  >
                    Enter a valid email address.
                  </p>
                )}
                <Action type="submit">
                  {mode.kind === "login"
                    ? "Continue"
                    : "Continue to consultation"}
                </Action>
                <small className={classNames("demo-note")}>
                  Preview only. No information is sent to a backend.
                </small>
              </form>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
