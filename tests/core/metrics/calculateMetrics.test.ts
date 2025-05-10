import { type Mock, describe, expect, it, vi } from 'vitest';
import type { ProcessedFile } from '../../../src/core/file/fileTypes.js';
import type { GitDiffResult } from '../../../src/core/file/gitDiff.js';
import { TokenCounter } from '../../../src/core/metrics/TokenCounter.js';
import { calculateAllFileMetrics } from '../../../src/core/metrics/calculateAllFileMetrics.js';
import { calculateMetrics } from '../../../src/core/metrics/calculateMetrics.js';
import type { RepomixProgressCallback } from '../../../src/shared/types.js';
import { createMockConfig } from '../../testing/testUtils.js';

vi.mock('../../../src/core/metrics/TokenCounter.js', () => {
  return {
    TokenCounter: vi.fn().mockImplementation(() => ({
      countTokens: vi.fn().mockReturnValue(10),
      free: vi.fn(),
    })),
  };
});
vi.mock('../../../src/core/metrics/aggregateMetrics.js');
vi.mock('../../../src/core/metrics/calculateAllFileMetrics.js');

describe('calculateMetrics', () => {
  it('should calculate metrics and return the result', async () => {
    const processedFiles: ProcessedFile[] = [
      { path: 'file1.txt', content: 'a'.repeat(100) },
      { path: 'file2.txt', content: 'b'.repeat(200) },
    ];
    const output = 'a'.repeat(300);
    const progressCallback: RepomixProgressCallback = vi.fn();

    const fileMetrics = [
      { path: 'file1.txt', charCount: 100, tokenCount: 10 },
      { path: 'file2.txt', charCount: 200, tokenCount: 20 },
    ];
    (calculateAllFileMetrics as unknown as Mock).mockResolvedValue(fileMetrics);

    const aggregatedResult = {
      totalFiles: 2,
      totalCharacters: 300,
      totalTokens: 30,
      fileCharCounts: {
        'file1.txt': 100,
        'file2.txt': 200,
      },
      fileTokenCounts: {
        'file1.txt': 10,
        'file2.txt': 20,
      },
      gitDiffTokenCount: 0,
    };

    const config = createMockConfig();

    const gitDiffResult: GitDiffResult | undefined = undefined;

    const result = await calculateMetrics(processedFiles, output, progressCallback, config, gitDiffResult, {
      calculateAllFileMetrics,
      calculateOutputMetrics: () => Promise.resolve(30),
    });

    expect(progressCallback).toHaveBeenCalledWith('Calculating metrics...');
    expect(calculateAllFileMetrics).toHaveBeenCalledWith(processedFiles, 'o200k_base', progressCallback);
    expect(result).toEqual(aggregatedResult);
  });
});
