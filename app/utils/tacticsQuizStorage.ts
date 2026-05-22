import AsyncStorage from '@react-native-async-storage/async-storage';

const BEST_SCORE_KEY = 'tactics_quiz_best_score';

export const getBestQuizScore = async (): Promise<number> => {
  const value = await AsyncStorage.getItem(BEST_SCORE_KEY);
  if (!value) {
    return 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const saveBestQuizScore = async (score: number): Promise<number> => {
  const current = await getBestQuizScore();
  const next = Math.max(current, score);
  if (next > current) {
    await AsyncStorage.setItem(BEST_SCORE_KEY, String(next));
  }
  return next;
};
