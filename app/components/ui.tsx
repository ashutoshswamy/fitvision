"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppNav } from "./AppNav";
import { SiteFooter } from "./SiteFooter";

export const ease = [0.16, 1, 0.3, 1] as const;

/** Shared button styles (pill actions, 20px surfaces: the app's radius system). */
export const btnPrimary =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-charcoal px-6 py-3.5 text-sm font-semibold text-parchment transition-all duration-300 hover:bg-terracotta active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-charcoal/25 px-6 py-3.5 text-sm font-semibold text-charcoal transition-all duration-300 hover:border-charcoal hover:bg-linen active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Nav + page container + footer for signed-in pages. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-parchment font-sans text-charcoal selection:bg-terracotta selection:text-parchment">
      <AppNav />
      {children}
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  title,
  accent,
  intro,
  children,
}: {
  title: string;
  accent?: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[84rem] px-5 pb-10 pt-32 sm:px-8">
      <h1 className="font-display text-4xl font-semibold leading-[1] tracking-tighter sm:text-6xl">
        {title}
        {accent && <span className="text-terracotta"> {accent}</span>}
      </h1>
      {intro && <p className="mt-4 max-w-xl text-lg leading-relaxed text-driftwood">{intro}</p>}
      {children}
    </header>
  );
}

export function Spinner() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-parchment">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
    </div>
  );
}
