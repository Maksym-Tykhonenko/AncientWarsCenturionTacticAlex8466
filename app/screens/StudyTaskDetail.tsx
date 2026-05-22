import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {STUDY_TASK_BY_ID} from '../data/studyTasks';
import type {RootStackParamList} from '../types/navigation';
import {
  completeStudyTask,
  formatElapsedTime,
  getCompletedTask,
} from '../utils/studyTasksStorage';
import {battleColors, battleFonts} from '../theme/battleTheme';

type DetailRoute = RouteProp<RootStackParamList, 'StudyTaskDetail'>;

const StudyTaskDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<DetailRoute>();
  const insets = useSafeAreaInsets();
  const task = STUDY_TASK_BY_ID[route.params.taskId];

  const [notes, setNotes] = useState(route.params.notes ?? '');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [completing, setCompleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      return;
    }
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const checkCompleted = async () => {
        const existing = await getCompletedTask(route.params.taskId);
        if (existing) {
          navigation.replace('TabbsNav', {screen: 'Studytasks'});
        }
      };
      checkCompleted();
      startTimer();
    }, [navigation, route.params.taskId, startTimer]),
  );

  useEffect(() => () => stopTimer(), [stopTimer]);

  if (!task) {
    return (
      <View style={styles.missing}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.backLabel}>‹ Back</Text>
        </Pressable>
        <Text style={styles.missingText}>Task not found</Text>
      </View>
    );
  }

  const markComplete = async () => {
    if (completing) {
      return;
    }
    setCompleting(true);
    stopTimer();
    await completeStudyTask({
      taskId: task.id,
      notes: notes.trim(),
      elapsedSeconds,
      completedAt: new Date().toISOString(),
    });
    navigation.navigate('TabbsNav', {screen: 'Studytasks'});
  };

  return (
    <View style={styles.root}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + 100,
          },
        ]}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({pressed}) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            hitSlop={8}>
            <Image
              source={require('../assets/images/back.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </Pressable>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{task.title.toUpperCase()}</Text>
            <Text style={styles.sphere}>{task.sphere}</Text>
          </View>
        </View>

        <View style={styles.timerCard}>
          <Text style={styles.cardLabel}>ELAPSED TIME</Text>
          <Text style={styles.timerValue}>
            {formatElapsedTime(elapsedSeconds)}
          </Text>
          <View style={styles.timerDots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.cardLabel}>TASK DESCRIPTION</Text>
          <Text style={styles.descriptionText}>{task.description}</Text>
        </View>

        <View style={styles.notesSection}>
          <Text style={styles.cardLabel}>NOTES</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Take notes while you study..."
            placeholderTextColor={battleColors.body}
            style={styles.notesInput}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {paddingBottom: insets.bottom + 16, paddingHorizontal: 20},
        ]}>
        <Pressable
          onPress={markComplete}
          disabled={completing}
          style={({pressed}) => [
            styles.completeWrap,
            (pressed || completing) && styles.completePressed,
          ]}>
          <LinearGradient
            colors={[battleColors.gold, battleColors.goldDark]}
            useAngle
            angle={171.87}
            style={styles.completeButton}>
            <Text style={styles.completeText}>✓ MARK COMPLETE</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: battleColors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 14,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 4,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.9,
  },
  backIcon: {
    width: 8,
    height: 14,
    tintColor: battleColors.gold,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
    paddingTop: 2,
  },
  title: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
    color: battleColors.gold,
  },
  sphere: {
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.subtitle,
  },
  timerCard: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  cardLabel: {
    fontFamily: battleFonts.regular,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    color: battleColors.body,
    alignSelf: 'flex-start',
  },
  timerValue: {
    fontFamily: battleFonts.bold,
    fontSize: 36,
    lineHeight: 42,
    color: battleColors.gold,
  },
  timerDots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: battleColors.border,
  },
  dotActive: {
    backgroundColor: battleColors.gold,
  },
  descriptionCard: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    gap: 10,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#F0E2C8',
  },
  notesSection: {
    gap: 8,
  },
  notesInput: {
    minHeight: 220,
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    lineHeight: 20,
    color: '#F0E2C8',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: battleColors.background,
    paddingTop: 12,
  },
  completeWrap: {
    width: '100%',
    shadowColor: battleColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  completePressed: {
    opacity: 0.92,
  },
  completeButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.buttonText,
  },
  missing: {
    flex: 1,
    backgroundColor: battleColors.background,
    padding: 24,
    gap: 12,
  },
  backLabel: {
    color: battleColors.gold,
    fontSize: 16,
  },
  missingText: {
    color: battleColors.subtitle,
    fontSize: 14,
  },
});

export default StudyTaskDetail;
