"use client";

import Link from "next/link";
import { EXERCISES } from "../lib/exercises";
import { ArrowRight, } from "lucide-react";
import { motion, } from "framer-motion";
import { AppNav } from "../components/AppNav";
import { SiteFooter } from "../components/SiteFooter";

const DifficultyBadge = ({
  level,
}: {
  level: "Beginner" | "Intermediate" | "Advanced";
}) => {
  const colors = {
    Beginner: "bg-sage/15 text-sage",
    Intermediate: "bg-terracotta/15 text-terracotta",
    Advanced: "bg-muted-clay/15 text-muted-clay",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[level]}`}
    >
      {level}
    </span>
  );
};

export default function WorkoutsPage() {
  

  return (
    <div className="min-h-[100dvh] bg-parchment text-charcoal font-sans selection:bg-terracotta selection:text-parchment">
      {/* Navigation */}
      <AppNav />

      {/* Header */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-[75rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 text-xs text-sage font-semibold mb-4 sm:mb-6"
          >
            <span className="w-8 h-px bg-sage"></span>
            <span>Real-Time Pose Tracking</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl tracking-tighter text-charcoal leading-[1] mb-4 sm:mb-6"
          >
            Available{" "}
            <span className="text-terracotta">
              workouts.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-driftwood max-w-lg leading-relaxed"
          >
            Each exercise is tracked in real-time using 33 body landmarks. Only
            movements with reliable joint-angle detection are included.
          </motion.p>
        </div>
      </section>

      {/* Workout Grid */}
      <section className="pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-[75rem] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {EXERCISES.map((exercise, i) => (
              <motion.div
                key={exercise.type}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/tracker?exercise=${encodeURIComponent(exercise.type)}`}
                  className="group block bg-linen rounded-2xl p-5 sm:p-8 border border-warm-sand/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <DifficultyBadge level={exercise.difficulty} />
                    <span className="text-xs text-warm-sand font-mono">
                      {exercise.targetReps} reps
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium text-charcoal tracking-wide mb-2 sm:mb-3 group-hover:text-terracotta transition-colors duration-300">
                    {exercise.type}
                  </h3>

                  <p className="text-sm text-driftwood leading-relaxed mb-6">
                    {exercise.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {exercise.muscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-3 py-1 rounded-full bg-parchment text-xs text-driftwood border border-warm-sand/50"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-terracotta font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Start tracking</span>
                    <ArrowRight />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
