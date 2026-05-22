import type {StudyTask} from '../data/studyTasks';

export const formatStudyTaskMeta = (task: StudyTask): string =>
  `${task.sphere} · ~${task.minutes} min`;
