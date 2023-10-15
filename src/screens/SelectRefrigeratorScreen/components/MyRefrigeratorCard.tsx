import React, { memo, useMemo } from 'react';

import { Flex, HStack, Pressable, Text, VStack } from 'native-base';

import { MyRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-refrigerator-list-model';

import AuthorityBadge from '@/components/#Atoms/AuthorityBadge';
import CustomFastImage from '@/components/#Atoms/CustomFastImage';

import { REFRIGERATOR_USER } from '@/constants/const';
import { LAYOUT } from '@/constants/layout';
import { MY_IMAGES } from '@/image';

interface MyRefrigeratorCardProps {
  refrigeratorItem: MyRefrigeratorItemType;
  onPressMyRefrigeratorCard: (refrigeratorItem: MyRefrigeratorItemType) => void;
}

const MyRefrigeratorCard = ({
  refrigeratorItem,
  onPressMyRefrigeratorCard,
}: MyRefrigeratorCardProps) => {
  return (
    <Pressable
      flex={1}
      alignSelf={'center'}
      justifyContent="center"
      isDisabled={
        refrigeratorItem.authority === REFRIGERATOR_USER.AUTHORITY.WAITING
      }
      onPress={() => onPressMyRefrigeratorCard(refrigeratorItem)}
      my="20px"
    >
      <VStack
        opacity={
          refrigeratorItem.authority === REFRIGERATOR_USER.AUTHORITY.WAITING
            ? 0.8
            : 1
        }
        key={refrigeratorItem.refrigerator.id}
        flex={1}
        alignItems="center"
        justifyContent="center"
        space="40px"
        width={LAYOUT.WINDOW_WIDTH * 0.75}
        height={LAYOUT.WINDOW_HEIGHT * 0.5}
        borderRadius={'16px'}
        bgColor="white"
        // bgColor="primary.400"
        shadow={5}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          py="8px"
          px="40px"
          borderRadius="16px"
          bgColor="primary.400"
        >
          <CustomFastImage
            source={MY_IMAGES.REFRIGERATOR_LOGO_IMAGE}
            w="120px"
            h="180px"
            resizeMode="contain"
          />
        </Flex>
        <VStack space="6px" alignItems="center">
          <Text size="2xl.bold">{refrigeratorItem.refrigerator.name}</Text>
          <HStack alignItems="center" space="8px">
            <AuthorityBadge authority={refrigeratorItem.authority} />
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
};

export default memo(MyRefrigeratorCard);
