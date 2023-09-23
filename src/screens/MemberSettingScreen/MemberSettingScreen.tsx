import React from 'react';

import { Box, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';

import { MyPageStackParamList } from '@/navigations/type';

type MemberSettingNavigationProps = NavigationProp<
  MyPageStackParamList,
  'MemberSetting'
>;

const MemberSettingScreen = () => {
  const navigation = useNavigation<MemberSettingNavigationProps>();

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <Text size="xl">냉장고 멤버 설정 페이지</Text>
    </Box>
  );
};

export default MemberSettingScreen;
