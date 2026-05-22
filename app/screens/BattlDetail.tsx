import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {BATTLE_BY_ID} from '../data/battles';
import type {RootStackParamList} from '../types/navigation';
import {
  battleColors,
  battleDetailHeroGradients,
  battleFonts,
} from '../theme/battleTheme';

type DetailRoute = RouteProp<RootStackParamList, 'BattlDetail'>;

const BattlDetail = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<DetailRoute>();
  const insets = useSafeAreaInsets();
  const battle = BATTLE_BY_ID[route.params.battleId];

  if (!battle) {
    return (
      <View style={styles.missing}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.backLabel}>‹ Back</Text>
        </Pressable>
        <Text style={styles.missingText}>Battle not found</Text>
      </View>
    );
  }

  const heroGradient = battleDetailHeroGradients[battle.theme];
  const imageSource = battle.image as ImageSourcePropType | undefined;

  const openOnMap = () => {
    navigation.navigate('TabbsNav', {
      screen: 'BattlMap',
      params: {
        battleId: battle.id,
        latitude: battle.coordinates.lat,
        longitude: battle.coordinates.lng,
      },
    });
  };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{paddingBottom: insets.bottom + 24}}>
        <View style={[styles.hero, {paddingTop: insets.top + 8}]}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.heroBg}
              resizeMode="cover"
            />
          ) : (
            <LinearGradient
              colors={heroGradient.colors}
              useAngle
              angle={heroGradient.angle}
              style={styles.heroBg}
            />
          )}

          <View style={styles.heroForeground}>
            <View style={styles.heroToolbar}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.iconButton}
                hitSlop={8}>
                <Image
                  source={require('../assets/images/back.png')}
                  style={styles.backChevron}
                />
              </Pressable>
              <Pressable style={styles.iconButton} hitSlop={8}>
                <Image source={require('../assets/images/shareicon.png')} />
              </Pressable>
            </View>

            {!imageSource && (
              <View style={styles.heroArt}>
                <Text style={styles.heroStar}>★</Text>
              </View>
            )}

            {imageSource ? <View style={styles.heroSpacer} /> : null}
          </View>

          <View style={styles.titleBar}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={2}>
                {battle.title}
              </Text>
              <Text style={styles.year}>{battle.year}</Text>
            </View>
            <Text style={styles.location}>{battle.location}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.description}>{battle.description}</Text>

          <InfoCard label="COMMANDERS">
            <SplitRow
              leftLabel="SIDE I"
              leftValue={battle.commanders.sideI}
              rightLabel="SIDE II"
              rightValue={battle.commanders.sideII}
            />
          </InfoCard>

          <InfoCard label="FORCES">
            <SplitRow
              leftLabel="SIDE I"
              leftValue={battle.forces.sideI}
              rightLabel="SIDE II"
              rightValue={battle.forces.sideII}
              tall
            />
          </InfoCard>

          <View style={styles.outcomeCard}>
            <Text style={styles.outcomeEmoji}>⚔</Text>
            <View style={styles.outcomeTextWrap}>
              <Text style={styles.cardLabel}>OUTCOME</Text>
              <Text style={styles.outcomeValue}>{battle.outcome}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>KEY FACTS</Text>
          {battle.keyFacts.map((fact, index) => (
            <View key={index} style={styles.factCard}>
              <View style={styles.factIndex}>
                <Text style={styles.factIndexText}>{index + 1}</Text>
              </View>
              <Text style={styles.factText}>{fact}</Text>
            </View>
          ))}

          <Pressable
            onPress={openOnMap}
            style={({pressed}) => [
              styles.mapButton,
              pressed && styles.mapButtonPressed,
            ]}>
            <Text style={styles.mapIcon}>◎</Text>
            <Text style={styles.mapLabel}>VIEW ON MAP</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

type InfoCardProps = {
  label: string;
  children: React.ReactNode;
};

const InfoCard = ({label, children}: InfoCardProps) => (
  <View style={styles.infoCard}>
    <Text style={styles.cardLabel}>{label}</Text>
    {children}
  </View>
);

type SplitRowProps = {
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  tall?: boolean;
};

const SplitRow = ({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  tall,
}: SplitRowProps) => (
  <View style={[styles.splitRow, tall && styles.splitRowTall]}>
    <View style={styles.splitCol}>
      <Text style={styles.sideLabel}>{leftLabel}</Text>
      <Text style={styles.sideValue}>{leftValue}</Text>
    </View>
    <View style={styles.splitDivider} />
    <View style={styles.splitCol}>
      <Text style={styles.sideLabel}>{rightLabel}</Text>
      <Text style={styles.sideValue}>{rightValue}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: battleColors.background,
  },
  missing: {
    flex: 1,
    backgroundColor: battleColors.background,
    padding: 24,
    justifyContent: 'center',
  },
  missingText: {
    marginTop: 16,
    color: battleColors.subtitle,
    fontSize: 16,
  },
  backLabel: {
    fontSize: 18,
    color: battleColors.gold,
  },
  hero: {
    minHeight: 220,
    overflow: 'hidden',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
  heroForeground: {
    flex: 1,
    zIndex: 1,
  },
  heroSpacer: {
    flex: 1,
    minHeight: 48,
  },
  heroToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: {
    fontSize: 22,
    lineHeight: 26,
    color: battleColors.gold,
    marginTop: -2,
  },
  shareIcon: {
    fontSize: 16,
    color: battleColors.gold,
  },
  heroArt: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStar: {
    fontSize: 72,
    color: 'rgba(255,255,255,0.2)',
  },
  titleBar: {
    backgroundColor: battleColors.cardBg,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    zIndex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    flex: 1,
    fontFamily: battleFonts.bold,
    fontSize: 18,
    lineHeight: 23.4,
    color: battleColors.subtitle,
    textTransform: 'uppercase',
  },
  year: {
    fontFamily: battleFonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    color: battleColors.gold,
  },
  location: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.body,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  description: {
    fontSize: 13,
    lineHeight: 22.75,
    letterSpacing: -0.08,
    color: battleColors.subtitle,
  },
  infoCard: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 12,
    gap: 8,
  },
  cardLabel: {
    fontFamily: battleFonts.regular,
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    color: battleColors.gold,
  },
  splitRow: {
    flexDirection: 'row',
    gap: 8,
  },
  splitRowTall: {
    minHeight: 52,
  },
  splitCol: {
    flex: 1,
    gap: 2,
  },
  splitDivider: {
    width: 1,
    backgroundColor: battleColors.border,
  },
  sideLabel: {
    fontSize: 9,
    lineHeight: 13.5,
    letterSpacing: 0.17,
    color: battleColors.labelMuted,
  },
  sideValue: {
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.subtitle,
  },
  outcomeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: battleColors.outcomeBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  outcomeEmoji: {
    fontSize: 16,
    lineHeight: 24,
  },
  outcomeTextWrap: {
    flex: 1,
    gap: 2,
  },
  outcomeValue: {
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.accentBright,
  },
  sectionTitle: {
    fontFamily: battleFonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: 1.5,
    color: battleColors.gold,
    marginTop: 4,
  },
  factCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  factIndex: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: battleColors.gold,
    backgroundColor: battleColors.outcomeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  factIndexText: {
    fontFamily: battleFonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: battleColors.gold,
  },
  factText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19.2,
    color: battleColors.subtitle,
  },
  mapButton: {
    marginTop: 8,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: battleColors.gold,
    backgroundColor: battleColors.outcomeBg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  mapButtonPressed: {
    opacity: 0.9,
  },
  mapIcon: {
    fontFamily: battleFonts.bold,
    fontSize: 13,
    color: battleColors.gold,
  },
  mapLabel: {
    fontFamily: battleFonts.bold,
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: 2,
    color: battleColors.gold,
  },
});

export default BattlDetail;
