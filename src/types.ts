export type ToolChoice = 'ChatGPT' | 'Gemini' | 'Midjourney' | 'Other tool' | null;

export type EstimateType = 'representative' | 'model-based';

export type EstimateReason = 'unknown-model' | 'included-model' | 'unlisted-model';

export type Resolution = '512' | '1024';

export interface StageData {
  count: number;
  resolution: Resolution;
  carbon: number;
}

export interface WorkflowState {
  currentPage: number; // 1 to 9 (where 9 is completion)
  selectedTool: ToolChoice;
  customToolName: string;
  knowsModel: boolean | null;
  selectedModel: string | null; // model name e.g. "SD_1.5" or "OTHER"
  estimateType: EstimateType;
  estimateReason: EstimateReason;
  
  ideation: StageData;
  iteration: StageData;
  refinement: StageData;
  
  selectedAccumulationReasons: string[]; // Page 7 choices (up to 3)
  selectedTakeaways: string[]; // Page 8 choices (up to 2)
}

export interface LargestContributionResult {
  stages: Array<'Ideation' | 'Iteration' | 'Refinement'>;
  isZero: boolean;
  isTie: boolean;
  messageHeading: string;
  messageText: string;
}
