"use client";
import { useState } from "react";
import Image from "next/image";
import type {
  HomeContent,
  Service,
  ServiceId,
  Testimonial,
} from "@/lib/contracts";
import { Action, ActionLink, Benefits, Price } from "./ui";
import { Navigation } from "./navigation";
import { FaqList } from "./faq";
import { BmiCalculator } from "./bmi-calculator";
import { FeatureCarousel } from "./feature-carousel";
import { TrustStrip } from "./trust-strip";
import { ConsultationDialog, type DialogMode } from "./consultation-dialog";

function Socials({
  light = false,
  onSelect,
}: {
  light?: boolean;
  onSelect: (name: string) => void;
}) {
  return (
    <div className={`socials ${light ? "light" : ""}`}>
      {[
        ["X", light ? "60c51.svg" : "e25de.svg"],
        ["Instagram", light ? "6d12b.svg" : "e69af.svg"],
        ["LinkedIn", light ? "6f28b.svg" : "52348.svg"],
      ].map(([name, file]) => (
        <button
          key={name}
          className="icon-button"
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
      className={`service-panel tone-${service.tone} ${isSleep ? "service-reverse" : ""} ${isWeight ? "weight-panel" : ""}`}
      aria-labelledby={`${service.id}-title`}
    >
      <div className="service-copy">
        {isWeight && <p className="eyebrow">Weight Loss</p>}
        <h2 id={`${service.id}-title`}>{service.title}</h2>
        {service.description && <p>{service.description}</p>}
        <Benefits items={service.benefits} />
        <div className="service-action">
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
      <div className="portrait-slot">
        <Image
          className="service-portrait"
          src={service.portrait.src}
          alt={service.portrait.alt}
          width={700}
          height={800}
          sizes="(max-width: 767px) 335px, 660px"
          loading="eager"
        />
        {isSleep && (
          <div
            className="health-widgets"
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
              <div className="health-progress" />
              <span>82%</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export function StoryCard({
  story,
  onShare,
}: {
  story: Testimonial;
  onShare: (name: string) => void;
}) {
  return (
    <article className={`story-card ${story.image ? "story-photo" : ""}`}>
      {story.image && (
        <Image
          className="story-image"
          src={story.image.src}
          alt={story.image.alt}
          width={4096}
          height={2731}
          sizes="(max-width: 767px) 335px, 424px"
          loading="eager"
        />
      )}
      <div className="story-copy">
        {story.quote && (
          <>
            <h3>{story.serviceId === "sleep" ? "Sleep" : "Weight Loss"}</h3>
            <div
              className="stars"
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
      <div className="story-bottom">
        <div>
          <strong>{story.name}</strong>
          <p>{story.location}</p>
        </div>
        <Socials light={Boolean(story.image)} onSelect={onShare} />
      </div>
    </article>
  );
}
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
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <main id="main" className="home-shell">
        <section className="hero-band" id="top">
          <Navigation
            items={content.navigation}
            onStart={() => start()}
            onLogin={() => setMode({ kind: "login" })}
          />
          <div className="hero-copy">
            <div className="trust-badges">
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
              className="language-bands"
              aria-label="Some of our supported languages"
            >
              {[content.languages.slice(0, 6), content.languages.slice(6)].map(
                (row, i) => (
                  <div key={i} className="language-row">
                    {[...row, ...row].map((language, j) => (
                      <span
                        key={`${j}-${language}`}
                        className={j % 6 === 1 ? "highlight" : ""}
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
          <div className="service-summaries">
            {content.services.map((service) => (
              <article
                className={`summary-card tone-${service.tone}`}
                key={service.id}
              >
                <div>
                  <p className="eyebrow">{service.label}</p>
                  <h3>{service.summary}</h3>
                </div>
                <Image
                  className={`summary-person${service.id === "weight-loss" ? " summary-person-weight" : ""}`}
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
        <div className="trust-strip-wrap">
          <TrustStrip />
        </div>
        <section className="how-section" id="how-it-works">
          <p className="eyebrow">How it works</p>
          <h2>
            Real physicians, <span>AI-amplified.</span>
          </h2>
          <p className="section-description">
            Two layers working together, each doing what they do best.
          </p>
          <div className="care-grid">
            {content.careLayers.map((layer, i) => (
              <article key={layer.id} className="care-card">
                <span className="care-number" aria-hidden="true">
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
          <p className="care-footnote">
            The AI handles the language. Your physician makes the medical
            decisions.
          </p>
        </section>
        <div className="services-container">
          <ServicePanel service={content.services[0]} onStart={start} />
          <section
            id="plans"
            className="plan-grid"
            aria-label="Weight loss plans"
          >
            {content.plans.map((plan) => (
              <article className="plan-card" key={plan.id}>
                <div className="plan-image-slot">
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
                <div className="plan-bottom">
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
          <div className="other-services">
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
        <section className="stories-section">
          <h2>
            Our <span>Success Stories</span>
          </h2>
          <p className="section-description">Care that finally made sense.</p>
          <div className="stories-grid">
            {content.testimonials.map((story) => (
              <StoryCard key={story.id} story={story} onShare={share} />
            ))}
          </div>
        </section>
        <section className="faq-section" id="faqs">
          <div>
            <p className="eyebrow">FAQs</p>
            <h2>
              Frequently
              <br />
              Asked Questions
            </h2>
            <p className="section-description">
              Have more questions? Our care team is here to help in your
              language.
            </p>
          </div>
          <FaqList items={content.faqs} />
        </section>
        <section className="closing-band" id="contact">
          <div className="closing-cta">
            <picture className="closing-watermark">
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
        <footer className="site-footer">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/assets/1b7c5.svg" alt="Apsu" width="228" height="83" />
              <p>American medicine, in the language you think in.</p>
            </div>
            <div className="footer-links">
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
          <div className="footer-disclaimer">
            <p>{content.disclaimer}</p>
            <p>
              By using our services, you agree to our{" "}
              <a href="/information/terms">Terms &amp; Conditions.</a>
            </p>
          </div>
          <div className="footer-bottom">
            <div className="footer-socials">
              {[
                ["X", "e25de.svg"],
                ["Facebook", "4c36b.svg"],
                ["Instagram", "e69af.svg"],
                ["LinkedIn", "6e7c3.svg"],
              ].map(([name, file]) => (
                <button
                  key={name}
                  className="icon-button"
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
          <picture className="footer-watermark">
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
