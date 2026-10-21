"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const KEY = "fv-cookie-notice";
const EVENT = "fv-cookie-notice-change";

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
let dismissed = false; // fallback when storage is blocked
const read = () => {
  if (dismissed) return "accepted";
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export function CookieBanner() {
  // Server snapshot is "accepted" so nothing renders until the client has read storage.
  const choice = useSyncExternalStore(subscribe, read, () => "accepted");
  const show = !choice;
  const reduce = useReducedMotion();

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {}
    dismissed = true;
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Cookie notice"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-3xl flex-col gap-4 rounded-[20px] border border-warm-sand/50 bg-parchment/95 p-5 shadow-[0_20px_40px_-16px_rgba(60,56,49,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <p className="text-sm leading-relaxed text-charcoal">
            FitVision uses only essential cookies to keep you signed in and
            remember your settings. No tracking or advertising cookies.{" "}
            <Link href="/cookies" className="font-semibold underline underline-offset-2 hover:text-terracotta">
              Cookie policy
            </Link>
          </p>
          <button
            onClick={dismiss}
            className="shrink-0 whitespace-nowrap rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-parchment transition-colors duration-300 hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
