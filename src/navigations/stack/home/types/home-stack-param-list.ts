import { CompositeScreenProps } from '@/navigations/types/navigation-type';

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<HomeStackParamList, T>;

export type HomeStackParamList = {
  Home: undefined;
  Count: undefined;
};
