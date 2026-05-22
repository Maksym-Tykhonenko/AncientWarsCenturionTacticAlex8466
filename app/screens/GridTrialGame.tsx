import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {getLevelConfig} from '../data/gridTrialLevels';
import type {RootStackParamList} from '../types/navigation';
import {
  buildLevelGrid,
  type GamePhase,
  type GridCell,
} from '../utils/gridTrialGame';
import {saveGridTrialProgress} from '../utils/gridTrialStorage';
import {battleColors, battleFonts} from '../theme/battleTheme';
import Layyout from '../components/Layyout';

const LIVES_MAX = 3;
const WRONG_FLASH_MS = 600;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const GRID_PADDING = 20;
const GRID_GAP = 10;

const GridTrialGame = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES_MAX);
  const [phase, setPhase] = useState<GamePhase>('memorize');
  const [memorizeLeft, setMemorizeLeft] = useState(3);
  const [cells, setCells] = useState<GridCell[]>(() =>
    buildLevelGrid(getLevelConfig(1)),
  );
  const [paused, setPaused] = useState(false);
  const scoreRef = useRef(0);

  const levelConfig = useMemo(() => getLevelConfig(level), [level]);
  const gridSize = levelConfig.gridSize;
  const tileSize =
    (SCREEN_WIDTH - GRID_PADDING * 2 - GRID_GAP * (gridSize - 1)) / gridSize;

  const targetsFound = cells.filter(cell => cell.isTarget && cell.found).length;
  const targetsTotal = levelConfig.targetCount;

  const initLevel = useCallback((nextLevel: number) => {
    const config = getLevelConfig(nextLevel);
    setCells(buildLevelGrid(config));
    setPhase('memorize');
    setMemorizeLeft(config.memorizeSeconds);
  }, []);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    initLevel(1);
  }, [initLevel]);

  const endGame = useCallback(
    async (finalScore: number, reachedLevel: number) => {
      const {bestScore, bestLevel} = await saveGridTrialProgress(
        finalScore,
        reachedLevel,
      );
      navigation.replace('GridTrialResults', {
        score: finalScore,
        bestScore,
        level: reachedLevel,
        bestLevel,
      });
    },
    [navigation],
  );

  const advanceLevel = useCallback(() => {
    const nextLevel = level + 1;
    setLevel(nextLevel);
    initLevel(nextLevel);
  }, [initLevel, level]);

  useEffect(() => {
    if (paused || phase !== 'memorize') {
      return undefined;
    }
    if (memorizeLeft <= 0) {
      setPhase('find');
      return undefined;
    }
    const timer = setTimeout(() => {
      setMemorizeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [memorizeLeft, paused, phase]);

  useEffect(() => {
    if (phase !== 'find' || targetsFound < targetsTotal) {
      return undefined;
    }
    const timer = setTimeout(() => advanceLevel(), 400);
    return () => clearTimeout(timer);
  }, [advanceLevel, phase, targetsFound, targetsTotal]);

  const wrongTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (wrongTimerRef.current) {
        clearTimeout(wrongTimerRef.current);
      }
    },
    [],
  );

  const handleWrongTap = useCallback(
    (index: number) => {
      setCells(prev =>
        prev.map(cell =>
          cell.index === index ? {...cell, wrongFlash: true} : cell,
        ),
      );
      if (wrongTimerRef.current) {
        clearTimeout(wrongTimerRef.current);
      }
      wrongTimerRef.current = setTimeout(() => {
        setCells(prev =>
          prev.map(cell =>
            cell.index === index ? {...cell, wrongFlash: false} : cell,
          ),
        );
      }, WRONG_FLASH_MS);

      setLives(prev => {
        const next = prev - 1;
        if (next <= 0) {
          endGame(scoreRef.current, level);
        }
        return next;
      });
    },
    [endGame, level],
  );

  const handleCellPress = (cell: GridCell) => {
    if (paused || phase !== 'find' || cell.found || cell.wrongFlash) {
      return;
    }
    if (cell.isTarget) {
      const config = getLevelConfig(level);
      setCells(prev =>
        prev.map(item =>
          item.index === cell.index ? {...item, found: true} : item,
        ),
      );
      setScore(prev => prev + config.pointsPerSymbol);
      return;
    }
    handleWrongTap(cell.index);
  };

  const quitGame = () => {
    navigation.goBack();
  };

  const showSymbol = (cell: GridCell) =>
    phase === 'memorize' ? cell.isTarget : cell.found;

  const instructionText =
    phase === 'memorize' ? `MEMORIZE! (${memorizeLeft}S)` : 'FIND THE SYMBOLS!';

  const instructionIcon = phase === 'memorize' ? '👁' : '🎯';

  return (
    <Layyout bounce={false}>
      <View
        style={[
          styles.content,
          {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16},
        ]}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => setPaused(true)}
            style={styles.pauseButton}
            hitSlop={8}>
            <Image source={require('../assets/images/pause.png')} />
          </Pressable>
          <Text style={styles.levelText}>LEVEL {level}</Text>
          <View style={styles.lives}>
            {Array.from({length: LIVES_MAX}, (_, index) => (
              <Text key={index} style={styles.heart}>
                {index < lives ? '❤️' : '🖤'}
              </Text>
            ))}
          </View>
          <Text style={styles.scoreText}>{score} PTS</Text>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            {instructionIcon} {instructionText}
          </Text>
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={[
              styles.grid,
              {
                width: tileSize * gridSize + GRID_GAP * (gridSize - 1),
              },
            ]}>
            {cells.map(cell => {
              const symbolVisible = showSymbol(cell);
              const isMemorizeTarget = phase === 'memorize' && cell.isTarget;
              const isCorrect = cell.found;
              const isWrong = cell.wrongFlash;

              return (
                <Pressable
                  key={cell.index}
                  disabled={phase !== 'find' || paused}
                  onPress={() => handleCellPress(cell)}
                  style={[
                    styles.tile,
                    {
                      width: tileSize,
                      height: tileSize,
                    },
                    isMemorizeTarget && styles.tileMemorize,
                    isCorrect && styles.tileCorrect,
                    isWrong && styles.tileWrong,
                  ]}>
                  {symbolVisible && cell.symbol ? (
                    <Text style={styles.symbol}>{cell.symbol}</Text>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {paused ? (
        <View style={styles.pauseOverlay}>
          <Text style={styles.pauseTitle}>PAUSED</Text>
          <Text style={styles.pauseSubtitle}>
            Level {level} · {score} pts
          </Text>

          <Pressable
            onPress={() => setPaused(false)}
            style={({pressed}) => [
              styles.resumeButton,
              pressed && styles.buttonPressed,
            ]}>
            <Text style={styles.resumeText}>RESUME GAME</Text>
          </Pressable>

          <Pressable
            onPress={quitGame}
            style={({pressed}) => [
              styles.quitButton,
              pressed && styles.buttonPressed,
            ]}>
            <Text style={styles.quitText}>QUIT GAME</Text>
          </Pressable>
        </View>
      ) : null}
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
    paddingHorizontal: GRID_PADDING,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  pauseButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontFamily: battleFonts.bold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1.5,
    color: battleColors.gold,
  },
  lives: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  heart: {
    fontSize: 14,
  },
  scoreText: {
    fontFamily: battleFonts.bold,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1,
    color: battleColors.gold,
    minWidth: 56,
    textAlign: 'right',
  },
  banner: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: '#C8912A',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  bannerText: {
    fontFamily: battleFonts.regular,
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: 1.5,
    color: battleColors.gold,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
    alignSelf: 'center',
  },
  tile: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileMemorize: {
    borderColor: battleColors.gold,
    borderWidth: 2,
    backgroundColor: battleColors.outcomeBg,
  },
  tileCorrect: {
    borderColor: '#4a9a4a',
    borderWidth: 2,
    backgroundColor: '#1a2e1a',
  },
  tileWrong: {
    borderColor: '#c75050',
    borderWidth: 2,
    backgroundColor: '#2a1515',
  },
  symbol: {
    fontSize: 28,
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3,8,7,0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
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
    marginBottom: 8,
  },
  resumeButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: battleColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeText: {
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
  quitText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: '#c75050',
  },
  buttonPressed: {
    opacity: 0.92,
  },
});

export default GridTrialGame;
