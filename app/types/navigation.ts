import type {NavigatorScreenParams} from '@react-navigation/native';

export type TabParamList = {
  AncientBattls: undefined;
  BattlMap: {battleId?: string; latitude?: number; longitude?: number} | undefined;
  Tactics: undefined;
  Studytasks: undefined;
  GridTrial: undefined;
};

export type RootStackParamList = {
  Loadder: undefined;
  Onboarding: undefined;
  TabbsNav: NavigatorScreenParams<TabParamList> | undefined;
  BattlDetail: {battleId: string};
  TacticsQuiz: undefined;
  TacticsQuizResults: {
    score: number;
    correctCount: number;
    total: number;
    bestScore: number;
  };
  StudyTaskDetail: {taskId: string; notes?: string};
  StudyTaskEditNotes: {
    taskId: string;
    notes: string;
    source: 'active' | 'completed';
  };
  GridTrialGame: undefined;
  GridTrialResults: {
    score: number;
    bestScore: number;
    level: number;
    bestLevel: number;
  };
};
