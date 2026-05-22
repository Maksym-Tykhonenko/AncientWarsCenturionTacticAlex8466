import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BattleCard from '../components/BattleCard';
import Layyout from '../components/Layyout';
import {BATTLES} from '../data/battles';
import type {Battle} from '../data/battles';
import type {RootStackParamList} from '../types/navigation';
import {battleColors, battleFonts} from '../theme/battleTheme';

const H_PADDING = 20;
const GRID_GAP = 12;

type Row = {key: string; left: Battle; right?: Battle};

const AncientBattls = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return BATTLES;
    }
    return BATTLES.filter(
      battle =>
        battle.title.toLowerCase().includes(q) ||
        battle.location.toLowerCase().includes(q) ||
        battle.year.toLowerCase().includes(q),
    );
  }, [query]);

  const rows = useMemo(() => {
    const result: Row[] = [];
    for (let i = 0; i < filtered.length; i += 2) {
      result.push({
        key: filtered[i].id,
        left: filtered[i],
        right: filtered[i + 1],
      });
    }
    return result;
  }, [filtered]);

  const openDetail = (battleId: string) => {
    navigation.navigate('BattlDetail', {battleId});
  };

  return (
    <Layyout bounce={false}>
      <View style={[styles.screen, {paddingTop: insets.top + 8}]}>
        <View style={styles.overlay} pointerEvents="none" />

        <View style={styles.header}>
          <Text style={styles.heading}>Ancient Battles</Text>
          <Text style={styles.subheading}>Read battle stories</Text>
          <View style={styles.searchWrap}>
            <Image
              source={require('../assets/images/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search battles, locations..."
              placeholderTextColor={battleColors.searchPlaceholder}
              style={styles.searchInput}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </View>
        </View>

        <FlatList
          data={rows}
          scrollEnabled={false}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.row}>
              <View style={styles.cardCell}>
                <BattleCard
                  battle={item.left}
                  onPress={() => openDetail(item.left.id)}
                />
              </View>
              {item.right ? (
                <View style={styles.cardCell}>
                  <BattleCard
                    battle={item.right}
                    onPress={() => openDetail(item.right!.id)}
                  />
                </View>
              ) : (
                <View style={styles.cardCell} />
              )}
            </View>
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
  searchWrap: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 43,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
  },
  searchIcon: {
    fontSize: 16,
    color: battleColors.body,
    opacity: 0.8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: battleColors.subtitle,
    padding: 0,
  },
  listContent: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 24,
    gap: GRID_GAP,
  },
  row: {
    flexDirection: 'row',
    gap: GRID_GAP,
  },
  cardCell: {
    flex: 1,
  },
});

export default AncientBattls;
