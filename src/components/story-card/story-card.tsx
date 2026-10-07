"use client";
import Image from "next/image";
import type { Testimonial } from "@/lib/contracts";
import { Socials } from "../ui/socials";
import { createClassNames } from "@/lib/component-class-names";
import styles from "./story-card.module.css";
const classNames = createClassNames(styles);

export function StoryCard({
  story,
  onShare,
}: {
  story: Testimonial;
  onShare: (name: string) => void;
}) {
  return (
    <article
      className={classNames(`story-card ${story.image ? "story-photo" : ""}`)}
    >
      {story.image && (
        <Image
          className={classNames("story-image")}
          src={story.image.src}
          alt={story.image.alt}
          width={4096}
          height={2731}
          sizes="(max-width: 767px) 335px, 424px"
          loading="eager"
        />
      )}
      <div className={classNames("story-copy")}>
        {story.quote && (
          <>
            <h3>{story.serviceId === "sleep" ? "Sleep" : "Weight Loss"}</h3>
            <div
              className={classNames("stars")}
              role="img"
              aria-label={`${story.rating} out of 5 stars`}
            >
              {Array.from({ length: story.rating ?? 0 }, (_, i) => (
                <img
                  key={i}
                  src="/assets/cd386.svg"
                  width="24"
                  height="24"
                  alt=""
                />
              ))}
            </div>
            <p>{story.quote}</p>
          </>
        )}
      </div>
      <div className={classNames("story-bottom")}>
        <div>
          <strong>{story.name}</strong>
          <p>{story.location}</p>
        </div>
        <Socials light={Boolean(story.image)} onSelect={onShare} />
      </div>
    </article>
  );
}
