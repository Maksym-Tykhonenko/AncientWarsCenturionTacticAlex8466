import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {POINTS_PER_QUESTION, QUIZ_TOTAL} from '../data/tacticsQuizQuestions';
import type {RootStackParamList} from '../types/navigation';
import {battleColors, battleFonts} from '../theme/battleTheme';

type ResultsRoute = RouteProp<RootStackParamList, 'TacticsQuizResults'>;

const getRankTitle = (percent: number) => {
  if (percent >= 90) {
    return 'IMPERATOR';
  }
  if (percent >= 70) {
    return 'GENERAL';
  }
  if (percent >= 50) {
    return 'LEGIONARY';
  }
  if (percent >= 30) {
    return 'HOPILITE';
  }
  return 'RECRUIT';
};

const TacticsQuizResults = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ResultsRoute>();
  const insets = useSafeAreaInsets();

  const {score, correctCount, total, bestScore} = route.params;
  const maxScore = total * POINTS_PER_QUESTION;
  const percent = Math.round((correctCount / total) * 100);
  const rank = useMemo(() => getRankTitle(percent), [percent]);

  const playAgain = () => {
    navigation.replace('TacticsQuiz');
  };

  const backToTactics = () => {
    navigation.navigate('TabbsNav', {screen: 'Tactics'});
  };

  return (
    <View style={[styles.root]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          width: '100%',
          paddingHorizontal: 20,
          paddingTop: insets.top + 24,
        }}>
        <Text style={styles.heading}>QUIZ RESULTS</Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={styles.scoreRing}>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreLabel}>points</Text>
          </View>

          <Text style={styles.rank}>{rank}</Text>
          <Text style={styles.meta}>
            {percent}% correct · {score}/{maxScore} pts
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>This Round</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{bestScore}</Text>
              <Text style={styles.statLabel}>Best Score</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={playAgain}
              style={({pressed}) => [
                styles.primaryWrap,
                pressed && styles.buttonPressed,
              ]}>
              <LinearGradient
                colors={[battleColors.gold, battleColors.goldDark]}
                useAngle
                angle={171.87}
                style={styles.primaryButton}>
                <Text style={styles.primaryText}>PLAY AGAIN</Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={backToTactics}
              style={({pressed}) => [
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}>
              <Text style={styles.secondaryText}>BACK TO TACTICS</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: battleColors.background,
  },
  heading: {
    fontFamily: battleFonts.bold,
    fontSize: 18,
    lineHeight: 33,
    letterSpacing: 2,
    color: battleColors.gold,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  scoreRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: battleColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  scoreValue: {
    fontFamily: battleFonts.bold,
    fontSize: 40,
    lineHeight: 44,
    color: battleColors.gold,
  },
  scoreLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: battleColors.body,
    marginTop: 2,
  },
  rank: {
    fontFamily: battleFonts.bold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 2,
    color: battleColors.gold,
    marginBottom: 6,
  },
  meta: {
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.body,
    marginBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: battleFonts.bold,
    fontSize: 24,
    lineHeight: 30,
    color: battleColors.gold,
  },
  statLabel: {
    fontSize: 11,
    lineHeight: 16,
    color: battleColors.body,
  },
  actions: {
    gap: 12,
    width: '100%',
  },
  primaryWrap: {
    width: '100%',
    shadowColor: battleColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.buttonText,
  },
  secondaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: battleColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1510',
  },
  secondaryText: {
    fontFamily: battleFonts.regular,
    fontSize: 13,
    lineHeight: 21,
    color: '#9A7C54',
  },
  buttonPressed: {
    opacity: 0.92,
  },
});

export default TacticsQuizResults;
