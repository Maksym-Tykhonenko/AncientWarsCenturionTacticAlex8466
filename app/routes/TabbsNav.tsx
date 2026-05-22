import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AncientBattls from '../screens/AncientBattls.tsx';
import BattlMap from '../screens/BattlMap.tsx';
import Tactics from '../screens/Tactics.tsx';
import Studytasks from '../screens/Studytasks.tsx';
import GridTrial from '../screens/GridTrial.tsx';
import {battleFonts} from '../theme/battleTheme.ts';

const Tab = createBottomTabNavigator();

const tabActive = '#C8912A';
const tabIdle = '#9A7C54';

type TabItemProps = {
  label: string;
  focused: boolean;
  source: ImageSourcePropType;
};

const TabItem = ({label, focused, source}: TabItemProps) => {
  const tabColor = focused ? tabActive : tabIdle;
  return (
    <View style={[styles.tabItem]}>
      <View style={styles.tabIconImageWrap}>
        <Image
          source={source}
          style={styles.tabIconImg}
          resizeMode="contain"
          tintColor={tabColor}
        />
      </View>
      <Text style={[styles.tabLabel, {color: tabColor}]}>{label}</Text>
    </View>
  );
};

const TabIconExplore = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Battles"
    focused={focused}
    source={require('../assets/images/bottomtabs1.png')}
  />
);

const TabIconMap = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Map"
    focused={focused}
    source={require('../assets/images/bottomtabs2.png')}
  />
);

const TabIconTactics = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Tactics"
    focused={focused}
    source={require('../assets/images/bottomtabs3.png')}
  />
);

const TabIconStudytasks = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Tasks"
    focused={focused}
    source={require('../assets/images/bottomtabs4.png')}
  />
);

const TabIconGridTrial = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Game"
    focused={focused}
    source={require('../assets/images/bottomtabs5.png')}
  />
);

const TabBarBg = () => <View pointerEvents="none" style={styles.tabBarFill} />;

const TabbsNav = () => {
  const tabInsets = useSafeAreaInsets();
  const tabBarHeight = 54 + Math.max(tabInsets.bottom, 6);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tabActive,
        tabBarInactiveTintColor: tabIdle,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabBarHeight,
            paddingBottom: Math.max(tabInsets.bottom, 10),
          },
        ],
        tabBarBackground: TabBarBg,
      }}>
      <Tab.Screen
        name="AncientBattls"
        component={AncientBattls}
        options={{
          tabBarIcon: TabIconExplore,
        }}
      />
      <Tab.Screen
        name="BattlMap"
        component={BattlMap}
        options={{
          tabBarIcon: TabIconMap,
        }}
      />
      <Tab.Screen
        name="Tactics"
        component={Tactics}
        options={{
          tabBarIcon: TabIconTactics,
        }}
      />
      <Tab.Screen
        name="Studytasks"
        component={Studytasks}
        options={{
          tabBarIcon: TabIconStudytasks,
        }}
      />
      <Tab.Screen
        name="GridTrial"
        component={GridTrial}
        options={{
          tabBarIcon: TabIconGridTrial,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    paddingTop: 18,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: '#3C2C1C',
    borderTopColor: '#3C2C1C',
  },
  tabBarFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1C1510',
  },
  tabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    height: 28,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
    borderRadius: 14,
    paddingVertical: 4,
    minWidth: 72,
    minHeight: 53,
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 9,
    fontFamily: battleFonts.regular,
    textAlign: 'center',
  },
  tabDotRow: {
    marginTop: 4,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: tabActive,
  },
  tabDotGhost: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0,
  },
});

export default TabbsNav;
