import React from 'react';

import { Box, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import { SettingStackParamList } from '@/navigations/type';

type MyNavigationProps = NavigationProp<SettingStackParamList, 'My'>;

const MyScreen = () => {
  const navigation = useNavigation<MyNavigationProps>();

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <Text size="xl">내 정보 설정 페이지</Text>
    </Box>
  );
};

export default MyScreen;
