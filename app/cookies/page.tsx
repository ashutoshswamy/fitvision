import { LegalPage, type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    title: "What cookies are",
    content:
      "Cookies are small text files a website stores in your browser. Local storage works in a similar way. Both let a site remember who you are between pages and visits.",
  },
  {
    title: "Cookies we use",
    content:
      "FitVision uses essential cookies and local storage only. They keep you signed in, protect your session and remember your cookie choice. The site cannot work properly without them, so they are always on.",
  },
  {
    title: "Cookies we do not use",
    content:
      "We do not use advertising cookies, and we do not use analytics or tracking cookies that follow your activity on other websites. Your camera feed is never stored in a cookie or anywhere else, because pose tracking runs on your device.",
  },
  {
    title: "Third-party cookies",
    content:
      "Our sign-in provider, Clerk, sets cookies so you stay signed in securely. Those cookies are covered by Clerk's own policies. We do not add any other third-party cookies.",
  },
  {
    title: "Managing cookies",
    content:
      "You can delete or block cookies in your browser settings. If you block essential cookies you will not be able to sign in. To see the cookie notice again, clear this site's local storage in your browser.",
  },
  {
    title: "Changes to this policy",
    content:
      "If we ever add optional cookies, we will update this page and ask for your consent first. Continued use of FitVision after an update means you accept the revised policy.",
  },
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie policy"
      intro="The few cookies FitVision uses, and why they are needed."
      updated="October 2026"
      sections={sections}
    />
  );
}
