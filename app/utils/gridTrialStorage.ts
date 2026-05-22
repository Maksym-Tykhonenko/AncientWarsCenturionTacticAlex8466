import AsyncStorage from '@react-native-async-storage/async-storage';

const BEST_SCORE_KEY = 'grid_trial_best_score';
const BEST_LEVEL_KEY = 'grid_trial_best_level';

export const getGridTrialBestScore = async (): Promise<number> => {
  const value = await AsyncStorage.getItem(BEST_SCORE_KEY);
  if (!value) {
    return 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getGridTrialBestLevel = async (): Promise<number> => {
  const value = await AsyncStorage.getItem(BEST_LEVEL_KEY);
  if (!value) {
    return 1;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 1;
};

export const saveGridTrialProgress = async (
  score: number,
  level: number,
): Promise<{bestScore: number; bestLevel: number}> => {
  const [currentScore, currentLevel] = await Promise.all([
    getGridTrialBestScore(),
    getGridTrialBestLevel(),
  ]);
  const bestScore = Math.max(currentScore, score);
  const bestLevel = Math.max(currentLevel, level);
  await Promise.all([
    AsyncStorage.setItem(BEST_SCORE_KEY, String(bestScore)),
    AsyncStorage.setItem(BEST_LEVEL_KEY, String(bestLevel)),
  ]);
  return {bestScore, bestLevel};
};
