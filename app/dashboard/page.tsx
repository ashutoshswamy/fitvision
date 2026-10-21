"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  Trash2,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { PageShell, PageHeader, Reveal, Spinner, btnPrimary, btnGhost } from "../components/ui";
import { useRouter } from "next/navigation";

interface UserStats {
  totalSessions: number;
  totalExercises: number;
  totalReps: number;
  avgPrecision: number;
}

interface SavedPlan {
  id: string;
  name: string;
  summary: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  // Fetch user stats
  useEffect(() => {
    if (!isSignedIn) return;
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/workouts?type=stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
        }
      } catch {
        // Stats are optional; fail silently
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, [isSignedIn]);

  // Fetch saved plans
  useEffect(() => {
    if (!isSignedIn) return;
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans?type=all");
        if (res.ok) {
          const data = await res.json();
          setSavedPlans(data.plans ?? []);
        }
      } catch {
        // fail silently
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, [isSignedIn]);

  const handleDeletePlan = async (planId: string) => {
    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", plan_id: planId }),
      });
      if (res.ok) {
        setSavedPlans((prev) => prev.filter((p) => p.id !== planId));
      }
    } catch {
      // fail silently
    }
  };

  if (!isLoaded || !isSignedIn) return <Spinner />;

  const firstName = user?.firstName || "there";
  const hasStats = !loadingStats && stats && stats.totalSessions > 0;

  return (
    <PageShell>
      <PageHeader
        title="Welcome back,"
        accent={`${firstName}.`}
        intro="Pick up your plan or open the camera and start a set."
      />

      {/* Stats: plain numbers, shown once there is history */}
      {hasStats && stats && (
        <section className="mx-auto max-w-[84rem] px-5 pb-12 sm:px-8">
          <dl className="grid grid-cols-2 gap-y-8 border-t border-warm-sand/50 pt-8 md:grid-cols-4">
            {[
              ["Sessions", stats.totalSessions],
              ["Exercises", stats.totalExercises],
              ["Total reps", stats.totalReps],
              ["Average precision", `${stats.avgPrecision}%`],
            ].map(([k, v]) => (
              <div key={k as string}>
                <dd className="font-display text-4xl font-semibold tabular-nums tracking-tighter sm:text-5xl">{v}</dd>
                <dt className="mt-1 text-sm text-driftwood">{k}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Actions: one big primary panel, two supporting ones */}
      <section className="mx-auto max-w-[84rem] px-5 pb-20 sm:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex h-full min-h-[22rem] flex-col justify-between gap-12 rounded-[20px] bg-terracotta/15 p-8 sm:p-10">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                  Start today&apos;s workout
                </h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-driftwood">
                  Run the exercises from your active plan with live form
                  tracking, or open the camera and pick your own.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/plan-workout" className={btnPrimary}>
                  <Play className="h-4 w-4" />
                  Start plan workout
                </Link>
                <Link href="/tracker" className={btnGhost}>
                  Open the camera
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            <Reveal delay={0.08}>
              <Link
                href="/suggestions"
                className="group flex h-full flex-col justify-between gap-8 rounded-[20px] bg-sage/20 p-8 transition-colors duration-300 hover:bg-sage/30"
              >
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">Get an AI plan</h2>
                  <p className="mt-2 leading-relaxed text-driftwood">
                    A weekly plan based on your level, goals and health.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Create a plan
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                href="/workouts"
                className="group flex h-full flex-col justify-between gap-8 rounded-[20px] bg-linen p-8 transition-colors duration-300 hover:bg-warm-sand/40"
              >
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">Browse exercises</h2>
                  <p className="mt-2 leading-relaxed text-driftwood">
                    All 51 exercises, each with live pose tracking.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  See exercises
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
        <p className="mt-6 text-sm text-driftwood">
          Looking for past sessions?{" "}
          <Link href="/history" className="font-semibold text-charcoal underline underline-offset-4 hover:text-terracotta">
            Open your history
          </Link>
        </p>
      </section>

      {/* Saved plans */}
      <section className="mx-auto max-w-[84rem] px-5 pb-24 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tighter sm:text-4xl">
            My plans{savedPlans.length > 0 && <span className="ml-3 text-driftwood">{savedPlans.length}</span>}
          </h2>
          <Link href="/suggestions" className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-charcoal">
            <Sparkles className="h-4 w-4" />
            New plan
          </Link>
        </div>

        {loadingPlans ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-driftwood" />
          </div>
        ) : savedPlans.length === 0 ? (
          <div className="mt-8 rounded-[20px] bg-linen p-8 sm:p-12">
            <h3 className="font-display text-2xl font-semibold tracking-tight">No saved plans yet</h3>
            <p className="mt-2 max-w-md leading-relaxed text-driftwood">
              Generate a plan and save it. It will show up here, ready to start.
            </p>
            <Link href="/suggestions" className={`${btnPrimary} mt-6`}>
              <Sparkles className="h-4 w-4" />
              Generate a plan
            </Link>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {savedPlans.map((plan) => (
              <motion.li
                key={plan.id}
                layout
                className="flex flex-col justify-between gap-6 rounded-[20px] bg-linen p-6"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{plan.name || "Untitled plan"}</h3>
                  <p className="mt-2 line-clamp-2 leading-relaxed text-driftwood">
                    {plan.summary || "No summary available"}
                  </p>
                  <p className="mt-3 text-sm text-driftwood">
                    Saved{" "}
                    {new Date(plan.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/plan-workout?plan_id=${plan.id}`} className={`${btnPrimary} flex-1`}>
                    <Play className="h-4 w-4" />
                    Start workout
                  </Link>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="rounded-full border border-charcoal/25 p-3.5 text-driftwood transition-colors duration-300 hover:border-red-700 hover:text-red-700"
                    aria-label={`Delete ${plan.name || "plan"}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
