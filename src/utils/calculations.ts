import { MODELS_DATA } from '../data/modelsData';
import { EstimateType, LargestContributionResult, Resolution } from '../types';

/**
 * Calculates the median of an array of numbers.
 * Sorts numerically (not alphabetically).
 */
export function calculateMedian(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  } else {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
}

/**
 * Calculates the dataset medians for 512x512 and 1024x1024 across the 17 supplied models.
 * Returns exact unrounded medians.
 */
export function getDatasetMedians(): { median512: number; median1024: number } {
  const gCO2_512_list = MODELS_DATA.map((m) => m.gCO2_512);
  const gCO2_1024_list = MODELS_DATA.map((m) => m.gCO2_1024);

  return {
    median512: calculateMedian(gCO2_512_list),
    median1024: calculateMedian(gCO2_1024_list)
  };
}

/**
 * Returns the exact per-image carbon footprint for a given resolution, estimate type, and model.
 */
export function getPerImageCarbon(
  resolution: Resolution,
  estimateType: EstimateType,
  selectedModelName: string | null
): number {
  const { median512, median1024 } = getDatasetMedians();

  if (estimateType === 'representative' || !selectedModelName || selectedModelName === 'OTHER') {
    return resolution === '512' ? median512 : median1024;
  }

  const foundModel = MODELS_DATA.find((m) => m.model === selectedModelName);
  if (!foundModel) {
    return resolution === '512' ? median512 : median1024;
  }

  return resolution === '512' ? foundModel.gCO2_512 : foundModel.gCO2_1024;
}

/**
 * Calculates stage carbon given count, resolution, estimateType, and model.
 * Preserves full floating point precision.
 */
export function calculateStageCarbon(
  count: number,
  resolution: Resolution,
  estimateType: EstimateType,
  selectedModelName: string | null
): number {
  if (count <= 0) return 0;
  const perImage = getPerImageCarbon(resolution, estimateType, selectedModelName);
  return count * perImage;
}

/**
 * Calculates total workflow image count and total carbon footprint.
 */
export function calculateWorkflowTotals(
  ideationCarbon: number,
  iterationCarbon: number,
  refinementCarbon: number,
  ideationCount: number,
  iterationCount: number,
  refinementCount: number
): { totalImageCount: number; totalCarbon: number } {
  return {
    totalImageCount: ideationCount + iterationCount + refinementCount,
    totalCarbon: ideationCarbon + iterationCarbon + refinementCarbon
  };
}

/**
 * Determines which stage has the largest carbon contribution based on raw carbon values.
 */
export function determineLargestContribution(
  ideationCarbon: number,
  iterationCarbon: number,
  refinementCarbon: number
): LargestContributionResult {
  const total = ideationCarbon + iterationCarbon + refinementCarbon;

  if (total <= 0) {
    return {
      stages: [],
      isZero: true,
      isTie: false,
      messageHeading: 'No footprint was entered for this workflow.',
      messageText: 'Add generated images in the previous stages to create a workflow estimate.'
    };
  }

  const maxVal = Math.max(ideationCarbon, iterationCarbon, refinementCarbon);
  const stages: Array<'Ideation' | 'Iteration' | 'Refinement'> = [];

  // Match floating point precision using a small epsilon if needed, though exact equality works for same factors
  const eps = 1e-12;
  if (Math.abs(ideationCarbon - maxVal) < eps) stages.push('Ideation');
  if (Math.abs(iterationCarbon - maxVal) < eps) stages.push('Iteration');
  if (Math.abs(refinementCarbon - maxVal) < eps) stages.push('Refinement');

  if (stages.length > 1) {
    let stageNamesText = '';
    if (stages.length === 2) {
      stageNamesText = `${stages[0]} and ${stages[1]}`;
    } else {
      stageNamesText = `${stages[0]}, ${stages[1]} and ${stages[2]}`;
    }

    return {
      stages,
      isZero: false,
      isTie: true,
      messageHeading: `Largest contributions: ${stageNamesText}`,
      messageText: 'These stages contributed equally to the estimate.'
    };
  }

  const largestStage = stages[0];
  let messageText = '';
  if (largestStage === 'Iteration') {
    messageText = 'Your estimated footprint grew mainly through repeated regeneration.';
  } else if (largestStage === 'Ideation') {
    messageText = 'Your estimated footprint grew mainly during early visual exploration.';
  } else if (largestStage === 'Refinement') {
    messageText = 'Your estimated footprint grew mainly from final or near-final image outputs.';
  }

  return {
    stages: [largestStage],
    isZero: false,
    isTie: false,
    messageHeading: `Largest contribution: ${largestStage}`,
    messageText
  };
}

/**
 * Formats carbon float value to 3 decimal places with "gCO₂" suffix.
 * Handles negative zero (-0.000) cleanly.
 */
export function formatCarbon(value: number): string {
  if (Math.abs(value) < 1e-9) {
    return '0.000 gCO₂';
  }
  const formatted = value.toFixed(3);
  if (formatted === '-0.000' || formatted === '-0.00') {
    return '0.000 gCO₂';
  }
  return `${formatted} gCO₂`;
}
