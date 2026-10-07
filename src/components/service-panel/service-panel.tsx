"use client";
import Image from "next/image";
import type { Service, ServiceId } from "@/lib/contracts";
import { Action, ActionLink, Benefits, Price } from "../ui/ui";
import { createClassNames } from "@/lib/component-class-names";
import uiStyles from "../ui/ui.module.css";
import styles from "./service-panel.module.css";
const classNames = createClassNames({ ...uiStyles, ...styles });

export function ServicePanel({
  service,
  onStart,
}: {
  service: Service;
  onStart: (id: ServiceId) => void;
}) {
  const isWeight = service.id === "weight-loss";
  const isSleep = service.id === "sleep";
  return (
    <section
      id={service.id}
      className={classNames(
        `service-panel tone-${service.tone} ${isSleep ? "service-reverse" : ""} ${isWeight ? "weight-panel" : ""}`,
      )}
      aria-labelledby={`${service.id}-title`}
    >
      <div className={classNames("service-copy")}>
        {isWeight && <p className={classNames("eyebrow")}>Weight Loss</p>}
        <h2 id={`${service.id}-title`}>{service.title}</h2>
        {service.description && <p>{service.description}</p>}
        <Benefits items={service.benefits} />
        <div className={classNames("service-action")}>
          {service.startingPrice && (
            <Price amount={service.startingPrice.amount} />
          )}{" "}
          {isWeight ? (
            <ActionLink href="#plans">{service.cta}</ActionLink>
          ) : (
            <Action
              variant="secondary"
              arrow
              onClick={() => onStart(service.id)}
            >
              {service.cta}
            </Action>
          )}
        </div>
      </div>
      <div className={classNames("portrait-slot")}>
        <Image
          className={classNames("service-portrait")}
          src={service.portrait.src}
          alt={service.portrait.alt}
          width={700}
          height={800}
          sizes="(max-width: 767px) 335px, 660px"
          loading="eager"
        />
        {isSleep && (
          <div
            className={classNames("health-widgets")}
            aria-label="Illustrative health profile"
          >
            <div>
              <strong>Olivia Gomes</strong>
              <hr />
              <span>
                <b>78</b> Normal <b>89.5%</b> Progress
              </span>
            </div>
            <div>
              <strong>Your profile</strong>
              <div className={classNames("health-progress")} />
              <span>82%</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
