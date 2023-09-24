import React from 'react';

import { Box, Button, Flex, Pressable, Text, VStack } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';

import CustomIcon from '@/components/@common/CustomIcon';
import { AuthStackParamList } from '@/navigations/type';

type LoginNavigationProps = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginNavigationProps>();

  return (
    <VStack
      flex={1}
      h="100%"
      px="24px"
      bgColor="secondary.400"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* <Flex p="30px"></Flex> */}
      <VStack space="40px" alignItems="center">
        {/* P_TODO: 아이콘, 폰트 나중에 바꾸기 */}
        <Text size="4xl.bold" mt="40%" color="white">
          모두의 냉장고
        </Text>
        <CustomIcon name="SolidRefrigerator" size={120} color="white" />
      </VStack>

      <VStack mb="20%" w="100%" space="8px">
        <Pressable
          flexDir="row"
          alignItems="center"
          bgColor="white"
          px="16px"
          py="12px"
          borderRadius="6px"
          shadow={4}
        >
          <CustomIcon name="GoogleLogo" size={18} />
          <Text size="md" fontWeight="500" color="gray.700" ml="32px">
            Google 로 시작하기
          </Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default LoginScreen;
