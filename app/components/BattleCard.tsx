import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {Battle} from '../data/battles';
import {
  battleCardGradients,
  battleColors,
  battleFonts,
} from '../theme/battleTheme';

type BattleCardProps = {
  battle: Battle;
  onPress: () => void;
};

const BattleCard = ({battle, onPress}: BattleCardProps) => {
  const imageSource = battle.image as ImageSourcePropType | undefined;
  const gradient = battleCardGradients[battle.theme];

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.hero}>
        {imageSource ? (
          <Image source={imageSource} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <LinearGradient
            colors={gradient.colors}
            useAngle
            angle={gradient.angle}
            style={styles.heroFallback}>
            <Text style={styles.star}>★</Text>
          </LinearGradient>
        )}
        <View style={styles.yearBadge}>
          <Text style={styles.yearText}>{battle.year}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {battle.title}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {battle.location}
        </Text>
        <View style={styles.ctaRow}>
          <View style={styles.ctaDot} />
          <Text style={styles.cta}>VIEW DETAILS</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: battleColors.border,
    overflow: 'hidden',
    minHeight: 133,
  },
  cardPressed: {
    opacity: 0.92,
  },
  hero: {
    height: 60,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    fontSize: 48,
    lineHeight: 60,
    color: battleColors.accentBright,
    opacity: 0.35,
  },
  yearBadge: {
    position: 'absolute',
    right: 8,
    bottom: 6,
    backgroundColor: battleColors.yearBadge,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  yearText: {
    fontFamily: battleFonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: battleColors.accentBright,
  },
  body: {
    backgroundColor: battleColors.cardBg,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
    minHeight: 75,
  },
  title: {
    fontFamily: battleFonts.bold,
    fontSize: 11,
    lineHeight: 15,
    color: battleColors.subtitle,
    textTransform: 'uppercase',
  },
  location: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '500',
    color: battleColors.body,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  ctaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: battleColors.gold,
  },
  cta: {
    fontSize: 9,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 0.17,
    color: battleColors.gold,
  },
});

export default BattleCard;
