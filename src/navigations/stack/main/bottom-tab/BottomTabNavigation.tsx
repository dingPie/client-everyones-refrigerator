import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomIcon from '@/components/@common/CustomIcon';
import { BottomTabParamList } from '@/navigations/type';

import HomeStackNavigation from './Home/HomeStackNavigation';
import SettingStackNavigation from './Setting/SettingStackNavigation';
import UnStorageStackNavigation from './UnStorage/UnStorageStackNavigation';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigation = () => {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: 'black',
          fontFamily: 'Pretendard',
        },
        headerStyle: {
          height: top + 58,
        },
        tabBarStyle: {
          height: 60 + bottom,
          paddingTop: 7,
        },
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#A076F9',
        tabBarInactiveTintColor: '#939393',
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="UnStorageTab"
        component={UnStorageStackNavigation}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <CustomIcon name="Used" color={color} size={30} />
          ),
          // tabBarLabel: ({ color, focused }) => (
          //   <Text size="sm" lineHeight="16px" color={color} pb="7px">
          //     사용한 상품
          //   </Text>
          // ),
        }}
      />
      <BottomTab.Screen
        name="HomeTab"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <CustomIcon name="Home" color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SettingTab"
        component={SettingStackNavigation}
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <CustomIcon name="Setting" color={color} size={30} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
