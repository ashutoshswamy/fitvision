"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { PageShell, PageHeader, Spinner, btnPrimary } from "../components/ui";
import { useRouter } from "next/navigation";

interface WorkoutExercise {
  id: string;
  exercise_type: string;
  sets_completed: number;
  reps_completed: number;
  target_reps: number | null;
  precision_avg: number | null;
  duration_sec: number | null;
  created_at: string;
}

interface WorkoutSession {
  id: string;
  started_at: string;
  ended_at: string | null;
  duration_sec: number | null;
  notes: string | null;
  source: "manual" | "ai_plan";
  workout_exercises: WorkoutExercise[];
}

interface UserStats {
  totalSessions: number;
  totalExercises: number;
  totalReps: number;
  avgPrecision: number;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs}h ${remainMins}m`;
}

const monthOf = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short" });
const dayOf = (d: string) => new Date(d).getDate();
const longDate = (d: string) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
const timeOf = (d: string) =>
  new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

export default function HistoryPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (sessionId: string) => {
    if (deletingId) return;
    setDeletingId(sessionId);
    try {
      const res = await fetch(`/api/workouts?session_id=${sessionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        if (expandedSession === sessionId) setExpandedSession(null);
        // Refresh stats
        const statsRes = await fetch("/api/workouts?type=stats");
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data.stats);
        }
      }
    } catch {
      // fail silently
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (!isSignedIn) return;
    const fetchData = async () => {
      try {
        const [sessionsRes, statsRes] = await Promise.all([
          fetch("/api/workouts?type=sessions&limit=50"),
          fetch("/api/workouts?type=stats"),
        ]);
        if (sessionsRes.ok) {
          const data = await sessionsRes.json();
          setSessions(data.sessions ?? []);
        }
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data.stats);
        }
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isSignedIn]);

  if (!isLoaded || !isSignedIn) return <Spinner />;

  return (
    <PageShell>
      <PageHeader title="Workout" accent="history." intro="Every session you have saved, newest first." />

      {stats && stats.totalSessions > 0 && (
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

      <section className="mx-auto max-w-[84rem] px-5 pb-24 sm:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-sage border-t-transparent" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-[20px] bg-linen p-8 sm:p-12">
            <h2 className="font-display text-2xl font-semibold tracking-tight">No workouts yet</h2>
            <p className="mt-2 max-w-md leading-relaxed text-driftwood">
              Finish a set with the camera and save it. Your sessions and stats will show up here.
            </p>
            <Link href="/tracker" className={`${btnPrimary} mt-6`}>
              Start a workout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {sessions.map((session, i) => {
              const isExpanded = expandedSession === session.id;
              const totalReps = session.workout_exercises.reduce((sum, ex) => sum + ex.reps_completed, 0);
              const exerciseTypes = [...new Set(session.workout_exercises.map((ex) => ex.exercise_type))];

              return (
                <motion.li
                  key={session.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i, 8) * 0.04, duration: 0.4 }}
                  className="rounded-[20px] bg-linen"
                >
                  <div className="flex items-stretch gap-2 pr-3">
                    <button
                      onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                      aria-expanded={isExpanded}
                      aria-label={`${longDate(session.started_at)}, ${totalReps} reps`}
                      className="flex min-w-0 flex-1 items-center gap-5 rounded-[20px] p-5 text-left sm:gap-6 sm:p-6"
                    >
                      <span className="flex w-14 shrink-0 flex-col items-center rounded-2xl bg-parchment py-2">
                        <span className="text-xs font-semibold text-terracotta">{monthOf(session.started_at)}</span>
                        <span className="font-display text-2xl font-semibold leading-none tabular-nums">
                          {dayOf(session.started_at)}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-lg font-semibold tracking-tight">
                            {totalReps} reps across {session.workout_exercises.length} exercise
                            {session.workout_exercises.length !== 1 ? "s" : ""}
                          </span>
                          <span className="rounded-full bg-parchment px-3 py-0.5 text-xs font-semibold">
                            {session.source === "ai_plan" ? "AI plan" : "Manual"}
                          </span>
                        </span>
                        <span className="mt-1 block text-sm text-driftwood">
                          {timeOf(session.started_at)}
                          {session.duration_sec ? `, ${formatDuration(session.duration_sec)}` : ""}
                          {exerciseTypes.length > 0 ? `, ${exerciseTypes.join(", ")}` : ""}
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-driftwood transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      disabled={deletingId === session.id}
                      className="my-auto rounded-full p-3 text-driftwood transition-colors duration-300 hover:bg-terracotta/10 hover:text-terracotta disabled:opacity-50"
                      aria-label="Delete workout"
                    >
                      {deletingId === session.id ? (
                        <span className="block h-4 w-4 animate-spin rounded-full border-2 border-terracotta border-t-transparent" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && session.workout_exercises.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-col gap-2 px-5 pb-5 sm:px-6 sm:pb-6">
                          {session.workout_exercises.map((ex) => (
                            <li
                              key={ex.id}
                              className="flex flex-col justify-between gap-2 rounded-2xl bg-parchment p-4 sm:flex-row sm:items-center"
                            >
                              <div>
                                <h3 className="font-semibold">{ex.exercise_type}</h3>
                                <p className="text-sm text-driftwood">
                                  {ex.sets_completed} set{ex.sets_completed !== 1 ? "s" : ""}, {ex.reps_completed} reps
                                  {ex.target_reps ? ` of ${ex.target_reps} target` : ""}
                                </p>
                              </div>
                              <p className="text-sm text-driftwood">
                                {ex.precision_avg != null && (
                                  <span className="font-semibold text-charcoal">{ex.precision_avg}% precision</span>
                                )}
                                {ex.precision_avg != null && ex.duration_sec != null && ", "}
                                {ex.duration_sec != null && formatDuration(ex.duration_sec)}
                              </p>
                            </li>
                          ))}
                          {session.notes && <li className="px-1 pt-1 text-sm text-driftwood">Note: {session.notes}</li>}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
