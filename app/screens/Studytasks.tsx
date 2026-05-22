import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import CompletedStudyTaskCard from '../components/CompletedStudyTaskCard';
import StudyTaskCard from '../components/StudyTaskCard';
import Layyout from '../components/Layyout';
import {
  STUDY_TASKS,
  STUDY_TASK_BY_ID,
  type StudyTask,
} from '../data/studyTasks';
import type {RootStackParamList} from '../types/navigation';
import {
  type CompletedStudyTask,
  deleteCompletedTask,
  formatElapsedTime,
  getCompletedTasks,
} from '../utils/studyTasksStorage';
import {battleColors, battleFonts} from '../theme/battleTheme';

const H_PADDING = 20;

type TabKey = 'active' | 'completed';

type StudyTaskListItem =
  | {kind: 'active'; task: StudyTask}
  | {kind: 'completed'; taskId: string};

const Studytasks = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<TabKey>('active');
  const [completed, setCompleted] = useState<CompletedStudyTask[]>([]);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const loadCompleted = useCallback(async () => {
    const records = await getCompletedTasks();
    setCompleted(records);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCompleted();
    }, [loadCompleted]),
  );

  const completedIds = useMemo(
    () => new Set(completed.map(item => item.taskId)),
    [completed],
  );

  const activeTasks = useMemo(
    () => STUDY_TASKS.filter(task => !completedIds.has(task.id)),
    [completedIds],
  );

  const completedTasks = useMemo(
    () =>
      completed
        .map(record => ({
          record,
          task: STUDY_TASK_BY_ID[record.taskId],
        }))
        .filter(
          (
            item,
          ): item is {
            record: CompletedStudyTask;
            task: NonNullable<typeof item.task>;
          } => Boolean(item.task),
        )
        .sort(
          (a, b) =>
            new Date(b.record.completedAt).getTime() -
            new Date(a.record.completedAt).getTime(),
        ),
    [completed],
  );

  const stats = useMemo(() => {
    const totalSeconds = completed.reduce(
      (sum, item) => sum + item.elapsedSeconds,
      0,
    );
    const categories = new Set(completedTasks.map(item => item.task.sphere));
    return {
      count: completed.length,
      totalTime: formatElapsedTime(totalSeconds),
      categories: categories.size,
    };
  }, [completed, completedTasks]);

  const confirmDelete = async () => {
    if (!deleteTargetId) {
      return;
    }
    await deleteCompletedTask(deleteTargetId);
    setDeleteTargetId(null);
    await loadCompleted();
  };

  const openTask = (taskId: string) => {
    navigation.navigate('StudyTaskDetail', {taskId});
  };

  const openEditNotes = (taskId: string, notes: string) => {
    navigation.navigate('StudyTaskEditNotes', {
      taskId,
      notes,
      source: 'completed',
    });
  };

  const listData: StudyTaskListItem[] = useMemo(() => {
    if (tab === 'active') {
      return activeTasks.map(task => ({kind: 'active' as const, task}));
    }
    return completedTasks.map(item => ({
      kind: 'completed' as const,
      taskId: item.record.taskId,
    }));
  }, [tab, activeTasks, completedTasks]);

  return (
    <Layyout bounce={false}>
      <View style={[styles.screen, {paddingTop: insets.top + 8}]}>
        <View style={styles.header}>
          <Text style={styles.heading}>Study Tasks</Text>

          <View style={styles.tabs}>
            <Pressable
              onPress={() => setTab('active')}
              style={[styles.tab, tab === 'active' && styles.tabActive]}>
              <Text
                style={[
                  styles.tabText,
                  tab === 'active' && styles.tabTextActive,
                ]}>
                ACTIVE TASKS
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab('completed')}
              style={[styles.tab, tab === 'completed' && styles.tabActive]}>
              <Text
                style={[
                  styles.tabText,
                  tab === 'completed' && styles.tabTextActive,
                ]}>
                COMPLETED ({completed.length})
              </Text>
            </Pressable>
          </View>
        </View>

        {tab === 'completed' && completed.length > 0 ? (
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.count}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalTime}</Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.categories}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
          </View>
        ) : null}

        <FlatList
          data={listData}
          scrollEnabled={false}
          keyExtractor={item =>
            item.kind === 'active' ? item.task.id : item.taskId
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            tab === 'completed' ? (
              <View style={styles.empty}>
                <Text style={styles.emptyIcon}>📜</Text>
                <Text style={styles.emptyTitle}>NO COMPLETED TASKS YET.</Text>
                <Text style={styles.emptySubtitle}>
                  START A TASK TO BEGIN YOUR JOURNEY!
                </Text>
              </View>
            ) : null
          }
          renderItem={({item}) => {
            if (item.kind === 'active') {
              return (
                <StudyTaskCard
                  task={item.task}
                  onPress={() => openTask(item.task.id)}
                />
              );
            }

            const pair = completedTasks.find(
              entry => entry.record.taskId === item.taskId,
            );
            if (!pair) {
              return null;
            }

            return (
              <CompletedStudyTaskCard
                task={pair.task}
                record={pair.record}
                onEditNotes={() =>
                  openEditNotes(pair.record.taskId, pair.record.notes)
                }
                onDelete={() => setDeleteTargetId(pair.record.taskId)}
              />
            );
          }}
        />
      </View>

      <Modal
        visible={deleteTargetId !== null}
        transparent
        statusBarTranslucent={Platform.OS === 'android'}
        animationType="fade"
        onRequestClose={() => setDeleteTargetId(null)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setDeleteTargetId(null)}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
            <Pressable style={styles.modalCard} onPress={() => undefined}>
              <Text style={styles.modalTitle}>DELETE TASK?</Text>
              <Text style={styles.modalMessage}>
                This completed task and its notes will be permanently removed.
              </Text>
              <View style={styles.modalActions}>
                <Pressable
                  onPress={() => setDeleteTargetId(null)}
                  style={({pressed}) => [
                    styles.modalButton,
                    pressed && styles.modalButtonPressed,
                  ]}>
                  <Text style={styles.modalCancelText}>CANCEL</Text>
                </Pressable>
                <Pressable
                  onPress={confirmDelete}
                  style={({pressed}) => [
                    styles.modalButton,
                    styles.modalDeleteButton,
                    pressed && styles.modalButtonPressed,
                  ]}>
                  <Text style={styles.modalDeleteText}>DELETE</Text>
                </Pressable>
              </View>
            </Pressable>
          </ScrollView>
        </Pressable>
      </Modal>
    </Layyout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 12,
  },
  heading: {
    fontFamily: battleFonts.bold,
    fontSize: 22,
    lineHeight: 33,
    letterSpacing: 2,
    color: battleColors.gold,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: battleColors.gold,
  },
  tabText: {
    fontFamily: battleFonts.bold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
    color: battleColors.body,
  },
  tabTextActive: {
    color: battleColors.buttonText,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: H_PADDING,
    marginBottom: 12,
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: battleFonts.bold,
    fontSize: 18,
    lineHeight: 24,
    color: battleColors.gold,
  },
  statLabel: {
    fontSize: 10,
    lineHeight: 14,
    color: battleColors.body,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 24,
    gap: 10,
    flexGrow: 1,
  },
  empty: {
    paddingTop: 80,
    paddingHorizontal: 24,
    gap: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    fontFamily: battleFonts.bold,
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 1.5,
    color: '#9A7C54',
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#9A7C54',
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  modalCard: {
    width: '100%',
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  modalTitle: {
    fontFamily: battleFonts.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1.5,
    color: battleColors.gold,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.body,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: battleColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDeleteButton: {
    borderColor: '#8b3030',
  },
  modalButtonPressed: {
    opacity: 0.9,
  },
  modalCancelText: {
    fontFamily: battleFonts.bold,
    fontSize: 12,
    letterSpacing: 1.5,
    color: battleColors.gold,
  },
  modalDeleteText: {
    fontFamily: battleFonts.bold,
    fontSize: 12,
    letterSpacing: 1.5,
    color: '#c75050',
  },
});

export default Studytasks;
