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
        activeColor="#A076F9"
        indicatorStyle={{
          backgroundColor: '#A076F9',
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
    />
  );
};

export default memo(CustomTabView);

export const CustomTabBar = (props: TabBarProps) => {
  return (
    <TabBar
      activeColor="#A076F9"
      indicatorStyle={{
        backgroundColor: '#A076F9',
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
