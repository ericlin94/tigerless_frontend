"use client";
import { useEffect, useRef, useState } from "react";
import type { NavigationItem } from "@/lib/contracts";
import { Action } from "./ui";
export function Navigation({
  items,
  onStart,
  onLogin,
  initialOpen = false,
}: {
  items: readonly NavigationItem[];
  onStart: () => void;
  onLogin: () => void;
  initialOpen?: boolean;
}) {
  const [open, setOpen] = useState(initialOpen);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const brand = (
    <a href="#top" aria-label="Apsu home" onClick={() => setOpen(false)}>
      <img
        src="/assets/b7463.svg"
        alt="Apsu"
        width="287"
        height="32"
        className="brand"
      />
    </a>
  );
  return (
    <>
      <header className="site-header">
        {brand}
        <nav aria-label="Main navigation" className="desktop-nav">
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="desktop-actions">
          <Action onClick={onStart}>Get started</Action>
          <Action variant="outline" onClick={onLogin}>
            Login
          </Action>
        </div>
        <button
          className="menu-trigger icon-button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <img src="/assets/cc879.svg" width="32" height="32" alt="" />
        </button>
      </header>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Navigation menu"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="menu-sheet">
          <div className="menu-header">
            {brand}
            <button
              className="icon-button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <img src="/assets/2146d.svg" width="32" height="32" alt="" />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="menu-actions">
            <Action
              onClick={() => {
                setOpen(false);
                onStart();
              }}
            >
              Get started
            </Action>
            <Action
              variant="outline"
              onClick={() => {
                setOpen(false);
                onLogin();
              }}
            >
              Login
            </Action>
          </div>
        </div>
      </dialog>
    </>
  );
}
