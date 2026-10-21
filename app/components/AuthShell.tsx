import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const authAppearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full shadow-none",
    card: "bg-transparent border-0 shadow-none p-0 w-full gap-6",
    headerTitle: "font-display text-3xl font-semibold tracking-tight text-charcoal",
    headerSubtitle: "text-driftwood text-base",
    socialButtonsBlockButton:
      "bg-parchment border border-driftwood/40 text-charcoal hover:bg-linen transition-colors duration-300 rounded-full text-sm py-3",
    socialButtonsBlockButtonText: "text-charcoal font-medium text-sm",
    dividerLine: "bg-warm-sand",
    dividerText: "text-driftwood text-xs",
    formFieldLabel: "text-charcoal text-sm font-medium",
    formFieldInput:
      "bg-parchment border border-driftwood/40 text-charcoal rounded-xl py-3 focus:border-terracotta focus:ring-terracotta/25 placeholder:text-driftwood/70 transition-colors duration-300",
    formButtonPrimary:
      "bg-none bg-charcoal hover:bg-terracotta text-parchment rounded-full shadow-none transition-colors duration-300 text-sm font-semibold normal-case py-3.5",
    footerActionLink: "text-terracotta hover:text-charcoal font-semibold transition-colors duration-300",
    footerActionText: "text-driftwood text-sm",
    identityPreviewEditButton: "text-terracotta hover:text-charcoal",
    formFieldAction: "text-terracotta hover:text-charcoal text-sm",
    alertText: "text-charcoal text-sm",
    otpCodeFieldInput: "border border-driftwood/40 text-charcoal rounded-lg",
    formResendCodeLink: "text-terracotta hover:text-charcoal",
    footer: "bg-transparent",
  },
  layout: { socialButtonsPlacement: "top" as const, showOptionalFields: false },
};

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-parchment px-5 py-6 font-sans text-charcoal selection:bg-terracotta selection:text-parchment sm:px-10">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
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
      <main className="mx-auto flex w-full max-w-md flex-1 items-center py-10">{children}</main>
    </div>
  );
}
