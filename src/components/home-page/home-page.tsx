"use client";
import { useState } from "react";
import Image from "next/image";
import type { HomeContent, ServiceId } from "@/lib/contracts";
import { Action, ActionLink, Benefits, Price } from "../ui/ui";
import { Navigation } from "../navigation/navigation";
import { FaqList } from "../faq/faq";
import { BmiCalculator } from "../bmi-calculator/bmi-calculator";
import { FeatureCarousel } from "../feature-carousel/feature-carousel";
import { Socials } from "../ui/socials";
import { ServicePanel } from "../service-panel/service-panel";
import { StoryCard } from "../story-card/story-card";
import { TrustStrip } from "../trust-strip/trust-strip";
import {
  ConsultationDialog,
  type DialogMode,
} from "../consultation-dialog/consultation-dialog";
import { createClassNames } from "@/lib/component-class-names";
import uiStyles from "../ui/ui.module.css";
import styles from "./home-page.module.css";
const classNames = createClassNames({ ...uiStyles, ...styles });

export function HomePage({ content }: { content: HomeContent }) {
  const [mode, setMode] = useState<DialogMode | null>(null);
  const start = (serviceId: ServiceId = "weight-loss") =>
    setMode({ kind: "consultation", serviceId });
  const share = (name: string) => {
    setMode({
      kind: "information",
      title: `Share on ${name}`,
      body: "This preview does not publish to social media. You can share this page by copying its URL.",
    });
  };
  return (
    <>
      <a href="#main" className={classNames("skip-link")}>
        Skip to content
      </a>
      <main id="main" className={classNames("home-shell")}>
        <section className={classNames("hero-band")} id="top">
          <Navigation
            items={content.navigation}
            onStart={() => start()}
            onLogin={() => setMode({ kind: "login" })}
          />
          <div className={classNames("hero-copy")}>
            <div className={classNames("trust-badges")}>
              {[
                ["a9b63.svg", "40+ Languages"],
                ["edf75.svg", "US-licensed physicians"],
                ["651f6.svg", "Free expedited shipping"],
              ].map(([file, label]) => (
                <span key={label}>
                  <img src={`/assets/${file}`} width="20" height="20" alt="" />
                  {label}
                </span>
              ))}
            </div>
            <h1>
              Healthcare that <span>speaks your language.</span>
            </h1>
            <p>
              Care in the language you think in.
              <br />
              US-licensed physicians, AI translates your consultation.
            </p>
            <Action arrow onClick={() => start()}>
              Start a free consultation
            </Action>
            <div
              className={classNames("language-bands")}
              aria-label="Some of our supported languages"
            >
              {[content.languages.slice(0, 6), content.languages.slice(6)].map(
                (row, i) => (
                  <div key={i} className={classNames("language-row")}>
                    {[...row, ...row].map((language, j) => (
                      <span
                        key={`${j}-${language}`}
                        className={classNames(j % 6 === 1 ? "highlight" : "")}
                        aria-hidden={j >= row.length ? true : undefined}
                        dir="auto"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className={classNames("service-summaries")}>
            {content.services.map((service) => (
              <article
                className={classNames(`summary-card tone-${service.tone}`)}
                key={service.id}
              >
                <div>
                  <p className={classNames("eyebrow")}>{service.label}</p>
                  <h3>{service.summary}</h3>
                </div>
                <Image
                  className={classNames(
                    `summary-person${service.id === "weight-loss" ? " summary-person-weight" : ""}`,
                  )}
                  src={service.portrait.src}
                  alt={service.portrait.alt}
                  width={service.id === "weight-loss" ? 1185 : 700}
                  height={service.id === "weight-loss" ? 1327 : 800}
                  sizes="(max-width: 767px) 155px, 245px"
                  loading="eager"
                />
                <ActionLink href={`#${service.id}`}>See plans</ActionLink>
              </article>
            ))}
          </div>
        </section>
        <div className={classNames("trust-strip-wrap")}>
          <TrustStrip />
        </div>
        <section className={classNames("how-section")} id="how-it-works">
          <p className={classNames("eyebrow")}>How it works</p>
          <h2>
            Real physicians, <span>AI-amplified.</span>
          </h2>
          <p className={classNames("section-description")}>
            Two layers working together, each doing what they do best.
          </p>
          <div className={classNames("care-grid")}>
            {content.careLayers.map((layer, i) => (
              <article key={layer.id} className={classNames("care-card")}>
                <span className={classNames("care-number")} aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3>{layer.title}</h3>
                  <p>{layer.description}</p>
                  <Benefits items={layer.benefits} />
                </div>
              </article>
            ))}
          </div>
          <p className={classNames("care-footnote")}>
            The AI handles the language. Your physician makes the medical
            decisions.
          </p>
        </section>
        <div className={classNames("services-container")}>
          <ServicePanel service={content.services[0]} onStart={start} />
          <section
            id="plans"
            className={classNames("plan-grid")}
            aria-label="Weight loss plans"
          >
            {content.plans.map((plan) => (
              <article className={classNames("plan-card")} key={plan.id}>
                <div className={classNames("plan-image-slot")}>
                  <Image
                    src={plan.image.src}
                    alt={plan.image.alt}
                    width={4096}
                    height={4096}
                    sizes="(max-width: 767px) 287px, 600px"
                    loading="eager"
                  />
                </div>
                <h3>{plan.name}</h3>
                <div className={classNames("plan-bottom")}>
                  <Price amount={plan.price.amount} />
                  <Action arrow onClick={() => start(plan.serviceId)}>
                    Get started
                  </Action>
                </div>
                <small>{plan.disclaimer}</small>
              </article>
            ))}
          </section>
          <BmiCalculator />
          <div className={classNames("other-services")}>
            {content.services.slice(1).map((service) => (
              <ServicePanel
                key={service.id}
                service={service}
                onStart={start}
              />
            ))}
          </div>
          <FeatureCarousel items={content.features} />
        </div>
        <section className={classNames("stories-section")}>
          <h2>
            Our <span>Success Stories</span>
          </h2>
          <p className={classNames("section-description")}>
            Care that finally made sense.
          </p>
          <div className={classNames("stories-grid")}>
            {content.testimonials.map((story) => (
              <StoryCard key={story.id} story={story} onShare={share} />
            ))}
          </div>
        </section>
        <section className={classNames("faq-section")} id="faqs">
          <div>
            <p className={classNames("eyebrow")}>FAQs</p>
            <h2>
              Frequently
              <br />
              Asked Questions
            </h2>
            <p className={classNames("section-description")}>
              Have more questions? Our care team is here to help in your
              language.
            </p>
          </div>
          <FaqList items={content.faqs} />
        </section>
        <section className={classNames("closing-band")} id="contact">
          <div className={classNames("closing-cta")}>
            <picture className={classNames("closing-watermark")}>
              <source media="(max-width: 767px)" srcSet="/assets/7815b.svg" />
              <img src="/assets/b922f.svg" alt="" />
            </picture>
            <div>
              <h2>Ready for healthcare in your language?</h2>
              <p>
                No appointment needed <span aria-hidden="true"> · </span> No
                insurance required
              </p>
            </div>
            <Action arrow onClick={() => start()}>
              Start a free consultation
            </Action>
          </div>
        </section>
        <footer className={classNames("site-footer")}>
          <div className={classNames("footer-top")}>
            <div className={classNames("footer-brand")}>
              <img src="/assets/1b7c5.svg" alt="Apsu" width="228" height="83" />
              <p>American medicine, in the language you think in.</p>
            </div>
            <div className={classNames("footer-links")}>
              {content.footerGroups.map((group) => (
                <nav key={group.title} aria-label={group.title}>
                  <h3>{group.title}</h3>
                  {group.links.map((link) => (
                    <a key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              ))}
            </div>
          </div>
          <div className={classNames("footer-disclaimer")}>
            <p>{content.disclaimer}</p>
            <p>
              By using our services, you agree to our{" "}
              <a href="/information/terms">Terms &amp; Conditions.</a>
            </p>
          </div>
          <div className={classNames("footer-bottom")}>
            <div className={classNames("footer-socials")}>
              {[
                ["X", "e25de.svg"],
                ["Facebook", "4c36b.svg"],
                ["Instagram", "e69af.svg"],
                ["LinkedIn", "6e7c3.svg"],
              ].map(([name, file]) => (
                <button
                  key={name}
                  className={classNames("icon-button")}
                  aria-label={`Apsu on ${name}`}
                  title={`Apsu on ${name}`}
                  onClick={() => share(name)}
                >
                  <img src={`/assets/${file}`} width="24" height="24" alt="" />
                </button>
              ))}
            </div>
            <p>© 2026 APSU. All rights reserved.</p>
          </div>
          <picture className={classNames("footer-watermark")}>
            <source media="(max-width: 767px)" srcSet="/assets/0d122.svg" />
            <img src="/assets/4caf7.svg" alt="" />
          </picture>
        </footer>
      </main>
      <ConsultationDialog
        mode={mode}
        onClose={() => setMode(null)}
        languages={content.languages}
      />
    </>
  );
}
