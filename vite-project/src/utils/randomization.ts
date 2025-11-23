import type { Condition } from '../types/experiment';

/**
 * Randomly assigns participant to one of three conditions
 * @returns Condition 1, 2, or 3
 */
export function randomCondition(): Condition {
  return (Math.floor(Math.random() * 3) + 1) as Condition;
}

/**
 * Generates a unique participant ID
 * @returns Participant ID string
 */
export function generateParticipantId(): string {
  return `P${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
