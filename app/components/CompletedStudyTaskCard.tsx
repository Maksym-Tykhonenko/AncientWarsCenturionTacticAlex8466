import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import type {StudyTask} from '../data/studyTasks';
import type {CompletedStudyTask} from '../utils/studyTasksStorage';
import {
  formatCompletedDate,
  formatElapsedTime,
} from '../utils/studyTasksStorage';
import {battleColors, battleFonts} from '../theme/battleTheme';

type CompletedStudyTaskCardProps = {
  task: StudyTask;
  record: CompletedStudyTask;
  onEditNotes: () => void;
  onDelete: () => void;
};

const CompletedStudyTaskCard = ({
  task,
  record,
  onEditNotes,
  onDelete,
}: CompletedStudyTaskCardProps) => {
  const meta = `${task.sphere} · ${formatElapsedTime(record.elapsedSeconds)} · ${formatCompletedDate(record.completedAt)}`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.checkWrap}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{task.title.toUpperCase()}</Text>
          <Text style={styles.meta}>{meta}</Text>
        </View>
      </View>

      {record.notes.trim().length > 0 ? (
        <View style={styles.notesBox}>
          <Text style={styles.notesLabel}>NOTES</Text>
          <Text style={styles.notesText}>{record.notes}</Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        <Pressable
          onPress={onEditNotes}
          style={({pressed}) => [
            styles.footerAction,
            pressed && styles.footerActionPressed,
          ]}>
          <Text style={styles.editText}>EDIT NOTES</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable
          onPress={onDelete}
          style={({pressed}) => [
            styles.footerAction,
            pressed && styles.footerActionPressed,
          ]}>
          <Text style={styles.deleteText}>DELETE</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
  },
  checkWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: battleColors.gold,
    backgroundColor: battleColors.outcomeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 16,
    color: battleColors.gold,
    fontWeight: '700',
  },
  headerText: {
    flex: 1,
    gap: 4,
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
  notesBox: {
    marginHorizontal: 14,
    marginBottom: 12,
    backgroundColor: battleColors.outcomeBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  notesLabel: {
    fontFamily: battleFonts.regular,
    fontSize: 9,
    lineHeight: 13,
    letterSpacing: 1.5,
    color: battleColors.body,
  },
  notesText: {
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.subtitle,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: battleColors.border,
  },
  footerAction: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerActionPressed: {
    opacity: 0.85,
  },
  divider: {
    width: 1,
    backgroundColor: battleColors.border,
  },
  editText: {
    fontFamily: battleFonts.bold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.5,
    color: battleColors.gold,
  },
  deleteText: {
    fontFamily: battleFonts.bold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.5,
    color: '#c75050',
  },
});

export default CompletedStudyTaskCard;
