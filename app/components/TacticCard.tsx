import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import type {Tactic} from '../data/tactics';
import {battleColors, battleFonts} from '../theme/battleTheme';

type TacticCardProps = {
  tactic: Tactic;
  expanded: boolean;
  onToggle: () => void;
};

const TacticCard = ({tactic, expanded, onToggle}: TacticCardProps) => {
  return (
    <Pressable
      onPress={onToggle}
      style={({pressed}) => [
        styles.card,
        expanded && styles.cardExpanded,
        pressed && styles.cardPressed,
      ]}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.emoji}>{tactic.emoji}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{tactic.title}</Text>
          <Text style={styles.period}>{tactic.period}</Text>
        </View>
        <Image
          source={
            !expanded
              ? require('../assets/images/downarr.png')
              : require('../assets/images/uparr.png')
          }
          style={styles.chevron}
        />
      </View>

      {expanded ? (
        <View style={styles.body}>
          <Text style={styles.description}>{tactic.description}</Text>
          <Text style={styles.examplesLabel}>NOTABLE EXAMPLES</Text>
          {tactic.examples.map(example => (
            <View key={example} style={styles.exampleRow}>
              <View style={styles.bullet} />
              <Text style={styles.exampleText}>{example}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
    overflow: 'hidden',
  },
  cardExpanded: {
    borderColor: battleColors.gold,
  },
  cardPressed: {
    opacity: 0.94,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 70,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.outcomeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
    lineHeight: 28,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: battleFonts.bold,
    fontSize: 13,
    lineHeight: 19.5,
    color: battleColors.subtitle,
  },
  period: {
    fontSize: 11,
    lineHeight: 16.5,
    fontWeight: '500',
    letterSpacing: 0.06,
    color: battleColors.body,
  },
  chevron: {
    fontSize: 18,
    lineHeight: 27,
    color: battleColors.gold,
    width: 12,
    textAlign: 'center',
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 10,
  },
  description: {
    fontSize: 12,
    lineHeight: 19.2,
    color: battleColors.subtitle,
  },
  examplesLabel: {
    fontFamily: battleFonts.regular,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    color: battleColors.gold,
    marginTop: 4,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: battleColors.gold,
    marginTop: 7,
  },
  exampleText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16.5,
    color: battleColors.gold,
  },
});

export default TacticCard;
