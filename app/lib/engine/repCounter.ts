export interface PhaseConfig {
  up: { min: number; max: number };
  down: { min: number; max: number };
}

export type RepPhase = 'idle' | 'up' | 'down';

// Frames a landmark must stay in "down" before a rep is armed, filters single-frame jitter/side-flips.
const MIN_DOWN_STREAK = 3;

export function createRepCounter() {
  let phase: RepPhase = 'idle';
  let repCount = 0;
  let wasDown = false;
  let downStreak = 0;

  function update(angle: number, phaseConfig: PhaseConfig) {
    let repCompleted = false;
    const isUp = angle >= phaseConfig.up.min && angle <= phaseConfig.up.max;
    const isDown = angle >= phaseConfig.down.min && angle <= phaseConfig.down.max;

    if (isDown) {
      phase = 'down';
      downStreak++;
      if (downStreak >= MIN_DOWN_STREAK) wasDown = true;
    } else if (isUp && wasDown) {
      phase = 'up';
      repCount++;
      wasDown = false;
      downStreak = 0;
      repCompleted = true;
    } else if (isUp) {
      phase = 'up';
      downStreak = 0;
    }

    return { phase, repCount, repCompleted };
  }

  function reset() {
    phase = 'idle';
    repCount = 0;
    wasDown = false;
    downStreak = 0;
  }
  
  function getState() {
    return { phase, repCount };
  }

  return { update, reset, getState };
}
