import { NavigatorScreenParams } from '@react-navigation/native';

import { HomeStackParamList } from '@/navigations/stack/home/types/home-stack-param-list';
import { MypageStackParamList } from '@/navigations/stack/mypage/types/mypage-stack-param.list';

export type BottomTabParamList = Partial<{
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  MypageTab: NavigatorScreenParams<MypageStackParamList>;
}>;
