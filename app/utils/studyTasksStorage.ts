import AsyncStorage from '@react-native-async-storage/async-storage';

const COMPLETED_KEY = 'study_tasks_completed';

export type CompletedStudyTask = {
  taskId: string;
  notes: string;
  elapsedSeconds: number;
  completedAt: string;
};

const parseCompleted = (raw: string | null): CompletedStudyTask[] => {
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as CompletedStudyTask[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getCompletedTasks = async (): Promise<CompletedStudyTask[]> => {
  const raw = await AsyncStorage.getItem(COMPLETED_KEY);
  return parseCompleted(raw);
};

export const getCompletedTask = async (
  taskId: string,
): Promise<CompletedStudyTask | null> => {
  const all = await getCompletedTasks();
  return all.find(item => item.taskId === taskId) ?? null;
};

export const getCompletedTaskIds = async (): Promise<Set<string>> => {
  const all = await getCompletedTasks();
  return new Set(all.map(item => item.taskId));
};

export const completeStudyTask = async (
  record: CompletedStudyTask,
): Promise<void> => {
  const all = await getCompletedTasks();
  const next = [...all.filter(item => item.taskId !== record.taskId), record];
  await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
};

export const updateCompletedNotes = async (
  taskId: string,
  notes: string,
): Promise<void> => {
  const all = await getCompletedTasks();
  const next = all.map(item =>
    item.taskId === taskId ? {...item, notes} : item,
  );
  await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
};

export const deleteCompletedTask = async (taskId: string): Promise<void> => {
  const all = await getCompletedTasks();
  const next = all.filter(item => item.taskId !== taskId);
  await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(next));
};

export const formatElapsedTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const formatCompletedDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
