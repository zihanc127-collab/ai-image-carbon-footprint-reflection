import { describe, expect, it } from 'vitest';
import { MODELS_DATA } from '../data/modelsData';
import {
  calculateMedian,
  calculateStageCarbon,
  calculateWorkflowTotals,
  determineLargestContribution,
  formatCarbon,
  getDatasetMedians,
  getPerImageCarbon
} from './calculations';

describe('Calculation Logic Tests', () => {
  // Test 1: Median calculation for 512 values
  it('1. calculates correct 512 median equal to 0.095194', () => {
    const values512 = MODELS_DATA.map((m) => m.gCO2_512);
    const median512 = calculateMedian(values512);
    expect(median512).toBeCloseTo(0.095194, 6);
    expect(median512).toBe(0.095194);
  });

  // Test 2: Median calculation for 1024 values
  it('2. calculates correct 1024 median equal to 0.163645', () => {
    const values1024 = MODELS_DATA.map((m) => m.gCO2_1024);
    const median1024 = calculateMedian(values1024);
    expect(median1024).toBeCloseTo(0.163645, 6);
    expect(median1024).toBe(0.163645);
  });

  // Test 3: Model-based 512 calculation
  it('3. calculates model-based 512 stage carbon correctly', () => {
    // SD_1.5 512 value is 0.095194
    const count = 10;
    const carbon = calculateStageCarbon(count, '512', 'model-based', 'SD_1.5');
    expect(carbon).toBe(10 * 0.095194);
  });

  // Test 4: Model-based 1024 calculation
  it('4. calculates model-based 1024 stage carbon correctly', () => {
    // Lumina 1024 value is 2.883308
    const count = 5;
    const carbon = calculateStageCarbon(count, '1024', 'model-based', 'Lumina');
    expect(carbon).toBe(5 * 2.883308);
  });

  // Test 5: Representative 512 calculation
  it('5. calculates representative 512 stage carbon using dataset median', () => {
    const { median512 } = getDatasetMedians();
    const count = 6;
    const carbon = calculateStageCarbon(count, '512', 'representative', null);
    expect(carbon).toBe(6 * median512);
    expect(carbon).toBe(6 * 0.095194);
  });

  // Test 6: Representative 1024 calculation
  it('6. calculates representative 1024 stage carbon using dataset median', () => {
    const { median1024 } = getDatasetMedians();
    const count = 15;
    const carbon = calculateStageCarbon(count, '1024', 'representative', null);
    expect(carbon).toBe(15 * median1024);
    expect(carbon).toBe(15 * 0.163645);
  });

  // Test 7: Workflow with different resolutions across stages
  it('7. calculates workflow with different resolutions per stage correctly', () => {
    // SDXL: 512 = 0.15771, 1024 = 0.454728
    const ideationCarbon = calculateStageCarbon(6, '512', 'model-based', 'SDXL'); // 6 * 0.15771 = 0.94626
    const iterationCarbon = calculateStageCarbon(15, '1024', 'model-based', 'SDXL'); // 15 * 0.454728 = 6.82092
    const refinementCarbon = calculateStageCarbon(3, '1024', 'model-based', 'SDXL'); // 3 * 0.454728 = 1.364184

    const totals = calculateWorkflowTotals(
      ideationCarbon,
      iterationCarbon,
      refinementCarbon,
      6,
      15,
      3
    );

    expect(totals.totalImageCount).toBe(24);
    expect(totals.totalCarbon).toBeCloseTo(0.94626 + 6.82092 + 1.364184, 6);
  });

  // Test 8: Workflow with zero values
  it('8. handles zero count stages correctly', () => {
    const ideationCarbon = calculateStageCarbon(0, '512', 'representative', null);
    const iterationCarbon = calculateStageCarbon(0, '1024', 'representative', null);
    const refinementCarbon = calculateStageCarbon(0, '512', 'representative', null);

    const totals = calculateWorkflowTotals(ideationCarbon, iterationCarbon, refinementCarbon, 0, 0, 0);

    expect(totals.totalImageCount).toBe(0);
    expect(totals.totalCarbon).toBe(0);
    expect(formatCarbon(totals.totalCarbon)).toBe('0.000 gCO₂');
  });

  // Test 9: Largest contribution detection
  it('9. detects largest stage contribution based on carbon value, not image count', () => {
    // Suppose Ideation has 20 images at 512 (20 * 0.095194 = 1.90388)
    // Iteration has 1 image at Lumina 1024 (1 * 2.883308 = 2.883308)
    // Refinement has 0
    const res = determineLargestContribution(1.90388, 2.883308, 0);

    expect(res.isZero).toBe(false);
    expect(res.isTie).toBe(false);
    expect(res.stages).toEqual(['Iteration']);
    expect(res.messageHeading).toBe('Largest contribution: Iteration');
  });

  // Test 10: Tie handling
  it('10. handles ties when two or three stages have equal carbon contribution', () => {
    const carbonA = 1.5;
    const carbonB = 1.5;
    const carbonC = 0.5;

    const resTie = determineLargestContribution(carbonA, carbonB, carbonC);
    expect(resTie.isTie).toBe(true);
    expect(resTie.stages).toEqual(['Ideation', 'Iteration']);
    expect(resTie.messageHeading).toBe('Largest contributions: Ideation and Iteration');
    expect(resTie.messageText).toBe('These stages contributed equally to the estimate.');
  });

  // Test 11: Formatting without changing raw precision
  it('11. formats display strings without corrupting internal raw floats', () => {
    const rawVal = 0.095194;
    const displayStr = formatCarbon(rawVal);

    expect(displayStr).toBe('0.095 gCO₂');
    // Verify raw value remains unrounded
    expect(rawVal).toBe(0.095194);

    // Negative zero test
    expect(formatCarbon(-0.0000001)).toBe('0.000 gCO₂');
  });
});
