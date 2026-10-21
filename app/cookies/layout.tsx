import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "FitVision cookie policy. We use only essential cookies and local storage for sign-in and session management.",
  alternates: {
    canonical: "https://fitvision.tech/cookies",
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
