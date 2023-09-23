import React from 'react';

import { Box, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import { MyPageStackParamList } from '@/navigations/type';

type MySettingNavigationProps = NavigationProp<
  MyPageStackParamList,
  'MySetting'
>;

const MySettingScreen = () => {
  const navigation = useNavigation<MySettingNavigationProps>();

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

export default MySettingScreen;
