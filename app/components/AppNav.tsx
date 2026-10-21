"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tracker", label: "Tracker" },
  { href: "/workouts", label: "Workouts" },
  { href: "/plan-workout", label: "Plans" },
  { href: "/meal-prep", label: "Meal prep" },
  { href: "/suggestions", label: "Suggestions" },
  { href: "/history", label: "History" },
];

export function AppNav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const cls = (href: string) =>
    `text-sm font-medium transition-colors duration-300 ${
      dark
        ? path === href ? "text-parchment" : "text-warm-sand hover:text-parchment"
        : path === href ? "text-charcoal" : "text-driftwood hover:text-charcoal"
    }`;

  return (
    <nav
      className={`fixed inset-x-4 top-4 z-50 mx-auto max-w-[84rem] rounded-[28px] border px-5 backdrop-blur-xl sm:inset-x-6 sm:px-6 ${
        dark
          ? "border-parchment/15 bg-charcoal/80 text-parchment shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]"
          : "border-warm-sand/40 bg-parchment/80 shadow-[0_10px_30px_-12px_rgba(60,56,49,0.25)]"
      }`}
    >
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-nobg.png" alt="" width={120} height={32} className="h-8 w-auto" />
          <span className="font-display text-xl font-semibold tracking-tight">FitVision</span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path === l.href ? "page" : undefined}
              className={cls(l.href)}
            >
              {l.label}
            </Link>
          ))}
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-4 pb-5 pt-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={cls(l.href)}>
                  {l.label}
                </Link>
              ))}
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
