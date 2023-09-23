import { NavigatorScreenParams } from '@react-navigation/native';

import { BottomTabParamList } from '@/navigations/tab/bottomtab/types/bottom-tab-param-list';

import { AuthStackParamList } from '../../auth/types/auth-stack-param-list';

/**
 *
 * @see https://reactnavigation.org/docs/typescript/
 *
 * params로 넘길 값이 없을 시 undefined 타입으로 설정해줍니다.
 * nested route의 경우에는 NavigatorScreenParams로 감싸줍니다.
 *
 */

export type RootStackParamList = {
  AuthStackNavigation: NavigatorScreenParams<AuthStackParamList>;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
};
