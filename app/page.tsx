"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  LogIn,
  Camera,
  Lock,
  Check,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { SiteFooter } from "./components/SiteFooter";

// Design read: redesign (overhaul layout, preserve Japandi brand tokens shared with the app).
// Consumer fitness landing, calm Japandi language. Dials: variance 7, motion 5, density 3.
// One accent (terracotta). Radius system: pills for actions, 20px for surfaces.

const ease = [0.16, 1, 0.3, 1] as const;

const navLinks = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#process", label: "Method" },
  { href: "/meal-prep", label: "Meal Prep" },
];

const steps = [
  {
    verb: "Position",
    desc: "Step into the frame. FitVision finds 33 body points with no calibration.",
    result: "33 body points found",
    tone: "bg-linen",
  },
  {
    verb: "Perform",
    desc: "Start your set. Guide lines sit on your own video and update as you move.",
    result: "Reps counted as you go",
    tone: "bg-[#d0d0c4]",
  },
  {
    verb: "Perfect",
    desc: "Joint angles are checked on every rep, so you hear about sagging form before it becomes a habit.",
    result: "Joint angles checked each rep",
    tone: "bg-[#e6d2c5]",
  },
];

const exercises = [
  "Squats",
  "Pushups",
  "Bicep Curls",
  "Shoulder Press",
  "Lunges",
  "Deadlifts",
  "Lateral Raises",
  "Glute Bridges",
  "Bulgarian Split Squats",
  "Pike Pushups",
  "Arnold Press",
  "Mountain Climbers",
  "Russian Twists",
  "Burpees",
  "Box Jumps",
];

const facts = [
  { value: "33", label: "body points tracked" },
  { value: "51", label: "exercises supported" },
  { value: "0", label: "video frames uploaded" },
  { value: "Free", label: "to start" },
];

function Reveal({
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
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const linkBase =
  "text-sm font-medium text-driftwood hover:text-charcoal transition-colors duration-300";
const btnPrimary =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-charcoal px-7 py-4 text-sm font-semibold text-parchment transition-all duration-300 hover:bg-terracotta active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";
const btnGhost =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-charcoal/25 px-7 py-4 text-sm font-semibold text-charcoal transition-all duration-300 hover:border-charcoal hover:bg-linen active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

export default function Home() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  const userBtn = (
    <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
  );

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-parchment font-sans text-charcoal selection:bg-terracotta selection:text-parchment">
      {/* Navigation */}
      <nav className="fixed inset-x-4 top-4 z-50 mx-auto max-w-[84rem] rounded-[28px] border border-warm-sand/40 bg-parchment/80 px-5 shadow-[0_10px_30px_-12px_rgba(60,56,49,0.25)] backdrop-blur-xl sm:inset-x-6 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-nobg.png"
              alt=""
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-display text-xl font-semibold tracking-tight">
              FitVision
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className={linkBase}
            >
              Dashboard
            </Link>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkBase}>
                {l.label}
              </Link>
            ))}
            {isSignedIn ? (
              userBtn
            ) : (
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-parchment transition-colors duration-300 hover:bg-terracotta"
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-4 pb-5 pt-2">
                <Link
                  href={isSignedIn ? "/dashboard" : "/sign-in"}
                  onClick={() => setMenuOpen(false)}
                  className={linkBase}
                >
                  Dashboard
                </Link>
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={linkBase}
                  >
                    {l.label}
                  </Link>
                ))}
                {isSignedIn ? (
                  userBtn
                ) : (
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-parchment"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero: full-bleed photo, light left scrim, facts strip along the bottom */}
      <header className="relative flex min-h-[100dvh] flex-col overflow-hidden">
        <Image
          src="/heropage.png"
          alt="Wooden dumbbells, a water bottle, a weight plate and a kettlebell laid out on linen"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* light scrim: just enough behind the headline, photo stays visible on the right */}
        <div className="absolute inset-0 bg-parchment/65 md:bg-gradient-to-r md:from-parchment/90 md:via-parchment/55 md:to-transparent" />
        <div className="relative mx-auto flex w-full max-w-[84rem] flex-1 items-center px-5 pb-10 pt-28 sm:px-8">
          <div className="max-w-3xl">
            <motion.h1
              className="font-display text-5xl font-semibold leading-[0.98] tracking-tighter sm:text-6xl lg:text-7xl"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              Your webcam, now a{" "}
              <span className="text-terracotta">personal trainer.</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-md text-lg leading-relaxed text-charcoal/80"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
            >
              FitVision tracks 33 body points in your browser, counts reps, and
              tells you when your form slips.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease }}
            >
              <Link
                href={isSignedIn ? "/dashboard" : "/tracker"}
                className={btnPrimary}
              >
                Start a session
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#process" className={btnGhost}>
                See how it works
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[84rem] px-5 pb-8 sm:px-8">
          <motion.dl
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-parchment/60 bg-warm-sand/40 shadow-[0_20px_40px_-24px_rgba(60,56,49,0.45)] backdrop-blur-xl md:grid-cols-4"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            {facts.map((f) => (
              <div key={f.label} className="bg-parchment/80 px-6 py-5">
                <dt className="font-display text-4xl font-semibold tracking-tighter sm:text-5xl">
                  {f.value}
                </dt>
                <dd className="mt-1 text-sm text-driftwood">{f.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </header>

      {/* Method: a real sequence, so the steps stack in order as you scroll */}
      <section id="process" className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="self-start lg:sticky lg:top-28 lg:col-span-4">
            <p className="text-sm font-semibold text-terracotta">The method</p>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-5xl">
              Three steps from standing to correcting.
            </h2>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-8">
            {steps.map((s, i) => (
              <div
                key={s.verb}
                style={{ top: `${6 + i * 1.25}rem` }}
                className={`sticky flex min-h-[20rem] flex-col justify-between gap-10 rounded-[20px] p-8 shadow-[0_-12px_30px_-20px_rgba(60,56,49,0.35)] sm:p-10 ${s.tone}`}
              >
                <span className="font-display text-6xl font-semibold tabular-nums text-charcoal/25">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-5xl font-semibold tracking-tighter sm:text-6xl">
                    {s.verb}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-driftwood">{s.desc}</p>
                  <p className="mt-6 inline-block rounded-full bg-parchment px-4 py-2 text-sm font-semibold">
                    {s.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / privacy: what stays on the device vs what is saved */}
      <section id="philosophy" className="mx-auto max-w-[84rem] px-5 py-24 sm:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-6xl">
            Your video never leaves your browser.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-driftwood">
            Pose detection runs on your device. Only the results of a session
            are saved to your account.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-[20px] bg-sage/20 p-8 sm:p-10">
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Stays on your device
              </h3>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  [Camera, "Camera frames"],
                  [Lock, "Body-tracking data"],
                ].map(([Icon, t]) => {
                  const I = Icon as typeof Camera;
                  return (
                    <li key={t as string} className="flex items-center gap-3 rounded-xl bg-parchment px-4 py-3">
                      <I className="h-5 w-5 text-sage" />
                      {t as string}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-driftwood">
                Processed in the browser tab. Close it and nothing keeps running.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 text-sm font-medium text-driftwood md:flex-col">
              <ArrowRight className="h-6 w-6 rotate-90 text-terracotta md:rotate-0" />
              <span>Results only</span>
            </div>

            <div className="rounded-[20px] bg-terracotta/15 p-8 sm:p-10">
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                Saved to your account
              </h3>
              <ul className="mt-6 flex flex-col gap-3">
                {["Exercise and session length", "Rep counts", "Your workout history"].map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-xl bg-parchment px-4 py-3">
                    <Check className="h-5 w-5 text-terracotta" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-driftwood">
                Angles and reps are computed locally, then saved so you can see progress.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Exercises: breadth as an auto-scrolling strip (pauses on hover, static under reduced motion) */}
      <section className="py-24">
        <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-6xl">
              51 exercises, from curls to burpees.
            </h2>
          </Reveal>
        </div>
        <div className="exercise-strip mt-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="exercise-track flex w-max">
            {[...exercises, ...exercises].map((name, i) => (
              <Link
                key={i}
                href={isSignedIn ? "/workouts" : "/tracker"}
                aria-hidden={i >= exercises.length}
                tabIndex={i >= exercises.length ? -1 : 0}
                className="mr-3 shrink-0 whitespace-nowrap rounded-full border border-warm-sand bg-parchment px-6 py-3 font-display text-lg font-medium transition-colors duration-300 hover:border-terracotta hover:bg-terracotta hover:text-parchment"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Meal prep bento: 4 items, 4 cells, no photo */}
      <section className="mx-auto max-w-[84rem] px-5 pb-24 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold text-terracotta">Meal prep</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-6xl">
            Eat for the training you just did.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <div className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-terracotta/15 p-8 sm:p-10">
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Plans built around your goal
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-driftwood">
                  Tell it your diet and target. Get a full week of meals.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Days covered by a plan">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <li
                    key={d}
                    className="rounded-full bg-parchment px-4 py-2 font-display text-sm font-semibold"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-sage/20 p-8">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  Recipes with prep steps
                </h3>
                <p className="mt-3 leading-relaxed text-driftwood">
                  Every meal comes with ingredients and clear instructions.
                </p>
              </div>
              <ol className="flex flex-col gap-2 font-display text-lg font-semibold">
                {["Ingredients", "Prep", "Cook"].map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-parchment text-sm tabular-nums">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-linen p-8">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">
                  One grocery list
                </h3>
                <p className="mt-3 leading-relaxed text-driftwood">
                  Every ingredient in the plan, gathered in one place.
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {["Rolled oats", "Greek yoghurt", "Baby spinach", "Chicken thighs"].map((g) => (
                  <li key={g} className="flex items-center gap-3 rounded-xl bg-parchment px-4 py-3 text-sm">
                    <Check className="h-4 w-4 text-sage" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.24} className="md:col-span-4">
            <div className="flex h-full flex-col justify-between gap-10 rounded-[20px] bg-warm-sand/35 p-8 sm:p-10">
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Macros for every meal
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-driftwood">
                  Calories, protein, carbs and fat are worked out per meal, so
                  you can match food to the day you trained.
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Calories", "kcal"],
                  ["Protein", "g"],
                  ["Carbs", "g"],
                  ["Fat", "g"],
                ].map(([k, u]) => (
                  <div key={k} className="rounded-xl bg-parchment px-4 py-3">
                    <dt className="font-display text-lg font-semibold">{k}</dt>
                    <dd className="text-sm text-driftwood">{u} per meal</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
        <div className="mt-8">
          <Link
            href={isSignedIn ? "/meal-prep" : "/sign-in"}
            className={btnPrimary}
          >
            Open meal prep
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      {!isSignedIn && (
        <section className="mx-auto max-w-[84rem] px-5 pb-28 sm:px-8">
          <Reveal className="rounded-[28px] bg-charcoal px-7 py-16 text-parchment sm:px-14 sm:py-20">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-6xl">
              Save your sessions and watch your form improve.
            </h2>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-parchment px-7 py-4 text-sm font-semibold text-charcoal transition-all duration-300 hover:bg-terracotta hover:text-parchment active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment"
              >
                Create free account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-parchment/40 px-7 py-4 text-sm font-semibold text-parchment transition-colors duration-300 hover:border-parchment hover:bg-parchment/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment"
              >
                I already have an account
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
