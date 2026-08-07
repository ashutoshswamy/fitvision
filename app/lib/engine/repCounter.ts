export interface PhaseConfig {
  up: { min: number; max: number };
  down: { min: number; max: number };
}

export type RepPhase = 'idle' | 'up' | 'down';

export function createRepCounter() {
  let phase: RepPhase = 'idle';
  let repCount = 0;
  let wasDown = false;

  function update(angle: number, phaseConfig: PhaseConfig) {
    let repCompleted = false;
    const isUp = angle >= phaseConfig.up.min && angle <= phaseConfig.up.max;
    const isDown = angle >= phaseConfig.down.min && angle <= phaseConfig.down.max;

    if (isDown) {
      phase = 'down';
      wasDown = true;
    } else if (isUp && wasDown) {
      phase = 'up';
      repCount++;
      wasDown = false;
      repCompleted = true;
    } else if (isUp) {
      phase = 'up';
    }

    return { phase, repCount, repCompleted };
  }

  function reset() {
    phase = 'idle';
    repCount = 0;
    wasDown = false;
  }
  
  function getState() {
    return { phase, repCount };
  }

  return { update, reset, getState };
}
