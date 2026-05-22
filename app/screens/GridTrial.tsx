import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
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

import Layyout from '../components/Layyout';
import type {RootStackParamList} from '../types/navigation';
import {
  getGridTrialBestLevel,
  getGridTrialBestScore,
} from '../utils/gridTrialStorage';
import {battleColors, battleFonts} from '../theme/battleTheme';

const HOW_TO_PLAY = [
  {
    icon: '👁',
    text: 'Memorize which cells contain ancient symbols — they flash briefly, then vanish.',
  },
  {
    icon: '🎯',
    text: 'Tap the correct cells to reveal where each symbol was hidden.',
  },
  {
    icon: '❤️',
    text: 'You have 3 lives. Wrong taps cost a life. Lose all 3 and the game ends.',
  },
  {
    icon: '⬆️',
    text: 'Each level adds more symbols, bigger grids, and less time to memorize.',
  },
];

const GridTrial = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [bestScore, setBestScore] = useState(0);
  const [bestLevel, setBestLevel] = useState(1);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const [score, level] = await Promise.all([
          getGridTrialBestScore(),
          getGridTrialBestLevel(),
        ]);
        setBestScore(score);
        setBestLevel(level);
      };
      load();
    }, []),
  );

  const startGame = () => {
    navigation.navigate('GridTrialGame');
  };

  return (
    <Layyout bounce={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24},
        ]}>
        <Text style={styles.heading}>Grid Trial</Text>
        <Text style={styles.subheading}>Train your battlefield awareness</Text>

        <Image
          source={require('../assets/images/gmscreen.png')}
          style={styles.hero}
        />

        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>HOW TO PLAY</Text>
          {HOW_TO_PLAY.map(item => (
            <View key={item.icon} style={styles.ruleRow}>
              <View style={styles.ruleIconWrap}>
                <Text style={styles.ruleIcon}>{item.icon}</Text>
              </View>
              <Text style={styles.ruleText}>{item.text}</Text>
            </View>
          ))}
        </View>

        {bestScore > 0 ? (
          <View style={styles.bestRow}>
            <Text style={styles.bestLabel}>
              Best: {bestScore} pts · Level {bestLevel}
            </Text>
          </View>
        ) : null}

        <Pressable
          onPress={startGame}
          style={({pressed}) => [
            styles.startWrap,
            pressed && styles.startPressed,
          ]}>
          <LinearGradient
            colors={[battleColors.gold, battleColors.goldDark]}
            useAngle
            angle={171.87}
            style={styles.startButton}>
            <Text style={styles.startText}>▶ START GAME</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </Layyout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  heading: {
    fontFamily: battleFonts.bold,
    fontSize: 22,
    lineHeight: 33,
    letterSpacing: 2,
    color: battleColors.gold,
    textTransform: 'uppercase',
  },
  subheading: {
    marginTop: -8,
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.body,
  },
  hero: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: battleColors.border,
  },
  rulesCard: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 16,
    gap: 14,
  },
  rulesTitle: {
    fontFamily: battleFonts.bold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 2,
    color: battleColors.gold,
    textAlign: 'center',
  },
  ruleRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  ruleIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: battleColors.outcomeBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleIcon: {
    fontSize: 14,
  },
  ruleText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.subtitle,
  },
  bestRow: {
    alignItems: 'center',
  },
  bestLabel: {
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.body,
  },
  startWrap: {
    marginTop: 4,
    shadowColor: battleColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  startPressed: {
    opacity: 0.92,
  },
  startButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.buttonText,
  },
});

export default GridTrial;
