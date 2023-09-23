import React from 'react';

import { Box, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import { UnStorageStackParamList } from '@/navigations/type';

type UnStorageNavigationProps = NavigationProp<
  UnStorageStackParamList,
  'UnStorage'
>;

const UnStorageScreen = () => {
  const navigation = useNavigation<UnStorageNavigationProps>();

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <Text size="xl"> 사용 / 폐기상품 페이지</Text>
    </Box>
  );
};

export default UnStorageScreen;
