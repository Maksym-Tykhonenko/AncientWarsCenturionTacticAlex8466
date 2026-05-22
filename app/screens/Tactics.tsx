import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TacticCard from '../components/TacticCard';
import Layyout from '../components/Layyout';
import {TACTICS} from '../data/tactics';
import type {RootStackParamList} from '../types/navigation';
import {battleColors, battleFonts} from '../theme/battleTheme';

const H_PADDING = 20;

const Tactics = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const startQuiz = () => {
    navigation.navigate('TacticsQuiz');
  };

  return (
    <Layyout bounce={false}>
      <View style={[styles.screen, {paddingTop: insets.top + 8}]}>
        <View style={styles.header}>
          <Text style={styles.heading}>Military Tactics</Text>
          <Text style={styles.subheading}>
            Ancient battlefield strategies of legendary commanders
          </Text>

          <Pressable
            onPress={startQuiz}
            style={({pressed}) => [
              styles.quizButtonWrap,
              pressed && styles.quizButtonPressed,
            ]}>
            <LinearGradient
              colors={[battleColors.gold, battleColors.goldDark]}
              useAngle
              angle={171.87}
              style={styles.quizButton}>
              <Image source={require('../assets/images/check.png')} />
              <Text style={styles.quizButtonText}>TAKE TACTICS QUIZ</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <FlatList
          data={TACTICS}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TacticCard
              tactic={item}
              expanded={expandedId === item.id}
              onToggle={() =>
                setExpandedId(current => (current === item.id ? null : item.id))
              }
            />
          )}
        />
      </View>
    </Layyout>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: battleColors.overlay,
  },
  header: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 12,
    zIndex: 1,
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
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.body,
  },
  quizButtonWrap: {
    marginTop: 16,
    shadowColor: battleColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  quizButtonPressed: {
    opacity: 0.92,
  },
  quizButton: {
    height: 50,
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  quizIconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: battleColors.buttonText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizIconMark: {
    fontSize: 10,
    lineHeight: 12,
    color: battleColors.buttonText,
    fontWeight: '700',
  },
  quizButtonText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.buttonText,
  },
  listContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 24,
    gap: 10,
  },
});

export default Tactics;
