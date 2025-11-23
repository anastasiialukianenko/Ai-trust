/**
 * Records a timestamp for a specific event
 * @param data Current experiment data
 * @param eventName Name of the event
 * @returns Updated data with timestamp
 */
export function recordTimestamp(data: any, eventName: string): any {
  return {
    ...data,
    [`${eventName}Time`]: Date.now(),
  };
}

/**
 * Calculates time elapsed since start
 * @param startTime Start timestamp
 * @returns Time elapsed in milliseconds
 */
export function getElapsedTime(startTime: number): number {
  return Date.now() - startTime;
}
