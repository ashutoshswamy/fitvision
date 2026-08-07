const THROTTLE_MS = 500;
const MIN_VISIBLE = 15;
const VIS_THRESH = 0.5;

export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

export interface FeedbackMessage {
  id: string;
  type: 'correction';
  message: string;
  severity: 'warning' | 'info';
  timestamp: number;
}

export interface ExerciseRule {
  id: string;
  joints: string[];
  check: 'min' | 'max';
  threshold: number;
  message: string;
  phase: 'all' | 'up' | 'down';
  severity?: 'warning' | 'info';
}

export function createFeedbackEngine() {
  const errorTimestamps: Record<string, number> = {};
  const activeErrors = new Set<string>();

  function isBodyVisible(landmarks: Landmark[]) {
    if (!landmarks?.length) return false;
    return landmarks.filter((lm) => lm.visibility > VIS_THRESH).length >= MIN_VISIBLE;
  }

  function evaluate(
    angles: Record<string, number>,
    rules: ExerciseRule[],
    currentPhase: string,
    timestamp: number
  ) {
    const feedbacks: FeedbackMessage[] = [];
    
    for (const rule of rules) {
      if (rule.phase !== 'all' && rule.phase !== currentPhase) {
        delete errorTimestamps[rule.id];
        activeErrors.delete(rule.id);
        continue;
      }
      
      const ruleAngles = rule.joints.map((j) => angles[j]).filter((a) => a !== undefined);
      if (!ruleAngles.length) continue;
      
      const avg = ruleAngles.reduce((s, a) => s + a, 0) / ruleAngles.length;
      const violated =
        (rule.check === 'min' && avg < rule.threshold) ||
        (rule.check === 'max' && avg > rule.threshold);

      if (violated) {
        if (!errorTimestamps[rule.id]) errorTimestamps[rule.id] = timestamp;
        if (
          timestamp - errorTimestamps[rule.id] >= THROTTLE_MS &&
          !activeErrors.has(rule.id)
        ) {
          activeErrors.add(rule.id);
          feedbacks.push({
            id: rule.id,
            type: 'correction',
            message: rule.message,
            severity: rule.severity || 'warning',
            timestamp,
          });
        }
      } else {
        delete errorTimestamps[rule.id];
        activeErrors.delete(rule.id);
      }
    }
    return feedbacks;
  }

  function getActiveErrors() {
    return Array.from(activeErrors);
  }
  
  function reset() {
    Object.keys(errorTimestamps).forEach((k) => delete errorTimestamps[k]);
    activeErrors.clear();
  }

  return { evaluate, isBodyVisible, getActiveErrors, reset };
}
