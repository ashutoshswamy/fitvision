import { LegalPage, type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using FitVision, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application. These terms constitute a legally binding agreement between you and FitVision.",
  },
  {
    title: "Description of Service",
    content:
      "FitVision is an AI-powered fitness application that uses on-device computer vision to track exercise form and provide real-time posture feedback. The service includes pose detection, exercise counting, and optional AI-generated fitness suggestions. FitVision is provided as a fitness assistance tool and is not a medical device.",
  },
  {
    title: "User Accounts",
    content:
      "To access certain features, you must create an account through our authentication provider. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating your account and to update your information as necessary.",
  },
  {
    title: "Acceptable Use",
    content:
      "You agree to use FitVision only for its intended purpose of personal fitness tracking and improvement. You shall not: attempt to reverse-engineer, decompile, or extract the source code; use the service to develop competing products; share your account with others; or use the service in any way that violates applicable laws or regulations.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content, features, and functionality of FitVision, including but not limited to the design, code, algorithms, graphics, and branding, are owned by FitVision and are protected by intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the application for personal, non-commercial purposes.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted by law, FitVision and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service. This includes but is not limited to physical injury, data loss, or any damages resulting from reliance on AI-generated recommendations. Our total liability shall not exceed the amount you paid for the service.",
  },
  {
    title: "Disclaimer of Warranties",
    content:
      'FitVision is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or that AI-generated feedback will be accurate or suitable for your specific circumstances. You use the service at your own risk.',
  },
  {
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate your access to FitVision at any time, with or without cause, and with or without notice. Upon termination, your right to use the service will immediately cease. You may also terminate your account at any time by contacting us.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of FitVision shall be resolved through good-faith negotiation before pursuing formal legal proceedings.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of FitVision after any modifications constitutes acceptance of the updated terms. We encourage you to review these terms periodically.",
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of service"
      intro="The rules for using FitVision. Please read them before you create an account."
      updated="March 2026"
      sections={sections}
    />
  );
}
