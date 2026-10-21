import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

export type LegalSection = { title: string; content: string };

const slug = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-[100dvh] bg-parchment font-sans text-charcoal selection:bg-terracotta selection:text-parchment">
      <nav className="fixed inset-x-4 top-4 z-50 mx-auto max-w-[84rem] rounded-[28px] border border-warm-sand/40 bg-parchment/80 px-5 shadow-[0_10px_30px_-12px_rgba(60,56,49,0.25)] backdrop-blur-xl sm:inset-x-6 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-nobg.png" alt="" width={120} height={32} className="h-8 w-auto" />
            <span className="font-display text-xl font-semibold tracking-tight">FitVision</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-driftwood transition-colors duration-300 hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </nav>

      <header className="mx-auto max-w-[84rem] px-5 pb-14 pt-32 sm:px-8">
        <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tighter sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-driftwood">{intro}</p>
        <p className="mt-4 text-sm text-driftwood/80">Last updated {updated}</p>
      </header>

      <div className="mx-auto grid max-w-[84rem] grid-cols-1 gap-12 px-5 pb-28 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <nav aria-label="On this page" className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold">On this page</h2>
            <ol className="mt-4 flex flex-col gap-3 text-sm">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#${slug(s.title)}`}
                    className="flex gap-3 text-driftwood transition-colors duration-300 hover:text-terracotta"
                  >
                    <span className="w-5 tabular-nums">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <article className="flex flex-col gap-12 lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.title} id={slug(s.title)} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                <span className="mr-3 tabular-nums text-terracotta">{i + 1}.</span>
                {s.title}
              </h2>
              <p className="mt-4 max-w-[65ch] leading-relaxed text-driftwood">{s.content}</p>
            </section>
          ))}
        </article>
      </div>

      <SiteFooter />
    </div>
  );
}
