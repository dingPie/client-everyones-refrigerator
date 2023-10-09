import React, { useCallback, useMemo, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import CustomTabView from '@/components/@Layout/CustomTabView';
import { UnStorageStackParamList } from '@/navigations/type';

import DiscardedItemListTab from './components/DiscardedItemListTab';
import UsedItemListTab from './components/UsedItemListTab';

const routes = [
  {
    key: 'used',
    title: '소비한 상품',
  },
  {
    key: 'discarded',
    title: '폐기된 상품',
  },
];

type UnStorageNavigationProps = NavigationProp<
  UnStorageStackParamList,
  'UnStorage'
>;

const UnStorageScreen = () => {
  const navigation = useNavigation<UnStorageNavigationProps>();

  const [tabIndex, setTabIndex] = useState(0);

  const renderScene = useCallback(({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'used':
        return <UsedItemListTab />;
      case 'discarded':
        return <DiscardedItemListTab />;
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

export default UnStorageScreen;
