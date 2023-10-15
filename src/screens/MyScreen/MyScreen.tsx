import React, { useCallback, useState } from 'react';

import { Text, VStack } from 'native-base';

import { NavigationProp } from '@react-navigation/native';

import CustomTabView from '@/components/@Layout/CustomTabView';
import { SettingStackParamList } from '@/navigations/type';

import MemberTab from './components/MemberTab/MemberTab';
import MyInfoTab from './components/MyInfoTab';
import RefrigeratorTab from './components/RefrigeratorTab';

const routes = [
  {
    key: 'my',
    title: '내 정보',
  },
  {
    key: 'member',
    title: '참여 인원',
  },
  {
    key: 'refrigerator',
    title: '냉장고 설정',
  },
];

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const MyScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const renderScene = useCallback(({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'my':
        return <MyInfoTab />;
      case 'member':
        return <MemberTab />;
      case 'refrigerator':
        return <RefrigeratorTab />;
    }
  }, []);

  return (
    <>
      <CustomTabView
        routes={routes}
        tabIndex={tabIndex}
        renderScene={renderScene}
        setTabIndex={setTabIndex}
      />
    </>
  );
};

export default MyScreen;
