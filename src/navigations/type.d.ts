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
  Main: undefined;
  Space: RefrigeratorSpaceItemType; // P_MEMO: 일단 상세보기 API 없이 다 가져감.
  AddItem: { id?: number }; // P_TODO: 추후 이미 선택된 UI를 위해 다른 방법이 있을수도.
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
