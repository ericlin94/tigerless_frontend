"use client";
import { createClassNames } from "@/lib/component-class-names";
import styles from "./ui.module.css";
const classNames = createClassNames(styles);

export function Socials({
  light = false,
  onSelect,
}: {
  light?: boolean;
  onSelect: (name: string) => void;
}) {
  return (
    <div className={classNames(`socials ${light ? "light" : ""}`)}>
      {[
        ["X", light ? "60c51.svg" : "e25de.svg"],
        ["Instagram", light ? "6d12b.svg" : "e69af.svg"],
        ["LinkedIn", light ? "6f28b.svg" : "52348.svg"],
      ].map(([name, file]) => (
        <button
          key={name}
          className={classNames("icon-button")}
          aria-label={`Share on ${name}`}
          title={`Share on ${name}`}
          onClick={() => onSelect(name)}
        >
          <img src={`/assets/${file}`} width="24" height="24" alt="" />
        </button>
      ))}
    </div>
  );
}
