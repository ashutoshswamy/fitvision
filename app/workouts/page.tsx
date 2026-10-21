"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXERCISES } from "../lib/exercises";
import { PageShell, PageHeader, Reveal } from "../components/ui";

type Level = "Beginner" | "Intermediate" | "Advanced";
const LEVELS: ("All" | Level)[] = ["All", "Beginner", "Intermediate", "Advanced"];

const levelTone: Record<Level, string> = {
  Beginner: "bg-sage/20 text-charcoal",
  Intermediate: "bg-terracotta/15 text-charcoal",
  Advanced: "bg-warm-sand/50 text-charcoal",
};

export default function WorkoutsPage() {
  const [level, setLevel] = useState<"All" | Level>("All");
  const shown = EXERCISES.filter((e) => level === "All" || e.difficulty === level);

  return (
    <PageShell>
      <PageHeader
        title="Choose an"
        accent="exercise."
        intro="Each one is tracked live with 33 body landmarks. Only movements with reliable joint-angle detection are included."
      />

      <section className="mx-auto max-w-[84rem] px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by difficulty">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              aria-pressed={level === l}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                level === l
                  ? "border-charcoal bg-charcoal text-parchment"
                  : "border-warm-sand bg-parchment text-charcoal hover:border-charcoal"
              }`}
            >
              {l}
            </button>
          ))}
          <span className="ml-auto text-sm text-driftwood" aria-live="polite">
            {shown.length} exercise{shown.length !== 1 ? "s" : ""}
          </span>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((exercise, i) => (
            <li key={exercise.type}>
              <Reveal delay={Math.min(i % 3, 2) * 0.05}>
                <Link
                  href={`/tracker?exercise=${encodeURIComponent(exercise.type)}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-[20px] bg-linen p-6 transition-colors duration-300 hover:bg-warm-sand/40"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-terracotta">
                        {exercise.type}
                      </h2>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-driftwood transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracotta" />
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-driftwood">
                      {exercise.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-driftwood">{exercise.muscles.join(", ")}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
                      <span className={`rounded-full px-3 py-1 ${levelTone[exercise.difficulty]}`}>
                        {exercise.difficulty}
                      </span>
                      <span className="rounded-full bg-parchment px-3 py-1">{exercise.targetReps} reps</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
