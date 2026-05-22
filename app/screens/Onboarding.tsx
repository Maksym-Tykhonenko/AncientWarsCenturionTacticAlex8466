import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layyout from '../components/Layyout';
import {onboardingColors, onboardingFonts} from '../theme/onboardingTheme';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HORIZONTAL_PADDING = 24;
const HERO_SIZE = Math.min(338, SCREEN_WIDTH - HORIZONTAL_PADDING * 2);

type OnboardingStep = {
  hero: number;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  showSkip: boolean;
};

const STEPS: OnboardingStep[] = [
  {
    hero: require('../assets/images/onboardinghero1.png'),
    title: 'Ancient Battles',
    subtitle: "Relive History's Greatest Conflicts",
    body: 'Explore detailed accounts of legendary battles from the ancient world. Study commanders, forces, tactics and outcomes that shaped civilization.',
    cta: 'Next',
    showSkip: true,
  },
  {
    hero: require('../assets/images/onboardinghero2.png'),
    title: 'Military Tactics',
    subtitle: 'Master the Art of Ancient Warfare',
    body: 'Discover the strategic formations and battlefield maneuvers used by the greatest commanders. From the Phalanx to double envelopment.',
    cta: 'Next',
    showSkip: true,
  },
  {
    hero: require('../assets/images/onboardinghero3.png'),
    title: 'Test Your Knowledge',
    subtitle: 'Quizzes, Tasks & Mind Challenges',
    body: 'Prove your mastery with tactical quizzes, history challenges, and an epic mind game.',
    cta: 'Begin the Journey',
    showSkip: false,
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  const current = STEPS[step];

  const finishOnboarding = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'TabbsNav' as never}],
    });
  }, [navigation]);

  const goNext = useCallback(() => {
    if (step >= STEPS.length - 1) {
      finishOnboarding();
      return;
    }
    setStep(prev => prev + 1);
  }, [step, finishOnboarding]);

  return (
    <Layyout bounce={false}>
      <View style={[styles.screen, {paddingTop: insets.top + 12}]}>
        <View style={styles.header}>
          <View style={styles.appIconWrap}>
            <Image
              source={require('../assets/images/appicon.png')}
              style={styles.appIcon}
              resizeMode="cover"
            />
          </View>
          {current.showSkip ? (
            <Pressable onPress={finishOnboarding} hitSlop={12}>
              <Text style={styles.skip}>Skip</Text>
            </Pressable>
          ) : (
            <View style={styles.skipPlaceholder} />
          )}
        </View>

        <View style={styles.content}>
          <Image
            source={current.hero}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.textBlock}>
            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.subtitle}>{current.subtitle}</Text>
            <Text style={styles.body}>{current.body}</Text>
          </View>
        </View>

        <View style={[styles.footer, {paddingBottom: insets.bottom + 24}]}>
          <View style={styles.pagination}>
            {STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === step ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>

          <Pressable
            onPress={goNext}
            style={({pressed}) => [
              styles.buttonWrap,
              pressed && styles.buttonPressed,
            ]}>
            <LinearGradient
              colors={[onboardingColors.gold, onboardingColors.goldDark]}
              useAngle
              angle={171.35}
              style={styles.button}>
              <Text style={styles.buttonText}>{current.cta}</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Layyout>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  screen: {
    flexGrow: 1,
    minHeight: '100%',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  appIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: onboardingColors.gold,
    overflow: 'hidden',
  },
  appIcon: {
    width: '100%',
    height: '100%',
  },
  skip: {
    fontFamily: onboardingFonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: 1,
    color: onboardingColors.body,
    textTransform: 'uppercase',
  },
  skipPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 32,
  },
  heroImage: {
    width: HERO_SIZE,
    height: HERO_SIZE,
    borderRadius: 16,
    marginTop: 20,
  },
  textBlock: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: onboardingFonts.bold,
    fontSize: 24,
    lineHeight: 36,
    letterSpacing: 1,
    color: onboardingColors.gold,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: onboardingFonts.regular,
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: 0.5,
    color: onboardingColors.subtitle,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    lineHeight: 23.8,
    letterSpacing: -0.15,
    color: onboardingColors.body,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    gap: 32,
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 60,
    height: 8,
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotInactive: {
    width: 8,
    backgroundColor: onboardingColors.dotInactive,
  },
  dotActive: {
    flex: 1,
    backgroundColor: onboardingColors.gold,
  },
  buttonWrap: {
    shadowColor: onboardingColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  button: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: onboardingFonts.bold,
    fontSize: 15,
    lineHeight: 22.5,
    letterSpacing: 2,
    color: onboardingColors.buttonText,
    textTransform: 'uppercase',
  },
});

export default Onboarding;
