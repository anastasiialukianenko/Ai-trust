import type { ExperimentData, Condition } from '../types/experiment';
import { detectDeviceType } from './device';

/**
 * Maps condition number to condition string
 * 1 = Human
 * 2 = AI_noDisc (AI-created, no disclosure)
 * 3 = AI_Disc (AI-created, with disclosure)
 */
export function getConditionString(condition: Condition): string {
  switch (condition) {
    case 1:
      return 'Human';
    case 2:
      return 'AI_noDisc';
    case 3:
      return 'AI_Disc';
    default:
      return 'Unknown';
  }
}

/**
 * Computes dummy variable for AI-created, no disclosure
 * 1 = AI-created, no disclosure (condition 2)
 * 0 = otherwise
 */
export function computeAdAI_noDisc(condition: Condition): number {
  return condition === 2 ? 1 : 0;
}

/**
 * Computes dummy variable for AI-created, with disclosure
 * 1 = AI-created, with disclosure (condition 3)
 * 0 = otherwise
 */
export function computeAdAI_Disc(condition: Condition): number {
  return condition === 3 ? 1 : 0;
}

/**
 * Computes manipulation check for AI recognition
 * 1 = AI recognized (perceivedAuthor === 'ai')
 * 0 = otherwise
 */
export function computeMC_AI_Recognition(perceivedAuthor?: string): number {
  return perceivedAuthor === 'ai' ? 1 : 0;
}

/**
 * Computes manipulation check for disclosure recognition
 * 1 = Disclosure noticed (noticedDisclosure === 'yes')
 * 0 = otherwise
 */
export function computeMC_Disclosure_Recognition(noticedDisclosure?: string): number {
  return noticedDisclosure === 'yes' ? 1 : 0;
}

/**
 * Computes attention check passed as numeric
 * 1 = passed (attentionCheckPassed === true)
 * 0 = otherwise
 */
export function computeAttentionCheck(attentionCheckPassed?: boolean): number {
  return attentionCheckPassed === true ? 1 : 0;
}

/**
 * Prepares experiment data for backend submission by computing required fields
 * @param data Raw experiment data
 * @returns Data with computed backend fields
 */
export function prepareDataForBackend(data: ExperimentData): ExperimentData {
  return {
    ...data,
    conditionString: getConditionString(data.condition),
    Ad_AI_noDisc: computeAdAI_noDisc(data.condition),
    Ad_AI_Disc: computeAdAI_Disc(data.condition),
    exposure_time_ms: data.qc?.stimulusExposureMs || 0,
    completion_time_ms: data.totalDurationMs || 0,
    device_type: detectDeviceType(),
    // Manipulation checks (computed)
    mc_ai_recognition: computeMC_AI_Recognition(data.manipulationChecks?.perceivedAuthor),
    mc_disclosure_recognition: computeMC_Disclosure_Recognition(data.manipulationChecks?.noticedDisclosure),
    // Attention check (computed)
    attention_check: computeAttentionCheck(data.qc?.attentionCheckPassed),
    // Cognitive Trust (CT1-CT4)
    CT1: data.trust?.cog1 || 0,
    CT2: data.trust?.cog2 || 0,
    CT3: data.trust?.cog3 || 0,
    CT4: data.trust?.cog4 || 0,
    // Affective Trust (ET1-ET4)
    ET1: data.trust?.aff1 || 0,
    ET2: data.trust?.aff2 || 0,
    ET3: data.trust?.aff3 || 0,
    ET4: data.trust?.aff4 || 0,
    // Purchase Intention (PI1-PI3)
    PI1: data.purchase?.pi1 || 0,
    PI2: data.purchase?.pi2 || 0,
    PI3: data.purchase?.pi3 || 0,
    // Willingness to Pay (WTP1-WTP3, WTP_max)
    WTP1: data.purchase?.wtp1 || 0,
    WTP2: data.purchase?.wtp2 || 0,
    WTP3: data.purchase?.wtp3 || 0,
    WTP_max: data.purchase?.wtp4 || 0,
    // Demographics
    age: data.demographics?.age || '',
    gender: data.demographics?.gender || '',
    country: data.demographics?.country || '',
    // Controls
    social_media_frequency: data.controls?.socialMediaFreq || '',
    // Attitude toward AI
    attitudeAI1: data.controls?.attitudeAI1 || 0,
    attitudeAI2: data.controls?.attitudeAI2 || 0,
    attitudeAI3: data.controls?.attitudeAI3 || 0,
  };
}

