import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/tracker", label: "Form tracker" },
      { href: "/workouts", label: "Workouts" },
      { href: "/plan-workout", label: "Workout plans" },
      { href: "/meal-prep", label: "Meal prep" },
      { href: "/suggestions", label: "AI suggestions" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/#process", label: "Method" },
      { href: "/#philosophy", label: "Philosophy" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/history", label: "History" },
      { href: "/sign-in", label: "Sign in" },
      { href: "/sign-up", label: "Create account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-warm-sand/50 bg-linen/60">
      <div className="mx-auto max-w-[84rem] px-5 pb-8 pt-16 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo-nobg.png" alt="" width={120} height={32} className="h-8 w-auto" />
              <span className="font-display text-xl font-semibold tracking-tight">FitVision</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-driftwood">
              Real-time form feedback that runs in your browser. Your camera
              footage stays on your device.
            </p>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="text-sm font-semibold text-charcoal">{c.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-driftwood transition-colors duration-300 hover:text-charcoal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-warm-sand/50 pt-6 text-xs leading-relaxed text-driftwood sm:flex-row sm:items-start sm:justify-between">
          <p>© {new Date().getFullYear()} FitVision. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">
            FitVision is a fitness tool, not a medical device. Talk to a
            qualified professional before starting a new exercise program.
          </p>
        </div>
      </div>
    </footer>
  );
}
