import React from 'react';

import { Box, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import { HomeStackParamList } from '@/navigations/type';

type SpaceNavigationProps = NavigationProp<HomeStackParamList, 'Space'>;

const SpaceScreen = () => {
  const navigation = useNavigation<SpaceNavigationProps>();

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <Text> 냉장고별 공간 상세 페이지 </Text>
    </Box>
  );
};

export default SpaceScreen;
