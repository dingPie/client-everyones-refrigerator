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
  MyPageTab: NavigatorScreenParams<MyPageStackParamList>;
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

export type MyPageStackParamList = {
  MySetting: undefined;
  MemberSetting: undefined;
  RefrigeratorSetting: undefined;
};
