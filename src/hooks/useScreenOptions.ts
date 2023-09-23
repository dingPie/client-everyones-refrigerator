import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

import { LAYOUT } from '@/constants/layout';

export type StackNavigationOptionFn<T extends ParamListBase> = (props: {
  route?: RouteProp<T, keyof T>;
  navigation?: any;
}) => StackNavigationOptions | undefined;

export type StackOptionsType<T extends ParamListBase> =
  | StackNavigationOptions
  | StackNavigationOptionFn<T>;

const useScreenOptions = <T extends ParamListBase>() => {
  const { top } = useSafeAreaInsets();

  const getScreenOptions: StackNavigationOptionFn<T> = () => {
    return {
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: {
        paddingLeft: 16,
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 27,
        fontFamily: 'pretendard',
      },
      headerStyle: {
        height: LAYOUT.HEADER.HEIGHT + top,
      },
      headerLeftContainerStyle: { paddingLeft: 0 },
      headerRightContainerStyle: { paddingRight: 16 },
    };
  };

  return { getScreenOptions };
};

export default useScreenOptions;
