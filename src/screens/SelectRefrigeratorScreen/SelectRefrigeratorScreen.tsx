import React from 'react';

import { Box, Button, Input, Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MainStackParamList } from '@/navigations/type';

type MainNavigationProp = StackNavigationProp<MainStackParamList>;

const SelectRefrigeratorScreen = () => {
  const navigation = useNavigation<MainNavigationProp>();

  return (
    <Box
      flex={1}
      h="100%"
      borderRadius="10px"
      borderColor="white"
      color="primary.400"
    >
      <Text size="xl">냉장고 선택 페이지</Text>

      <Button onPress={() => navigation.navigate('BottomTab')}>
        <Text>바텀탭으로 가기</Text>
      </Button>
    </Box>
  );
};

export default SelectRefrigeratorScreen;
