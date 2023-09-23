/**
 *
 * @see https://reactnavigation.org/docs/typescript/
 *
 * params로 넘길 값이 없을 시 undefined 타입으로 설정해줍니다.
 * nested route의 경우에는 NavigatorScreenParams로 감싸줍니다.
 *
 */

/** Composite Screen type
 * eg)
 * 1. with hooks
 *   const navigation = useNavigation<HomeTabScreenProps<'Home'>['navigation']>();
 *   const route = useRoute<HomeTabScreenProps<'Home'>['route']>();
 * 2. with props
 *  const HomeScreen = ({ navigation, route }: HomeTabScreenProps<'Home'>) => {
 *  // ..
 *  }
 */
import { CompositeScreenProps } from '@/navigations/types/navigation-type';

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<AuthStackParamList, T>;

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Modal: undefined;
};
