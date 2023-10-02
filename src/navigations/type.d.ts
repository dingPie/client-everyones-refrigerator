export type RootStackParamList = {
  AuthStackNavigation: NavigatorScreenParams<AuthStackParamList>;
  MainStackNavigation: NavigatorScreenParams<MainStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainStackParamList = {
  Intro: undefined;
  BottomTab: undefined;
};

export type IntroStackParamList = {
  SelectRefrigerator: undefined;
  CreateRefrigerator: undefined;
};

export type BottomTabParamList = Partial<{
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SettingTab: NavigatorScreenParams<SettingStackParamList>;
  UnStorageTab: NavigatorScreenParams<UnStorageStackParamList>;
}>;

export type HomeStackParamList = {
  Main: undefined; // P_TODO: refrigerator_id
  Space: undefined;
  AddItem: undefined; // P_TODO: route 확인
};

export type UnStorageStackParamList = {
  UnStorage: undefined; // P_TODO: refrigerator_id
};

export type SettingStackParamList = {
  My: undefined;
  Member: undefined;
  Refrigerator: undefined;
};

export type CompositeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'BottomTab'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'HomeTab'>,
    StackNavigationProp<HomeStackParamList, 'Main'>
  >
>;
