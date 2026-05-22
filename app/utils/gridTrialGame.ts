import {GRID_TRIAL_SYMBOLS} from '../data/gridTrialSymbols';
import type {GridTrialLevelConfig} from '../data/gridTrialLevels';

export type GridCell = {
  index: number;
  isTarget: boolean;
  symbol: string | null;
  found: boolean;
  wrongFlash: boolean;
};

export type GamePhase = 'memorize' | 'find';

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const buildLevelGrid = (config: GridTrialLevelConfig): GridCell[] => {
  const totalCells = config.gridSize * config.gridSize;
  const indices = shuffle(
    Array.from({length: totalCells}, (_, index) => index),
  );
  const targetIndices = new Set(indices.slice(0, config.targetCount));
  const symbols = shuffle([...GRID_TRIAL_SYMBOLS]).slice(0, config.targetCount);
  let symbolIndex = 0;

  return Array.from({length: totalCells}, (_, index) => {
    const isTarget = targetIndices.has(index);
    return {
      index,
      isTarget,
      symbol: isTarget ? symbols[symbolIndex++] : null,
      found: false,
      wrongFlash: false,
    };
  });
};
