"use client";
import { useState } from "react";
import type { Faq } from "@/lib/contracts";
export function FaqItem({
  item,
  expanded,
  onToggle,
}: {
  item: Faq;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`faq-item ${expanded ? "expanded" : ""}`}>
      <h3>
        <button
          id={`question-${item.id}`}
          aria-expanded={expanded}
          aria-controls={`answer-${item.id}`}
          onClick={onToggle}
        >
          <span>{item.question}</span>
          <span className="faq-chevron">
            <img src="/assets/4a04e.svg" width="24" height="24" alt="" />
          </span>
        </button>
      </h3>
      <div
        id={`answer-${item.id}`}
        role="region"
        aria-labelledby={`question-${item.id}`}
        className="faq-answer"
        hidden={!expanded}
      >
        <p>{item.answer}</p>
      </div>
    </article>
  );
}
export function FaqList({
  items,
  initialOpenId = items[0]?.id,
}: {
  items: readonly Faq[];
  initialOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | undefined>(initialOpenId);
  return (
    <div className="faq-list">
      {items.map((item) => (
        <FaqItem
          key={item.id}
          item={item}
          expanded={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? undefined : item.id)}
        />
      ))}
    </div>
  );
}
