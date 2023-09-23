import { CompositeScreenProps } from '@/navigations/types/navigation-type';

export type MypageStackScreenProps<T extends keyof MypageStackParamList> =
  CompositeScreenProps<MypageStackParamList, T>;

export type MypageStackParamList = {
  Mypage: undefined;
};
