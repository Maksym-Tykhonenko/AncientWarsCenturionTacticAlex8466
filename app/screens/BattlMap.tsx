import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, type Region} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Layyout from '../components/Layyout';
import {BATTLE_BY_ID, BATTLES} from '../data/battles';
import type {Battle} from '../data/battles';
import type {RootStackParamList, TabParamList} from '../types/navigation';
import {battleColors, battleFonts} from '../theme/battleTheme';
import Orientation from 'react-native-orientation-locker';

const H_PADDING = 20;
const MAP_MARGIN = 10;
const HINT_SLOT_HEIGHT = 57;

const INITIAL_REGION: Region = {
  latitude: 38,
  longitude: 22,
  latitudeDelta: 42,
  longitudeDelta: 52,
};

const FOCUS_DELTA = 9;

type BattlMapRoute = RouteProp<TabParamList, 'BattlMap'>;

type BattlMapNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'BattlMap'>,
  StackNavigationProp<RootStackParamList>
>;

const truncateText = (text: string, maxLength = 108) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength).trimEnd()}…`;
};

const BattlMap = () => {
  const navigation = useNavigation<BattlMapNavigation>();
  const route = useRoute<BattlMapRoute>();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedBattle: Battle | null = selectedId
    ? BATTLE_BY_ID[selectedId] ?? null
    : null;

  const focusBattle = useCallback((battle: Battle) => {
    mapRef.current?.animateToRegion(
      {
        latitude: battle.coordinates.lat,
        longitude: battle.coordinates.lng,
        latitudeDelta: FOCUS_DELTA,
        longitudeDelta: FOCUS_DELTA,
      },
      350,
    );
  }, []);

  useEffect(() => {
    const battleId = route.params?.battleId;
    if (!battleId) {
      return;
    }
    const battle = BATTLE_BY_ID[battleId];
    if (!battle) {
      return;
    }
    setSelectedId(battleId);
    focusBattle(battle);
  }, [route.params?.battleId, focusBattle]);

  const openDetails = useCallback(() => {
    if (!selectedBattle) {
      return;
    }
    navigation.navigate('BattlDetail', {battleId: selectedBattle.id});
  }, [navigation, selectedBattle]);

  const onMarkerPress = useCallback(
    (battle: Battle) => {
      setSelectedId(battle.id);
      focusBattle(battle);
    },
    [focusBattle],
  );

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        setSelectedId(null);
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  const mapProvider = useMemo(
    () => (Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined),
    [],
  );

  return (
    <Layyout bounce={false} scroll={false}>
      <View style={[styles.screen, {paddingTop: insets.top + 8}]}>
        <View style={styles.header}>
          <Text style={styles.heading}>Battle Map</Text>
          <Text style={styles.subheading}>
            Tap a location to explore the battle
          </Text>
        </View>

        <View style={styles.mapSection}>
          <View style={styles.mapFrame}>
            <MapView
              ref={mapRef}
              provider={mapProvider}
              style={styles.map}
              initialRegion={INITIAL_REGION}
              showsCompass={false}
              showsMyLocationButton={false}
              toolbarEnabled={false}>
              {BATTLES.map(battle => (
                <Marker
                  key={battle.id}
                  coordinate={{
                    latitude: battle.coordinates.lat,
                    longitude: battle.coordinates.lng,
                  }}
                  onPress={() => onMarkerPress(battle)}>
                  <Image
                    source={require('../assets/images/marker.png')}
                    style={[
                      styles.markerIcon,
                      battle.id === selectedId && styles.markerIconSelected,
                    ]}
                    resizeMode="contain"
                  />
                </Marker>
              ))}
            </MapView>

            {selectedBattle ? (
              <View style={styles.previewOverlay}>
                <View style={styles.previewCard}>
                  <View style={styles.previewContent}>
                    <Text style={styles.previewTitle} numberOfLines={2}>
                      {selectedBattle.title}
                    </Text>
                    <Text style={styles.previewMeta}>
                      {selectedBattle.year} · {selectedBattle.location}
                    </Text>
                    <Text style={styles.previewDescription} numberOfLines={3}>
                      {truncateText(selectedBattle.description)}
                    </Text>
                  </View>
                  <Pressable
                    onPress={openDetails}
                    style={({pressed}) => [
                      styles.detailsButton,
                      pressed && styles.detailsButtonPressed,
                    ]}>
                    <Text style={styles.detailsButtonText}>DETAILS</Text>
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.hintSlot}>
            {!selectedBattle ? (
              <View style={styles.hintCard}>
                <Image
                  source={require('../assets/images/marker.png')}
                  style={styles.hintMarkerIcon}
                  resizeMode="contain"
                />
                <Text style={styles.hintText}>
                  Tap any marker on the map to explore a battle
                </Text>
              </View>
            ) : null}
          </View>
        </View>
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
    paddingBottom: 8,
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
  mapSection: {
    flex: 1,
    paddingHorizontal: MAP_MARGIN,
    paddingBottom: 8,
    zIndex: 1,
  },
  mapFrame: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: battleColors.border,
    overflow: 'hidden',
    backgroundColor: battleColors.cardBg,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  previewOverlay: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    zIndex: 2,
  },
  hintSlot: {
    minHeight: HINT_SLOT_HEIGHT,
    flexShrink: 0,
    marginTop: 10,
  },
  markerIcon: {
    width: 24,
    height: 24,
  },
  markerIconSelected: {
    tintColor: battleColors.gold,
  },
  hintCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 57,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
  },
  hintMarkerIcon: {
    width: 18,
    height: 24,
  },
  hintText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.body,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: battleColors.border,
    backgroundColor: battleColors.cardBg,
  },
  previewContent: {
    flex: 1,
    gap: 4,
  },
  previewTitle: {
    fontFamily: battleFonts.bold,
    fontSize: 14,
    lineHeight: 21,
    color: battleColors.gold,
    textTransform: 'uppercase',
  },
  previewMeta: {
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: 0.06,
    color: battleColors.body,
  },
  previewDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: battleColors.subtitle,
  },
  detailsButton: {
    alignSelf: 'center',
    minWidth: 82,
    height: 33,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: battleColors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButtonPressed: {
    opacity: 0.9,
  },
  detailsButtonText: {
    fontFamily: battleFonts.bold,
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: 1,
    color: battleColors.buttonText,
  },
});

export default BattlMap;
