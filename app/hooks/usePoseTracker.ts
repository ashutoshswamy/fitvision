/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { ExerciseType, EXERCISES, RepConfig } from "../lib/exercises";
import { calculateAngle } from "../lib/engine/angleCalculator";
import { createRepCounter, RepPhase } from "../lib/engine/repCounter";

// Re-export for backward compatibility
export type { ExerciseType } from "../lib/exercises";
export { EXERCISES } from "../lib/exercises";

interface PoseTrackerState {
  isReady: boolean;
  reps: number;
  feedback: string;
  precision: number;
  phase: RepPhase;
  primaryAngle: number;
}

export const usePoseTracker = (
  videoElement: HTMLVideoElement | null,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  exerciseType: ExerciseType,
) => {
  const [state, setState] = useState<PoseTrackerState>({
    isReady: false,
    reps: 0,
    feedback: "Position yourself in the frame",
    precision: 0,
    phase: "idle",
    primaryAngle: 0,
  });

  const repCounterRef = useRef(createRepCounter());

  // Use a ref for exerciseType so onResults stays stable and
  // MediaPipe doesn't tear down / reinitialize on every switch.
  const exerciseTypeRef = useRef<ExerciseType>(exerciseType);
  exerciseTypeRef.current = exerciseType;

  // Reset rep counter when the exercise changes
  useEffect(() => {
    repCounterRef.current.reset();
    setState((prev) => ({
      ...prev,
      reps: 0,
      feedback: "Position yourself in the frame",
      phase: "idle",
      primaryAngle: 0,
    }));
  }, [exerciseType]);

  const poseRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const mountedRef = useRef(true);

  const onResults = useCallback(
    async (results: any) => {
      if (!canvasRef.current || !videoElement) return;

      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;

      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );

      if (results.poseLandmarks) {
        // Dynamically import drawing utils
        const drawingUtils = await import("@mediapipe/drawing_utils");
        const poseUtils = await import("@mediapipe/pose");

        drawingUtils.drawConnectors(
          canvasCtx,
          results.poseLandmarks,
          poseUtils.POSE_CONNECTIONS,
          {
            color: "#d4c9b8",
            lineWidth: 2,
          },
        );
        drawingUtils.drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#8b9685",
          lineWidth: 1,
          radius: 3,
        });

        const landmarks = results.poseLandmarks;
        const currentExercise = exerciseTypeRef.current;
        const exerciseDef = EXERCISES.find((e) => e.type === currentExercise);
        const repConfig = exerciseDef?.repConfig;

        // Compute precision as average visibility of all 33 landmarks (0–100%)
        const avgVisibility =
          landmarks.reduce(
            (sum: number, lm: { visibility: number }) => sum + lm.visibility,
            0,
          ) / landmarks.length;
        const precision = Math.round(avgVisibility * 100);

        // Helper: Elbow angle tracker (Side-agnostic)
        const trackElbowAngle = (
          config: RepConfig,
          upMsg: string,
          downMsg: string,
          midMsg: string,
          visMsg: string,
        ) => {
          const lS = landmarks[11]; const lE = landmarks[13]; const lW = landmarks[15];
          const rS = landmarks[12]; const rE = landmarks[14]; const rW = landmarks[16];
          const lVis = (lS.visibility + lE.visibility + lW.visibility) / 3;
          const rVis = (rS.visibility + rE.visibility + rW.visibility) / 3;

          if (lVis > 0.5 || rVis > 0.5) {
            const side = lVis > rVis ? { s: lS, e: lE, w: lW } : { s: rS, e: rE, w: rW };
            const angle = calculateAngle(side.s, side.e, side.w);
            const { phase, repCount, repCompleted } = repCounterRef.current.update(angle, config);
            let fb = phase === "down" ? downMsg : midMsg;
            if (repCompleted) fb = upMsg === "Keep going" ? "Good rep!" : upMsg;
            setState((prev) => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: angle }));
          } else {
            setState((prev) => ({ ...prev, feedback: visMsg }));
          }
        };

        // Helper: Knee angle tracker (Side-agnostic)
        const trackKneeAngle = (
          config: RepConfig,
          upMsg: string,
          downMsg: string,
          midMsg: string,
          visMsg: string,
        ) => {
          const lH = landmarks[23]; const lK = landmarks[25]; const lA = landmarks[27];
          const rH = landmarks[24]; const rK = landmarks[26]; const rA = landmarks[28];
          const lVis = (lH.visibility + lK.visibility + lA.visibility) / 3;
          const rVis = (rH.visibility + rK.visibility + rA.visibility) / 3;

          if (lVis > 0.5 || rVis > 0.5) {
            const side = lVis > rVis ? { h: lH, k: lK, a: lA } : { h: rH, k: rK, a: rA };
            const angle = calculateAngle(side.h, side.k, side.a);
            const { phase, repCount, repCompleted } = repCounterRef.current.update(angle, config);
            let fb = phase === "down" ? downMsg : midMsg;
            if (repCompleted) fb = upMsg === "Keep going" ? "Good rep!" : upMsg;
            setState((prev) => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: angle }));
          } else {
            setState((prev) => ({ ...prev, feedback: visMsg }));
          }
        };

        // Helper: Hip angle tracker (Side-agnostic)
        const trackHipAngle = (
          config: RepConfig,
          upMsg: string,
          downMsg: string,
          midMsg: string,
          visMsg: string,
        ) => {
          const lS = landmarks[11]; const lH = landmarks[23]; const lK = landmarks[25];
          const rS = landmarks[12]; const rH = landmarks[24]; const rK = landmarks[26];
          const lVis = (lS.visibility + lH.visibility + lK.visibility) / 3;
          const rVis = (rS.visibility + rH.visibility + rK.visibility) / 3;

          if (lVis > 0.5 || rVis > 0.5) {
            const side = lVis > rVis ? { s: lS, h: lH, k: lK } : { s: rS, h: rH, k: rK };
            const angle = calculateAngle(side.s, side.h, side.k);
            const { phase, repCount, repCompleted } = repCounterRef.current.update(angle, config);
            let fb = phase === "down" ? downMsg : midMsg;
            if (repCompleted) fb = upMsg === "Keep going" ? "Good rep!" : upMsg;
            setState((prev) => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: angle }));
          } else {
            setState((prev) => ({ ...prev, feedback: visMsg }));
          }
        };

        // Helper: Arm abduction tracker (Side-agnostic)
        const trackArmAbduction = (
          config: RepConfig,
          upMsg: string,
          downMsg: string,
          midMsg: string,
          visMsg: string,
        ) => {
          const lH = landmarks[23]; const lS = landmarks[11]; const lW = landmarks[15];
          const rH = landmarks[24]; const rS = landmarks[12]; const rW = landmarks[16];
          const lVis = (lH.visibility + lS.visibility + lW.visibility) / 3;
          const rVis = (rH.visibility + rS.visibility + rW.visibility) / 3;

          if (lVis > 0.5 || rVis > 0.5) {
            const side = lVis > rVis ? { h: lH, s: lS, w: lW } : { h: rH, s: rS, w: rW };
            const angle = calculateAngle(side.h, side.s, side.w);
            const { phase, repCount, repCompleted } = repCounterRef.current.update(angle, config);
            let fb = phase === "down" ? downMsg : midMsg;
            if (repCompleted) fb = upMsg === "Keep going" ? "Good rep!" : upMsg;
            setState((prev) => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: angle }));
          } else {
            setState((prev) => ({ ...prev, feedback: visMsg }));
          }
        };

        // Helper: Alternating legs tracker
        const trackAlternatingLegs = (
          config: RepConfig,
          upMsg: string,
          downMsg: string,
          midMsg: string,
          visMsg: string,
        ) => {
          const lS = landmarks[11];
          const lH = landmarks[23];
          const lK = landmarks[25];
          const rS = landmarks[12];
          const rH = landmarks[24];
          const rK = landmarks[26];
          if (lH.visibility > 0.5 && lK.visibility > 0.5 && rH.visibility > 0.5 && rK.visibility > 0.5) {
            const lA = calculateAngle(lS, lH, lK);
            const rA = calculateAngle(rS, rH, rK);
            const minAngle = Math.min(lA, rA);
            const { phase, repCount, repCompleted } = repCounterRef.current.update(minAngle, config);
            let fb = phase === "down" ? downMsg : midMsg;
            if (repCompleted) fb = upMsg;
            setState((prev) => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: minAngle }));
          } else {
            setState((prev) => ({ ...prev, feedback: visMsg }));
          }
        };

        if (!repConfig) {
          setState((prev) => ({ ...prev, feedback: "Exercise configuration missing" }));
        } else {
          // Group 1: Knee Angle Exercises
          if (["Squats", "Lunges", "Sumo Squats", "Bulgarian Split Squats", "Side Lunges", "Step Ups", "Wall Sit", "Burpees", "Squat Jumps", "Box Jumps", "Butt Kicks"].includes(currentExercise)) {
            trackKneeAngle(repConfig, "Good rep!", "Go deeper!", "Lower...", "Ensure legs are visible");
          }
          // Group 2: Elbow Angle Exercises
          else if (["Pushups", "Bicep Curls", "Shoulder Press", "Wide Pushups", "Diamond Pushups", "Pike Pushups", "Wall Pushups", "Overhead Tricep Extension", "Tricep Kickbacks", "Hammer Curls", "Arnold Press", "Bent Over Rows", "Tricep Dips", "Upright Rows"].includes(currentExercise)) {
            trackElbowAngle(repConfig, "Good rep!", "Keep it going...", "Follow the rhythm", "Ensure arms are visible");
          }
          // Group 3: Hip Angle Exercises (Shoulder-Hip-Knee)
          else if (["Deadlifts", "Glute Bridges", "Crunches", "Donkey Kicks", "Good Mornings", "Sit Ups", "V-Ups", "Toe Touches", "Superman", "Hip Thrusts", "Side Plank Dips", "Leg Raises"].includes(currentExercise)) {
            trackHipAngle(repConfig, "Good rep!", "Keep it going...", "Follow the rhythm", "Ensure body is visible from the side");
          }
          // Group 4: Arm Abduction Exercises
          else if (["Lateral Raises", "Jumping Jacks", "Front Raises", "Reverse Flys", "Chest Flys"].includes(currentExercise)) {
            trackArmAbduction(repConfig, "Good rep!", "Bring it together!", "Open up!", "Ensure upper body is visible");
          }
          // Group 5: Alternating Leg Exercises
          else if (["Mountain Climbers", "Bicycle Crunches", "Dead Bugs", "High Knees"].includes(currentExercise)) {
            trackAlternatingLegs(repConfig, "Good rep!", "Keep moving!", "Higher!", "Ensure full body is visible");
          }
          // Group 6: Custom Tracker Exercises
          else if (currentExercise === "Russian Twists") {
            const lW = landmarks[15]; const rW = landmarks[16];
            const lS = landmarks[11]; const rS = landmarks[12];
            if (lW.visibility > 0.5 && rW.visibility > 0.5 && lS.visibility > 0.5 && rS.visibility > 0.5) {
              const midS = (lS.x + rS.x) / 2; const handX = (lW.x + rW.x) / 2;
              const offset = (handX - midS) * 100;
              const { phase, repCount, repCompleted } = repCounterRef.current.update(offset, {
                up: { min: 8, max: 100 }, down: { min: -100, max: -8 },
              });
              let fb = phase === "up" ? "Twist left!" : "Twist right!";
              if (repCompleted) fb = "Good twist!";
              setState(prev => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: Math.abs(offset) * 1.8 }));
            } else {
              setState(prev => ({ ...prev, feedback: "Ensure upper body is visible" }));
            }
          }
          else if (currentExercise === "Calf Raises") {
            const lK = landmarks[25]; const lA = landmarks[27]; const lF = landmarks[31];
            const rK = landmarks[26]; const rA = landmarks[28]; const rF = landmarks[32];
            const lVis = (lK.visibility + lA.visibility + lF.visibility) / 3;
            const rVis = (rK.visibility + rA.visibility + rF.visibility) / 3;

            if (lVis > 0.5 || rVis > 0.5) {
              const side = lVis > rVis ? { k: lK, a: lA, f: lF } : { k: rK, a: rA, f: rF };
              const angle = calculateAngle(side.k, side.a, side.f);
              const { phase, repCount, repCompleted } = repCounterRef.current.update(angle, {
                up: { min: 160, max: 180 }, down: { min: 0, max: 130 },
              });
              let fb = phase === "up" ? "Hold! Now lower." : "Push higher on toes...";
              if (repCompleted) fb = "Good rep!";
              setState(prev => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: angle }));
            } else {
              setState(prev => ({ ...prev, feedback: "Ensure legs and feet are visible" }));
            }
          }
          else if (currentExercise === "Fire Hydrants") {
            const lH = landmarks[23]; const rH = landmarks[24]; const rK = landmarks[26];
            if (lH.visibility > 0.5 && rH.visibility > 0.5 && rK.visibility > 0.5) {
              const angle = calculateAngle(lH, rH, rK);
              const { phase, repCount, repCompleted } = repCounterRef.current.update(angle, {
                up: { min: 0, max: 120 }, down: { min: 165, max: 180 },
              });
              let fb = phase === "up" ? "Open! Now lower." : "Lift knee higher...";
              if (repCompleted) fb = "Good rep!";
              setState(prev => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: angle }));
            } else {
              setState(prev => ({ ...prev, feedback: "Ensure hips and knees are visible" }));
            }
          }
          else if (currentExercise === "Flutter Kicks") {
            const lA = landmarks[27]; const rA = landmarks[28];
            if (lA.visibility > 0.5 && rA.visibility > 0.5) {
              const diff = Math.abs(lA.y - rA.y) * 1000;
              const { phase, repCount, repCompleted } = repCounterRef.current.update(diff, {
                up: { min: 80, max: 1000 }, down: { min: 0, max: 30 },
              });
              let fb = phase === "up" ? "Good rep!" : "Flutter faster!";
              if (repCompleted) fb = "Keep going!";
              setState(prev => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: diff / 10 }));
            } else {
              setState(prev => ({ ...prev, feedback: "Ensure legs are visible" }));
            }
          }
          else if (currentExercise === "Arm Circles") {
            const lS = landmarks[11]; const lW = landmarks[15];
            const rS = landmarks[12]; const rW = landmarks[16];
            const lVis = (lS.visibility + lW.visibility) / 2;
            const rVis = (rS.visibility + rW.visibility) / 2;

            if (lVis > 0.5 || rVis > 0.5) {
              const side = lVis > rVis ? { s: lS, w: lW } : { s: rS, w: rW };
              const metric = side.w.y < side.s.y ? 1 : 0;
              const { phase, repCount, repCompleted } = repCounterRef.current.update(metric, {
                up: { min: 1, max: 1 }, down: { min: 0, max: 0 },
              });
              let fb = phase === "up" ? "Good circle!" : "Circle around...";
              if (repCompleted) fb = "Keep circling";
              setState(prev => ({ ...prev, reps: repCount, feedback: fb, phase, primaryAngle: phase === "up" ? 180 : 0 }));
            } else {
              setState(prev => ({ ...prev, feedback: "Ensure arm is visible" }));
            }
          }
        }

        // Update precision from landmark visibility (only if changed)
        setState((prev) => {
          if (prev.precision === precision) return prev;
          return { ...prev, precision };
        });
      }

      canvasCtx.restore();
    },
    [canvasRef, videoElement],
  );

  useEffect(() => {
    if (!videoElement || typeof window === "undefined") return;

    mountedRef.current = true;

    const initMediaPipe = async () => {
      const poseModule = await import("@mediapipe/pose");

      if (!mountedRef.current) return;

      poseRef.current = new poseModule.Pose({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      poseRef.current.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseRef.current.onResults(onResults);

      // Use requestAnimationFrame loop instead of @mediapipe/camera_utils Camera,
      // which opens its own getUserMedia stream and conflicts with react-webcam on mobile.
      let rafId: number;
      const sendFrame = async () => {
        if (!mountedRef.current || !poseRef.current) return;
        // readyState >= HTMLMediaElement.HAVE_CURRENT_DATA (2) means at
        // least one frame is available. On some mobile browsers the video
        // element reports readyState 0 while still providing frames via
        // videoWidth/videoHeight, so accept either signal.
        const hasFrame =
          videoElement.readyState >= 2 ||
          (videoElement.videoWidth > 0 && videoElement.videoHeight > 0);
        if (hasFrame) {
          try {
            await poseRef.current.send({ image: videoElement });
          } catch {
            // Ignore errors during teardown
          }
        }
        rafId = requestAnimationFrame(sendFrame);
      };
      cameraRef.current = { stop: () => cancelAnimationFrame(rafId) };
      rafId = requestAnimationFrame(sendFrame);
      setState((prev) => ({ ...prev, isReady: true }));
    };

    initMediaPipe();

    return () => {
      mountedRef.current = false;
      cameraRef.current?.stop();
      poseRef.current?.close();
      poseRef.current = null;
      cameraRef.current = null;
    };
  }, [videoElement, onResults]);

  return state;
};
