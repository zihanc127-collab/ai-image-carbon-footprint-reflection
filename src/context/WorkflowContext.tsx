import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import {
  EstimateReason,
  EstimateType,
  LargestContributionResult,
  Resolution,
  StageData,
  ToolChoice,
  WorkflowState
} from '../types';
import {
  calculateStageCarbon,
  calculateWorkflowTotals,
  determineLargestContribution
} from '../utils/calculations';

interface WorkflowContextType extends WorkflowState {
  // Calculated stage carbon values
  ideationCarbon: number;
  iterationCarbon: number;
  refinementCarbon: number;
  totalImageCount: number;
  totalCarbon: number;
  largestContribution: LargestContributionResult;

  // Actions
  goToPage: (page: number) => void;
  goNext: () => void;
  goBack: () => void;
  resetWorkflow: () => void;
  setToolChoice: (tool: ToolChoice, customName?: string) => void;
  setModelKnowledgeChoice: (knows: boolean, modelName?: string | null) => void;
  updateStageCount: (stage: 'ideation' | 'iteration' | 'refinement', count: number) => void;
  updateStageResolution: (stage: 'ideation' | 'iteration' | 'refinement', resolution: Resolution) => void;
  toggleAccumulationReason: (reason: string) => { success: boolean; message?: string };
  toggleTakeaway: (takeaway: string) => { success: boolean; message?: string };
}

const initialStageState = (defaultCount: number): StageData => ({
  count: defaultCount,
  resolution: '512',
  carbon: 0
});

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTool, setSelectedTool] = useState<ToolChoice>(null);
  const [customToolName, setCustomToolName] = useState<string>('');
  const [knowsModel, setKnowsModel] = useState<boolean | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [estimateType, setEstimateType] = useState<EstimateType>('representative');
  const [estimateReason, setEstimateReason] = useState<EstimateReason>('unknown-model');

  const [ideation, setIdeation] = useState<StageData>(initialStageState(0));
  const [iteration, setIteration] = useState<StageData>(initialStageState(0));
  const [refinement, setRefinement] = useState<StageData>(initialStageState(0));

  const [selectedAccumulationReasons, setSelectedAccumulationReasons] = useState<string[]>([]);
  const [selectedTakeaways, setSelectedTakeaways] = useState<string[]>([]);

  // Calculate carbon on the fly whenever dependencies change
  const ideationCarbon = useMemo(() => {
    return calculateStageCarbon(ideation.count, ideation.resolution, estimateType, selectedModel);
  }, [ideation.count, ideation.resolution, estimateType, selectedModel]);

  const iterationCarbon = useMemo(() => {
    return calculateStageCarbon(iteration.count, iteration.resolution, estimateType, selectedModel);
  }, [iteration.count, iteration.resolution, estimateType, selectedModel]);

  const refinementCarbon = useMemo(() => {
    return calculateStageCarbon(refinement.count, refinement.resolution, estimateType, selectedModel);
  }, [refinement.count, refinement.resolution, estimateType, selectedModel]);

  const { totalImageCount, totalCarbon } = useMemo(() => {
    return calculateWorkflowTotals(
      ideationCarbon,
      iterationCarbon,
      refinementCarbon,
      ideation.count,
      iteration.count,
      refinement.count
    );
  }, [ideationCarbon, iterationCarbon, refinementCarbon, ideation.count, iteration.count, refinement.count]);

  const largestContribution = useMemo(() => {
    return determineLargestContribution(ideationCarbon, iterationCarbon, refinementCarbon);
  }, [ideationCarbon, iterationCarbon, refinementCarbon]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= 9) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goNext = () => goToPage(currentPage + 1);
  const goBack = () => goToPage(currentPage - 1);

  const resetWorkflow = () => {
    setCurrentPage(1);
    setSelectedTool(null);
    setCustomToolName('');
    setKnowsModel(null);
    setSelectedModel(null);
    setEstimateType('representative');
    setEstimateReason('unknown-model');
    setIdeation(initialStageState(0));
    setIteration(initialStageState(0));
    setRefinement(initialStageState(0));
    setSelectedAccumulationReasons([]);
    setSelectedTakeaways([]);
  };

  const setToolChoice = (tool: ToolChoice, customName: string = '') => {
    setSelectedTool(tool);
    if (tool === 'Other tool') {
      setCustomToolName(customName);
    } else {
      setCustomToolName('');
    }
  };

  const setModelKnowledgeChoice = (knows: boolean, modelName: string | null = null) => {
    setKnowsModel(knows);
    if (!knows) {
      setEstimateType('representative');
      setEstimateReason('unknown-model');
      setSelectedModel(null);
    } else {
      if (modelName === 'OTHER') {
        setEstimateType('representative');
        setEstimateReason('unlisted-model');
        setSelectedModel('OTHER');
      } else if (modelName) {
        setEstimateType('model-based');
        setEstimateReason('included-model');
        setSelectedModel(modelName);
      } else {
        setSelectedModel(null);
      }
    }
  };

  const updateStageCount = (stage: 'ideation' | 'iteration' | 'refinement', count: number) => {
    const clampedCount = Math.max(0, Math.min(30, count));
    if (stage === 'ideation') setIdeation((prev) => ({ ...prev, count: clampedCount }));
    if (stage === 'iteration') setIteration((prev) => ({ ...prev, count: clampedCount }));
    if (stage === 'refinement') setRefinement((prev) => ({ ...prev, count: clampedCount }));
  };

  const updateStageResolution = (stage: 'ideation' | 'iteration' | 'refinement', resolution: Resolution) => {
    if (stage === 'ideation') setIdeation((prev) => ({ ...prev, resolution }));
    if (stage === 'iteration') setIteration((prev) => ({ ...prev, resolution }));
    if (stage === 'refinement') setRefinement((prev) => ({ ...prev, resolution }));
  };

  const toggleAccumulationReason = (reason: string): { success: boolean; message?: string } => {
    if (selectedAccumulationReasons.includes(reason)) {
      setSelectedAccumulationReasons((prev) => prev.filter((r) => r !== reason));
      return { success: true };
    } else {
      if (selectedAccumulationReasons.length >= 3) {
        return { success: false, message: 'You can select up to three.' };
      }
      setSelectedAccumulationReasons((prev) => [...prev, reason]);
      return { success: true };
    }
  };

  const toggleTakeaway = (takeaway: string): { success: boolean; message?: string } => {
    if (selectedTakeaways.includes(takeaway)) {
      setSelectedTakeaways((prev) => prev.filter((t) => t !== takeaway));
      return { success: true };
    } else {
      if (selectedTakeaways.length >= 2) {
        return { success: false, message: 'You can select up to two.' };
      }
      setSelectedTakeaways((prev) => [...prev, takeaway]);
      return { success: true };
    }
  };

  return (
    <WorkflowContext.Provider
      value={{
        currentPage,
        selectedTool,
        customToolName,
        knowsModel,
        selectedModel,
        estimateType,
        estimateReason,
        ideation: { ...ideation, carbon: ideationCarbon },
        iteration: { ...iteration, carbon: iterationCarbon },
        refinement: { ...refinement, carbon: refinementCarbon },
        ideationCarbon,
        iterationCarbon,
        refinementCarbon,
        totalImageCount,
        totalCarbon,
        largestContribution,
        selectedAccumulationReasons,
        selectedTakeaways,
        goToPage,
        goNext,
        goBack,
        resetWorkflow,
        setToolChoice,
        setModelKnowledgeChoice,
        updateStageCount,
        updateStageResolution,
        toggleAccumulationReason,
        toggleTakeaway
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
