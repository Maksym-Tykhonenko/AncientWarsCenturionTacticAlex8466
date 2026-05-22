import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

import type {StudyTask} from '../data/studyTasks';
import {formatStudyTaskMeta} from '../utils/formatStudyTaskMeta';
import {battleColors, battleFonts} from '../theme/battleTheme';

type StudyTaskCardProps = {
  task: StudyTask;
  onPress: () => void;
};

const StudyTaskCard = ({task, onPress}: StudyTaskCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>📜</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {task.title.toUpperCase()}
        </Text>
        <Text style={styles.meta}>{formatStudyTaskMeta(task)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
      </View>
      <Image source={require('../assets/images/open.png')} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  cardPressed: {
    opacity: 0.92,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: battleColors.outcomeBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: battleFonts.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    color: battleColors.gold,
  },
  meta: {
    fontSize: 11,
    lineHeight: 16,
    color: battleColors.subtitle,
  },
  description: {
    fontSize: 11,
    lineHeight: 16,
    color: battleColors.body,
  },
  chevron: {
    fontSize: 22,
    lineHeight: 24,
    color: battleColors.gold,
    marginTop: -2,
  },
});

export default StudyTaskCard;
