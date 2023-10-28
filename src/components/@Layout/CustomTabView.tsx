import React, { ComponentType, memo, useCallback, useState } from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
  TabViewProps,
} from 'react-native-tab-view';

import { LAYOUT } from '@/constants/layout';

interface CustomTabViewProps {
  routes: { key: string; title: string }[];
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  renderScene: (
    props: SceneRendererProps & { route: { key: string; title: string } },
  ) => React.ReactNode;
  tabStyle?: StyleProp<ViewStyle>;
  tabProps?: Omit<
    TabViewProps<any>,
    'navigationState' | 'renderScene' | 'onIndexChange' | 'renderTabBar'
  >;
}

export type TabBarProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

const CustomTabView = ({
  routes,
  tabStyle,
  tabIndex,
  setTabIndex,
  tabProps,
  renderScene,
}: CustomTabViewProps) => {
  const renderTabBar = (props: TabBarProps) => {
    return (
      <TabBar
        activeColor="#6a92cc"
        indicatorStyle={{
          backgroundColor: '#6a92cc',
          height: 3,
        }}
        labelStyle={{
          color: '#939393',
          fontSize: 18,
          lineHeight: 20,
          fontWeight: '700',
          marginTop: 10,
        }}
        style={{
          backgroundColor: 'white',
          shadowOffset: { height: 0, width: 0 },
          shadowColor: 'transparent',
          height: 60,
        }}
        {...props}
      />
    );
  };

  return (
    <TabView
      navigationState={{
        index: tabIndex,
        routes: routes,
      }}
      renderScene={renderScene}
      onIndexChange={setTabIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: LAYOUT.WINDOW_WIDTH }}
      style={[tabStyle]}
      {...tabProps}
      lazy={true}
    />
  );
};

export default memo(CustomTabView);

export const CustomTabBar = (props: TabBarProps) => {
  return (
    <TabBar
      activeColor="#6a92cc"
      indicatorStyle={{
        backgroundColor: '#6a92cc',
        height: 3,
      }}
      labelStyle={{
        color: '#939393',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '700',
      }}
      style={{
        backgroundColor: 'white',
        shadowOffset: { height: 0, width: 0 },
        shadowColor: 'transparent',
      }}
      {...props}
    />
  );
};
