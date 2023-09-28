import React, { memo } from 'react';

import { Pressable, Text, VStack } from 'native-base';

import { MyRefrigeratorItemType } from '@/apis/refrigerator-user/types/model/my-refrigerator-list-model';

import CustomIcon from '@/components/@common/CustomIcon';

import { REFRIGERATOR_USER } from '@/constants/const';
import { LABEL } from '@/constants/label';
import { LAYOUT } from '@/constants/layout';

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
        width={LAYOUT.WINDOW_WIDTH * 0.85}
        height={LAYOUT.WINDOW_HEIGHT * 0.5}
        borderRadius={'16px'}
        bgColor="white"
        shadow={5}
      >
        <CustomIcon name="SolidRefrigerator" size={160} color="black" />
        <VStack space="4px" alignItems="center">
          <Text size="2xl.bold">{refrigeratorItem.refrigerator.name}</Text>
          <Text size="md">
            {LABEL.USER.AUTHORITY[refrigeratorItem.authority]}
          </Text>
        </VStack>
      </VStack>
    </Pressable>
  );
};

export default memo(MyRefrigeratorCard);
