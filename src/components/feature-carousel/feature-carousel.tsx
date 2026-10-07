"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Feature } from "@/lib/contracts";
import { createClassNames } from "@/lib/component-class-names";
import uiStyles from "../ui/ui.module.css";
import styles from "./feature-carousel.module.css";
const classNames = createClassNames({ ...uiStyles, ...styles });

export function FeatureCarousel({
  items,
  initialIndex = 0,
}: {
  items: readonly Feature[];
  initialIndex?: number;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const [atEnd, setAtEnd] = useState(false);
  function updatePosition() {
    const el = track.current;
    if (!el) return;
    const width = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const gap = Number.parseFloat(getComputedStyle(el).gap) || 0;
    setIndex(
      Math.min(items.length - 1, Math.round(el.scrollLeft / (width + gap))),
    );
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }
  useEffect(() => {
    const el = track.current;
    const item = el?.children[initialIndex] as HTMLElement | undefined;
    if (el && item) el.scrollLeft = item.offsetLeft;
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [initialIndex]);
  function navigate(next: number) {
    const el = track.current;
    if (!el) return;
    const width = (el.children[0] as HTMLElement)?.offsetWidth ?? 0;
    const gap = Number.parseFloat(getComputedStyle(el).gap) || 0;
    el.scrollBy({
      left: (next > index ? 1 : -1) * (width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section
      className={classNames("feature-section")}
      aria-labelledby="features-title"
    >
      <div className={classNames("feature-heading")}>
        <h2 id="features-title">
          Completely online
          <br />
          on your schedule
        </h2>
        <div className={classNames("carousel-controls")}>
          <button
            className={classNames("icon-button")}
            aria-label="Previous service"
            title="Previous service"
            disabled={index === 0}
            onClick={() => navigate(index - 1)}
          >
            <ArrowLeft />
          </button>
          <button
            className={classNames("icon-button")}
            aria-label="Next service"
            title="Next service"
            disabled={atEnd}
            onClick={() => navigate(index + 1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        className={classNames("feature-track")}
        ref={track}
        tabIndex={0}
        aria-label="Online care services"
        onScroll={updatePosition}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" && !atEnd) {
            e.preventDefault();
            navigate(index + 1);
          }
          if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            navigate(index - 1);
          }
        }}
      >
        {items.map((item) => (
          <article
            className={classNames(
              `feature-card feature-${item.presentation}${item.id === "treatment" ? " feature-treatment" : ""}`,
            )}
            key={item.id}
          >
            <div className={classNames("feature-artwork")}>
              <Image
                className={classNames("feature-image")}
                src={item.image.src}
                alt={item.image.alt}
                width={
                  item.presentation === "call"
                    ? 1109
                    : item.presentation === "medication"
                      ? 628
                      : 4096
                }
                height={
                  item.presentation === "call"
                    ? 832
                    : item.presentation === "medication"
                      ? 406
                      : 2304
                }
                sizes={
                  item.presentation === "call"
                    ? "(max-width: 767px) 802px, 1043px"
                    : item.id === "treatment"
                      ? "1277px"
                      : item.presentation === "medication"
                        ? "(max-width: 767px) calc(100vw - 72px), 350px"
                        : "(max-width: 767px) 335px, 382px"
                }
                loading="eager"
              />
            </div>
            <h3>{item.title}</h3>
            {item.presentation === "call" && (
              <div className={classNames("chat-preview")} aria-hidden="true">
                <div className={classNames("chat-contact")}>
                  <img src="/assets/728d1.svg" width={14} height={14} alt="" />
                  <Image
                    className={classNames("chat-avatar")}
                    src="/assets/216ba.png"
                    alt=""
                    width={28}
                    height={28}
                    loading="eager"
                  />
                  <div>
                    Dr. Helena Fox<small>Online</small>
                  </div>
                  <img src="/assets/5688f.svg" width={14} height={14} alt="" />
                  <img src="/assets/b4fd3.svg" width={14} height={14} alt="" />
                </div>
                <div className={classNames("chat-today")}>
                  <img src="/assets/82b61.svg" alt="" />
                  Today
                  <img src="/assets/82b61.svg" alt="" />
                </div>
                <div className={classNames("chat-message")}>
                  <Image
                    src="/assets/216ba.png"
                    alt=""
                    width={18}
                    height={18}
                  />
                  <p>
                    <small>Dr. Helena Fox</small>Hello! How are you feeling
                    today?
                    <time>10:00 AM</time>
                  </p>
                </div>
                <p className={classNames("chat-reply")}>
                  I&apos;m feeling fine, thank you! Just want to follow up on my
                  recent tests.<time>10:00 AM</time>
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
      <span className={classNames("sr-only")} aria-live="polite">
        Service {index + 1} of {items.length}
      </span>
    </section>
  );
}
