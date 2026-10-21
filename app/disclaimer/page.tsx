import { LegalPage, type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    title: "General Information",
    content:
      "FitVision is an AI-powered fitness tool designed to assist with exercise form and posture tracking. The information and feedback provided by this application are for general informational and educational purposes only. FitVision is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
  {
    title: "Not Medical Advice",
    content:
      "The exercise suggestions, posture corrections, and AI-generated recommendations provided through FitVision should not be considered medical advice. Always consult with a qualified healthcare professional, physician, or certified fitness trainer before starting any new exercise program, especially if you have pre-existing health conditions, injuries, or concerns about your physical capability.",
  },
  {
    title: "Assumption of Risk",
    content:
      "By using FitVision, you acknowledge that physical exercise carries inherent risks including but not limited to muscle strain, joint injury, and cardiovascular events. You assume full responsibility for your own safety during any exercise performed while using this application. FitVision and its creators shall not be held liable for any injury, damage, or adverse health outcome resulting from the use of this application.",
  },
  {
    title: "AI Accuracy Limitations",
    content:
      "FitVision uses on-device computer vision and AI language models to provide feedback. While we strive for accuracy, these technologies have inherent limitations. Pose detection may be affected by lighting conditions, camera quality, clothing, or body positioning. AI-generated exercise suggestions are general in nature and may not account for your specific health circumstances.",
  },
  {
    title: "Privacy & Data Processing",
    content:
      "Pose tracking is performed entirely on your device, no video or image data leaves your browser. However, when using the AI Suggestions feature, text-based health information you provide is sent to our AI service for processing. We do not store this information on our servers.",
  },
  {
    title: "No Guarantees",
    content:
      'FitVision does not guarantee any specific fitness results, weight loss, muscle gain, or health improvements. Individual results vary based on numerous factors including genetics, consistency, diet, and overall lifestyle. The application is provided "as is" without warranties of any kind, either express or implied.',
  },
  {
    title: "Age Requirement",
    content:
      "FitVision is intended for use by individuals aged 16 and older. If you are under 16, please use this application only under the supervision of a parent or guardian.",
  },
  {
    title: "Changes to This Disclaimer",
    content:
      "We reserve the right to update this disclaimer at any time. Continued use of FitVision after changes constitutes acceptance of the revised terms.",
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      intro="FitVision is a training aid. Here is what it can and cannot do for you."
      updated="March 2026"
      sections={sections}
    />
  );
}
