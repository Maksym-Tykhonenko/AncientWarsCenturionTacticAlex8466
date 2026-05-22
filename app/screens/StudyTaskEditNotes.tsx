import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {RootStackParamList} from '../types/navigation';
import {updateCompletedNotes} from '../utils/studyTasksStorage';
import {battleColors, battleFonts} from '../theme/battleTheme';

type EditNotesRoute = RouteProp<RootStackParamList, 'StudyTaskEditNotes'>;

const StudyTaskEditNotes = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<EditNotesRoute>();
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState(route.params.notes);
  const [saving, setSaving] = useState(false);

  const saveNotes = async () => {
    if (saving) {
      return;
    }
    setSaving(true);
    const trimmed = notes.trim();

    if (route.params.source === 'completed') {
      await updateCompletedNotes(route.params.taskId, trimmed);
      navigation.goBack();
      return;
    }

    navigation.navigate({
      name: 'StudyTaskDetail',
      params: {taskId: route.params.taskId, notes: trimmed},
      merge: true,
    });
  };

  return (
    <View
      style={[
        styles.root,
        {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16},
      ]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({pressed}) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          hitSlop={8}>
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.heading}>EDIT NOTES</Text>
        <View style={styles.headerSpacer} />
      </View>

      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Write your notes here..."
        placeholderTextColor={battleColors.body}
        style={styles.input}
        multiline
        textAlignVertical="top"
        autoFocus
      />

      <Pressable
        onPress={saveNotes}
        disabled={saving}
        style={({pressed}) => [
          styles.saveWrap,
          (pressed || saving) && styles.savePressed,
        ]}>
        <LinearGradient
          colors={[battleColors.gold, battleColors.goldDark]}
          useAngle
          angle={171.87}
          style={styles.saveButton}>
          <Text style={styles.saveText}>SAVE NOTES</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: battleColors.background,
    paddingHorizontal: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    opacity: 0.9,
  },
  backIcon: {
    width: 8,
    height: 14,
    tintColor: battleColors.gold,
  },
  heading: {
    fontFamily: battleFonts.bold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 2,
    color: battleColors.gold,
  },
  headerSpacer: {
    width: 36,
  },
  input: {
    flex: 1,
    backgroundColor: battleColors.cardBg,
    borderWidth: 1,
    borderColor: battleColors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    lineHeight: 22,
    color: battleColors.subtitle,
  },
  saveWrap: {
    shadowColor: battleColors.buttonShadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  savePressed: {
    opacity: 0.92,
  },
  saveButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 2,
    color: battleColors.buttonText,
  },
});

export default StudyTaskEditNotes;
