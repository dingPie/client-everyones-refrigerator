import React, { useCallback, useState } from 'react';

import { Box, Flex, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import CustomTabView from '@/components/@Layout/CustomTabView';
import { UnStorageStackParamList } from '@/navigations/type';

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
        return (
          <Flex flex={1}>
            <Text> 사용한 상품탭 </Text>
          </Flex>
        );
      case 'discarded':
        return (
          <Flex flex={1}>
            <Text> 폐기된 상품탭 </Text>
          </Flex>
        );
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
