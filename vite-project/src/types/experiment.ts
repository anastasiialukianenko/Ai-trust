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
  cog2?: number; // reliable
  cog3?: number; // functional
  cog4?: number; // helpful
  aff1?: number; // honest
  aff2?: number; // fair
  aff3?: number; // beneficial
  aff4?: number; // respectful
}

export interface PurchaseData {
  pi1?: number; 
  pi2?: number; 
  pi3?: number; 
  pi4?: number; 
  wtp1?: number; 
  wtp2?: number; 
  wtp3?: number; 
  wtp4?: number; 
}

export interface ManipChecks {
  perceivedAuthor?: string; // 'A human' | 'An AI tool' | 'Not sure'
  noticedDisclosure?: string; // 'Yes' | 'No'
}

export interface Controls {
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
