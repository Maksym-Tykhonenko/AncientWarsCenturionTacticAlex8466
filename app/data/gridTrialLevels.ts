export type GridTrialLevelConfig = {
  level: number;
  gridSize: number;
  targetCount: number;
  memorizeSeconds: number;
  pointsPerSymbol: number;
};

export const GRID_TRIAL_LEVELS: GridTrialLevelConfig[] = [
  {level: 1, gridSize: 3, targetCount: 3, memorizeSeconds: 3, pointsPerSymbol: 10},
  {level: 2, gridSize: 3, targetCount: 4, memorizeSeconds: 2, pointsPerSymbol: 15},
  {level: 3, gridSize: 4, targetCount: 5, memorizeSeconds: 2, pointsPerSymbol: 20},
  {level: 4, gridSize: 4, targetCount: 6, memorizeSeconds: 2, pointsPerSymbol: 25},
  {level: 5, gridSize: 4, targetCount: 7, memorizeSeconds: 2, pointsPerSymbol: 30},
  {level: 6, gridSize: 4, targetCount: 8, memorizeSeconds: 1, pointsPerSymbol: 35},
  {level: 7, gridSize: 4, targetCount: 9, memorizeSeconds: 1, pointsPerSymbol: 40},
  {level: 8, gridSize: 4, targetCount: 10, memorizeSeconds: 1, pointsPerSymbol: 45},
];

export const getLevelConfig = (level: number): GridTrialLevelConfig => {
  const found = GRID_TRIAL_LEVELS.find(item => item.level === level);
  if (found) {
    return found;
  }
  const last = GRID_TRIAL_LEVELS[GRID_TRIAL_LEVELS.length - 1];
  return {
    ...last,
    level,
    targetCount: Math.min(last.gridSize * last.gridSize, last.targetCount + (level - last.level)),
    pointsPerSymbol: last.pointsPerSymbol + (level - last.level) * 5,
  };
};
