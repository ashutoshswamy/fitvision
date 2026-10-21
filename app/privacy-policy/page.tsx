import { LegalPage, type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    title: "Information We Collect",
    content:
      "FitVision is designed with privacy at its core. Pose tracking and exercise detection are performed entirely on your device using on-device AI, no video, image, or body-tracking data is ever transmitted to our servers. When you use the AI Suggestions feature, text-based health information you voluntarily provide is sent to our AI service for processing. We collect basic account information (email, name) through our authentication provider, Clerk, when you create an account.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Account information is used solely to authenticate you and provide access to your workout history. Text-based health inputs submitted to the AI Suggestions feature are processed in real-time to generate personalized recommendations and are not stored on our servers after processing. Workout statistics (exercise counts, session duration) may be stored in our database to provide you with progress tracking across sessions.",
  },
  {
    title: "On-Device Processing",
    content:
      "FitVision uses MediaPipe, a browser-based machine learning framework, to perform all pose detection and exercise tracking directly on your device. Your camera feed is never recorded, stored, or transmitted. All visual processing happens locally in your browser, ensuring your physical data remains completely private.",
  },
  {
    title: "Third-Party Services",
    content:
      "We use the following third-party services: Clerk for authentication, Supabase for database storage, and Google Generative AI for the AI Suggestions feature. Each of these services has their own privacy policies. We recommend reviewing their respective privacy practices. We do not sell, trade, or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "Cookies & Local Storage",
    content:
      "FitVision uses essential cookies and local storage for authentication and session management. We do not use tracking cookies or analytics that monitor your browsing behavior across other websites. Any data stored locally in your browser is used solely to improve your experience within the application.",
  },
  {
    title: "Data Retention & Deletion",
    content:
      "You may request deletion of your account and associated data at any time by contacting us. Workout data stored in our database will be permanently deleted upon account deletion. Since pose tracking data never leaves your device, there is no server-side visual data to delete.",
  },
  {
    title: "Children's Privacy",
    content:
      "FitVision is intended for users aged 16 and older. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can take appropriate action.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date. Continued use of FitVision after changes constitutes acceptance of the revised policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="What we collect, what stays on your device, and who processes your data."
      updated="March 2026"
      sections={sections}
    />
  );
}
