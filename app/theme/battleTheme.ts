import {onboardingColors, onboardingFonts} from './onboardingTheme';

export const battleColors = {
  ...onboardingColors,
  cardBg: '#1c1510',
  border: '#3c2c1c',
  accentBright: '#e8c060',
  labelMuted: '#5a4030',
  outcomeBg: '#261c10',
  searchPlaceholder: 'rgba(240,226,200,0.5)',
  yearBadge: 'rgba(0,0,0,0.53)',
};

export const battleFonts = onboardingFonts;

export type BattleCardTheme = 'blue' | 'green' | 'brown' | 'red';

export const battleCardGradients: Record<
  BattleCardTheme,
  {colors: [string, string]; angle: number}
> = {
  blue: {colors: ['#1a2340', '#0d3060'], angle: 160.24},
  green: {colors: ['#1a3020', '#0d4015'], angle: 160.24},
  brown: {colors: ['#3a2010', '#5a3008'], angle: 160.24},
  red: {colors: ['#3a1010', '#600808'], angle: 160.24},
};

export const battleDetailHeroGradients: Record<
  BattleCardTheme,
  {colors: [string, string]; angle: number}
> = {
  blue: {colors: ['#1a2340', '#0d3060'], angle: 168.4},
  green: {colors: ['#1a3020', '#0d4015'], angle: 168.4},
  brown: {colors: ['#3a2010', '#5a3008'], angle: 168.4},
  red: {colors: ['#3a1010', '#600808'], angle: 168.4},
};

export const battleCardThemes: BattleCardTheme[] = [
  'blue',
  'green',
  'brown',
  'red',
];
