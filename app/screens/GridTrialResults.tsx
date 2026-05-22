import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {RootStackParamList} from '../types/navigation';
import {battleColors, battleFonts} from '../theme/battleTheme';
import Layyout from '../components/Layyout';

type ResultsRoute = RouteProp<RootStackParamList, 'GridTrialResults'>;

const GridTrialResults = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ResultsRoute>();
  const insets = useSafeAreaInsets();

  const {score, bestScore, level, bestLevel} = route.params;

  const playAgain = () => {
    navigation.replace('GridTrialGame');
  };

  const backToIntro = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'TabbsNav', params: {screen: 'GridTrial'}}],
    });
  };

  return (
    <Layyout>
      <View
        style={[
          styles.content,
          {paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24},
        ]}>
        <Text style={styles.swords}>⚔️</Text>
        <Text style={styles.title}>BATTLE OVER</Text>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Final Score</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{bestScore}</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>

        {bestLevel > level ? (
          <Text style={styles.bestHint}>Best level reached: {bestLevel}</Text>
        ) : null}

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
            onPress={backToIntro}
            style={({pressed}) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}>
            <Text style={styles.secondaryText}>BACK TO INTRO</Text>
          </Pressable>
        </View>
      </View>
    </Layyout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: battleColors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: battleColors.overlay,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  swords: {
    fontSize: 40,
  },
  title: {
    fontFamily: battleFonts.bold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 2,
    color: battleColors.gold,
  },
  statsCard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: battleFonts.bold,
    fontSize: 22,
    lineHeight: 28,
    color: battleColors.gold,
  },
  statLabel: {
    fontSize: 10,
    lineHeight: 14,
    color: battleColors.body,
    textAlign: 'center',
  },
  bestHint: {
    fontSize: 11,
    color: battleColors.body,
    marginTop: -8,
  },
  actions: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
  primaryWrap: {
    width: '100%',
    alignSelf: 'stretch',
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
    alignSelf: 'stretch',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: battleColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: battleColors.cardBg,
  },
  secondaryText: {
    fontFamily: battleFonts.regular,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.gold,
  },
  buttonPressed: {
    opacity: 0.92,
  },
});

export default GridTrialResults;
