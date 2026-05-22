import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  POINTS_PER_QUESTION,
  QUIZ_QUESTIONS,
  QUIZ_TOTAL,
} from '../data/tacticsQuizQuestions';
import type {RootStackParamList} from '../types/navigation';
import {saveBestQuizScore} from '../utils/tacticsQuizStorage';
import {battleColors, battleFonts} from '../theme/battleTheme';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const TacticsQuiz = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [paused, setPaused] = useState(false);

  const question = QUIZ_QUESTIONS[questionIndex];
  const answered = selectedOptionId !== null;
  const isCorrect = selectedOptionId === question.correctOptionId;

  const finishQuiz = useCallback(
    async (finalCorrect: number) => {
      const score = finalCorrect * POINTS_PER_QUESTION;
      const bestScore = await saveBestQuizScore(score);
      navigation.replace('TacticsQuizResults', {
        score,
        correctCount: finalCorrect,
        total: QUIZ_TOTAL,
        bestScore,
      });
    },
    [navigation],
  );

  const goNext = useCallback(() => {
    const nextCorrect = correctCount + (isCorrect ? 1 : 0);
    if (questionIndex >= QUIZ_TOTAL - 1) {
      finishQuiz(nextCorrect);
      return;
    }
    setCorrectCount(nextCorrect);
    setQuestionIndex(prev => prev + 1);
    setSelectedOptionId(null);
  }, [correctCount, finishQuiz, isCorrect, questionIndex]);

  const quitQuiz = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const progressSegments = useMemo(
    () =>
      Array.from({length: QUIZ_TOTAL}, (_, index) => (
        <View
          key={index}
          style={[
            styles.progressSegment,
            index <= questionIndex && styles.progressSegmentActive,
          ]}
        />
      )),
    [questionIndex],
  );

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24},
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => setPaused(true)}
            style={styles.pauseButton}
            hitSlop={8}>
            <Image source={require('../assets/images/pause.png')} />
          </Pressable>
          <Text style={styles.screenTitle}>TACTICS QUIZ</Text>
          <Text style={styles.counter}>
            {questionIndex + 1}/{QUIZ_TOTAL}
          </Text>
        </View>

        <View style={styles.progressRow}>{progressSegments}</View>

        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>QUESTION {questionIndex + 1}</Text>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        <View style={styles.options}>
          {question.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            const isAnswer = option.id === question.correctOptionId;
            let optionStyle = styles.optionDefault;
            let labelStyle = styles.optionLabelDefault;
            let textStyle = styles.optionTextDefault;

            if (answered) {
              if (isAnswer) {
                optionStyle = styles.optionCorrect;
                labelStyle = styles.optionLabelCorrect;
                textStyle = styles.optionTextCorrect;
              } else if (isSelected) {
                optionStyle = styles.optionWrong;
                labelStyle = styles.optionLabelWrong;
                textStyle = styles.optionTextWrong;
              }
            }

            return (
              <Pressable
                key={option.id}
                disabled={answered}
                onPress={() => setSelectedOptionId(option.id)}
                style={[styles.option, optionStyle]}>
                <View style={[styles.optionBadge, labelStyle]}>
                  <Text style={styles.optionBadgeText}>
                    {OPTION_LABELS[index]}
                  </Text>
                </View>
                <Text style={[styles.optionText, textStyle]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {answered ? (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationLabel}>EXPLANATION</Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        ) : null}

        {answered ? (
          <Pressable
            onPress={goNext}
            style={({pressed}) => [
              styles.nextButtonWrap,
              pressed && styles.nextButtonPressed,
            ]}>
            <LinearGradient
              colors={[battleColors.gold, battleColors.goldDark]}
              useAngle
              angle={171.87}
              style={styles.nextButton}>
              <Text style={styles.nextButtonText}>
                {questionIndex >= QUIZ_TOTAL - 1
                  ? 'SEE RESULTS'
                  : 'NEXT QUESTION'}
              </Text>
            </LinearGradient>
          </Pressable>
        ) : null}
      </ScrollView>

      {paused ? (
        <View style={styles.pauseOverlay}>
          <Text style={styles.pauseTitle}>PAUSED</Text>
          <Text style={styles.pauseSubtitle}>
            Question {questionIndex + 1} of {QUIZ_TOTAL}
          </Text>

          <Pressable
            onPress={() => setPaused(false)}
            style={({pressed}) => [
              styles.resumeButtonWrap,
              pressed && styles.resumeButtonPressed,
            ]}>
            <LinearGradient
              colors={[battleColors.gold, battleColors.goldDark]}
              useAngle
              angle={171.87}
              style={styles.resumeButton}>
              <Text style={styles.resumeButtonText}>RESUME QUIZ</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={quitQuiz}
            style={({pressed}) => [
              styles.quitButton,
              pressed && styles.quitButtonPressed,
            ]}>
            <Text style={styles.quitButtonText}>QUIT QUIZ</Text>
          </Pressable>
        </View>
      ) : null}
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
    gap: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pauseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseIcon: {
    fontSize: 16,
    lineHeight: 20,
    color: battleColors.gold,
    letterSpacing: -2,
  },
  screenTitle: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.gold,
  },
  counter: {
    fontFamily: battleFonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: battleColors.gold,
    minWidth: 36,
    textAlign: 'right',
  },
  progressRow: {
    flexDirection: 'row',
    gap: 4,
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: battleColors.border,
  },
  progressSegmentActive: {
    backgroundColor: battleColors.gold,
  },
  questionCard: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    gap: 10,
  },
  questionLabel: {
    fontFamily: battleFonts.regular,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    color: battleColors.gold,
  },
  questionText: {
    fontSize: 14,
    lineHeight: 22,
    color: battleColors.subtitle,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionDefault: {
    backgroundColor: battleColors.cardBg,
    borderColor: battleColors.border,
  },
  optionCorrect: {
    backgroundColor: '#1a2e1a',
    borderColor: '#2d5a2d',
  },
  optionWrong: {
    backgroundColor: '#2a1515',
    borderColor: '#5a2020',
  },
  optionBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabelDefault: {
    borderColor: battleColors.gold,
    backgroundColor: battleColors.outcomeBg,
  },
  optionLabelCorrect: {
    borderColor: '#4a9a4a',
    backgroundColor: '#1f3a1f',
  },
  optionLabelWrong: {
    borderColor: '#9a4a4a',
    backgroundColor: '#3a1f1f',
  },
  optionBadgeText: {
    fontFamily: battleFonts.bold,
    fontSize: 12,
    color: battleColors.gold,
  },
  optionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  optionTextDefault: {
    color: battleColors.subtitle,
  },
  optionTextCorrect: {
    color: '#7bc97b',
  },
  optionTextWrong: {
    color: '#c97b7b',
  },
  explanationCard: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    gap: 8,
  },
  explanationLabel: {
    fontFamily: battleFonts.regular,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    color: battleColors.gold,
  },
  explanationText: {
    fontSize: 12,
    lineHeight: 19.2,
    color: battleColors.subtitle,
  },
  nextButtonWrap: {
    marginTop: 4,
    shadowColor: battleColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonPressed: {
    opacity: 0.92,
  },
  nextButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.buttonText,
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3,8,7,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 20,
  },
  pauseTitle: {
    fontFamily: battleFonts.bold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 2,
    color: battleColors.gold,
  },
  pauseSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: battleColors.body,
    marginBottom: 12,
  },
  resumeButtonWrap: {
    width: '100%',
    shadowColor: battleColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  resumeButtonPressed: {
    opacity: 0.92,
  },
  resumeButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeButtonText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.buttonText,
  },
  quitButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#8b3030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quitButtonPressed: {
    opacity: 0.9,
  },
  quitButtonText: {
    fontFamily: battleFonts.bold,
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 2,
    color: '#c75050',
  },
});

export default TacticsQuiz;
