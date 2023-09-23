import React, { PropsWithChildren, useMemo } from 'react';

import { StatusBar, StyleProp, ViewStyle } from 'react-native';

import { View } from 'native-base';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types';
import { IColors } from 'native-base/lib/typescript/theme/base/colors';

export interface CommonLayoutProps extends IViewProps {
  bgColor?: IColors | string;
  withCustomHeader?: boolean;
  hasBottomTab?: boolean;
  toCenter?: boolean;
}

export function CommonLayout({
  children,
  bgColor = '#FFFFFF',
  withCustomHeader,
  hasBottomTab,
  toCenter,
  ...basisProps
}: PropsWithChildren<CommonLayoutProps>) {
  const edges: Edge[] = ['left', 'right'];
  const centerStyles: StyleProp<ViewStyle> = useMemo(
    () => ({
      justifyContent: 'center',
      alignItems: 'center',
    }),
    [],
  );

  if (withCustomHeader && !edges.includes('top')) {
    edges.push('top');
  }
  if (hasBottomTab && !edges.includes('bottom')) {
    edges.push('bottom');
  }

  return (
    <SafeAreaView
      edges={edges}
      style={{
        width: '100%',
        backgroundColor: bgColor,
        position: 'relative',
        flex: 1,
      }}
    >
      <StatusBar
        animated={false}
        barStyle={bgColor === '#FFFFFF' ? 'dark-content' : 'light-content'}
        backgroundColor={bgColor ? bgColor : 'transparent'}
      />

      <View
        px={'16px'}
        h={'100%'}
        style={toCenter ? centerStyles : {}}
        {...basisProps}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

export default CommonLayout;
