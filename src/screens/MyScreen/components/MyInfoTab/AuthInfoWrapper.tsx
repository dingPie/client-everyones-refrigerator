import React, { memo } from 'react';

import { Button, HStack, Pressable, Text, VStack } from 'native-base';

import { MyInfoByRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-info-by-refrigerator-model';

import CustomIcon from '@/components/@common/CustomIcon';

interface AuthInfoWrapperProps {
  myInfoByRefrigeratorInfo?: MyInfoByRefrigeratorItemType;
  onPressLogoutButton: () => void;
}

const AuthInfoWrapper = ({
  myInfoByRefrigeratorInfo,
  onPressLogoutButton,
}: AuthInfoWrapperProps) => {
  return (
    <VStack space="12px">
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bgColor="white"
        px="8px"
        py="12px"
        borderRadius="8px"
      >
        <Text size="2xl.bold">연결된 계정</Text>
        <Pressable onPress={onPressLogoutButton}>
          <Text size="md" color="gray.800" px="12px">
            로그아웃
          </Text>
        </Pressable>
      </HStack>
      <VStack space="8px">
        <HStack
          space="24px"
          px="12px"
          py="10px"
          bgColor="white"
          rounded="full"
          shadow={5}
          m="4px"
        >
          <CustomIcon name="User" color="gray.800" size={48} />
          <VStack>
            <Text size="lg.bold" color="gray.800">
              {myInfoByRefrigeratorInfo?.userName}
            </Text>
            <Text size="md">{myInfoByRefrigeratorInfo?.user.userLoginId}</Text>
          </VStack>
        </HStack>
        <Text size="md" color="gray.800" px="16px">
          {myInfoByRefrigeratorInfo?.user.provider} 로 연결됨
        </Text>
      </VStack>
    </VStack>
  );
};

export default memo(AuthInfoWrapper);
