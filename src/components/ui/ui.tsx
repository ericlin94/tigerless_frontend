import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { createClassNames } from "@/lib/component-class-names";
import styles from "./ui.module.css";
const classNames = createClassNames(styles);

type ActionProps = {
  variant?: "primary" | "secondary" | "outline";
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};
export function Action({
  variant = "primary",
  arrow = false,
  children,
  className = "",
  ...props
}: ActionProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={classNames(
        `action action-${variant} ${arrow ? "with-arrow" : ""} ${className}`,
      )}
    >
      {children}
      {arrow && (
        <img
          src={`/assets/${variant === "primary" ? "26e63.svg" : "212f6.svg"}`}
          width="40"
          height="40"
          alt=""
        />
      )}
    </button>
  );
}
export function ActionLink({
  variant = "secondary",
  arrow = true,
  children,
  className = "",
  ...props
}: ActionProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={classNames(
        `action action-${variant} ${arrow ? "with-arrow" : ""} ${className}`,
      )}
    >
      {children}
      {arrow && (
        <img
          src={`/assets/${variant === "primary" ? "26e63.svg" : "212f6.svg"}`}
          width="40"
          height="40"
          alt=""
        />
      )}
    </a>
  );
}
export function Benefits({ items }: { items: readonly string[] }) {
  return (
    <ul className={classNames("benefits")}>
      {items.map((item) => (
        <li key={item}>
          <img src="/assets/ba3ac.svg" width="24" height="24" alt="" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
export function Price({ amount }: { amount: number }) {
  return (
    <p className={classNames("price")}>
      From <strong>${amount}</strong>
      <span>/mo</span>
    </p>
  );
}
