export type Condition = 1 | 2 | 3;

export type Step = 
  | 'consent'
  | 'screening'
  | 'stimulus'
  | 'trust'
  | 'purchase'
  | 'manipChecks'
  | 'controls'
  | 'attention'
  | 'debrief'
  | 'submit'
  | 'thankyou';

export interface TrustData {
  cog1?: number; // reliable
  cog2?: number; // accurate
  cog3?: number; // professional
  aff1?: number; // honest
  aff2?: number; // has my best interests at heart
  aff3?: number; // sincere/not manipulative
}

export interface PurchaseData {
  pi1?: number; // I would consider buying this product
  pi2?: number; // I would like to try this product
  pi3?: number; // I am likely to purchase this product
  pi4?: number; // I would recommend this product to others
  wtp?: number; // Willingness to pay (in EUR)
}

export interface ManipChecks {
  perceivedAuthor?: string; // 'A human' | 'An AI tool' | 'Not sure'
  noticedDisclosure?: string; // 'Yes' | 'No'
}

export interface Controls {
  willingnessToPay: number;
  socialMediaFreq?: string;
  attitudeAI1?: number; // Overall, I feel positive about artificial intelligence
  attitudeAI2?: number; // I trust AI systems to make good decisions
  attitudeAI3?: number; // I worry about the negative impacts of AI (reverse-coded)
}

export interface Demographics {
  age?: string;
  country?: string;
  gender?: string;
  education?: string;
  [key: string]: string | undefined;
}

export interface QC {
  attentionCheckAnswer?: string;
  attentionCheckPassed?: boolean;
  stimulusExposureMs?: number;
  [key: string]: any;
}

export interface ExperimentData {
  participantId: string;
  condition: Condition;
  startTime: number;
  startedAt?: number;
  consentTime?: number;
  stimulusViewTime?: number;
  finishedAt?: number;
  totalDurationMs?: number;
  trust?: TrustData;
  purchase?: PurchaseData;
  manipulationChecks?: ManipChecks;
  controls?: Controls;
  demographics?: Demographics;
  qc?: QC;
  completionTime?: number;
  [key: string]: any;
}

export interface ScreenProps {
  data: ExperimentData;
  setData: React.Dispatch<React.SetStateAction<ExperimentData>>;
  onNext: (next: Step) => void;
  condition?: Condition;
}

export interface DebriefProps {
  onFinish: () => void;
}
