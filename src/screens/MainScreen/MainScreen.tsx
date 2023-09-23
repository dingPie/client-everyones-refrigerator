import React from 'react';

import { Box, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import { HomeStackParamList } from '@/navigations/type';

type MainNavigationProps = NavigationProp<HomeStackParamList, 'Main'>;

const MainScreen = () => {
  const navigation = useNavigation<MainNavigationProps>();

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <Text size="xl">홈 메인 페이지</Text>
    </Box>
  );
};

export default MainScreen;
