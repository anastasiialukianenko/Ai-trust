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
    },
    demographics: {},
    qc: {},
  };
}
