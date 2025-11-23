import type { Condition, ExperimentData } from '../types/experiment';
import { generateParticipantId } from './randomization';

export function initialData(condition: Condition): ExperimentData {
  return {
    participantId: generateParticipantId(),
    condition,
    startTime: Date.now(),
    trust: {},
    purchase: {},
    manipulationChecks: {},
    controls: {
      willingnessToPay: 0,
    },
    demographics: {},
    qc: {},
  };
}
