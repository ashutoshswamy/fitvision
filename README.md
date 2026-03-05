<div align="center">

# FitVision

**AI-powered fitness tracker with real-time pose detection — all on-device, no video leaves your browser.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## Overview

FitVision is a full-stack fitness application that uses **MediaPipe Pose** for real-time exercise tracking through your webcam and **Google Gemini** for personalized AI workout plan generation. Every frame of video is processed entirely in-browser — nothing is uploaded, streamed, or stored.

The app tracks **51 exercises** across categories like push, pull, legs, core, and cardio, counting reps and measuring form precision through joint angle analysis.

---

## Features

- **Real-Time Pose Tracking** — Webcam-based rep counting with live skeleton overlay, form feedback, and precision percentage
- **51 Supported Exercises** — Each with angle-based detection logic, difficulty ratings, target muscles, and rep targets
- **AI Workout Plans** — Fill in a fitness profile and Gemini generates a structured weekly training plan
- **Guided Plan Workouts** — Step through your plan's exercises with built-in camera tracking, set/rep targets, and skip/complete controls
- **Workout History** — Full session log with per-exercise breakdowns (reps, sets, precision, duration)
- **Dashboard** — Aggregate stats (total sessions, exercises, reps, average precision) and saved plans at a glance
- **Exercise Library** — Browse all exercises with difficulty badges, muscle groups, and descriptions
- **Privacy-First** — All pose detection runs client-side; no video data ever leaves the browser

---

## Tech Stack

| Layer              | Technology                                                                                                                                                          |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**      | [Next.js 16](https://nextjs.org/) (App Router)                                                                                                                      |
| **Language**       | [TypeScript 5](https://www.typescriptlang.org/)                                                                                                                     |
| **UI**             | [React 19](https://react.dev/) · [Tailwind CSS 4](https://tailwindcss.com/) · [Framer Motion](https://www.framer.com/motion/) · [Lucide Icons](https://lucide.dev/) |
| **Pose Detection** | [MediaPipe Pose](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker) (on-device)                                                                 |
| **AI**             | [Google Gemini](https://ai.google.dev/) (`gemini-3-flash-preview`)                                                                                                  |
| **Auth**           | [Clerk](https://clerk.com/)                                                                                                                                         |
| **Database**       | [Supabase](https://supabase.com/) (PostgreSQL)                                                                                                                      |

---

## Supported Exercises

<details>
<summary><strong>View all 51 exercises</strong></summary>

| Category            | Exercises                                                                                                                                     |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Push**            | Pushups · Wide Pushups · Diamond Pushups · Pike Pushups · Wall Pushups                                                                        |
| **Pull / Back**     | Bent Over Rows · Reverse Flys · Upright Rows                                                                                                  |
| **Shoulders**       | Shoulder Press · Lateral Raises · Front Raises · Arnold Press · Arm Circles                                                                   |
| **Arms**            | Bicep Curls · Hammer Curls · Overhead Tricep Extension · Tricep Kickbacks · Tricep Dips                                                       |
| **Chest**           | Chest Flys                                                                                                                                    |
| **Legs**            | Squats · Sumo Squats · Bulgarian Split Squats · Lunges · Side Lunges · Step Ups · Calf Raises · Wall Sit                                      |
| **Glutes / Hips**   | Glute Bridges · Hip Thrusts · Donkey Kicks · Fire Hydrants                                                                                    |
| **Posterior Chain** | Deadlifts · Good Mornings                                                                                                                     |
| **Core**            | Crunches · Sit Ups · Leg Raises · Mountain Climbers · Bicycle Crunches · Flutter Kicks · V-Ups · Dead Bugs · Side Plank Dips · Russian Twists |
| **Cardio / Plyo**   | Jumping Jacks · High Knees · Burpees · Squat Jumps · Box Jumps · Butt Kicks                                                                   |
| **Flexibility**     | Toe Touches · Superman                                                                                                                        |

</details>

## License

This project is licensed under the [MIT License](LICENSE).
