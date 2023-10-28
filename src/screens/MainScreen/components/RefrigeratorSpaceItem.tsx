import React, { memo } from 'react';

import { Pressable } from 'react-native';

import { FlatList, HStack, Text, VStack } from 'native-base';

import { ItemInfoItemType } from '@/apis/item/types/model/list-by-space-model';
import { RefrigeratorSpaceWithItemItemType } from '@/apis/refrigerator-space/types/model/list-with-item-model';

import RefrigeratorPurposeIcon from '@/components/#Atoms/RefrigeratorPurposeIcon';
import RefrigeratorShapeIcon from '@/components/#Atoms/RefrigeratorShapeIcon';

import SpaceInItemItem from './SpaceInItemItem';

interface RefrigeratorSpaceItemProps {
  refrigeratorSpaceWithItem: RefrigeratorSpaceWithItemItemType;
  onPressRefrigeratorSpace: (
    refrigeratorSpaceWithItem: RefrigeratorSpaceWithItemItemType,
  ) => void;
  onPressSpaceInItem: (item: ItemInfoItemType) => void;
}

const RefrigeratorSpaceItem = ({
  refrigeratorSpaceWithItem,
  onPressRefrigeratorSpace,
  onPressSpaceInItem,
}: RefrigeratorSpaceItemProps) => {
  return (
    <Pressable
      onPress={() => onPressRefrigeratorSpace(refrigeratorSpaceWithItem)}
    >
      <VStack
        space="8px"
        bgColor="white"
        borderRadius="8px"
        p="16px"
        mb="12px"
        mx="2px"
        shadow={2}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <Text size="xl.bold"> {refrigeratorSpaceWithItem.name} </Text>
          <HStack space="8px" alignItems="center">
            <RefrigeratorPurposeIcon
              purposeType={refrigeratorSpaceWithItem.purposeType}
              size={24}
              color="black"
            />
            <RefrigeratorShapeIcon
              shapeType={refrigeratorSpaceWithItem.shapeType}
              size={24}
              color="black"
            />
          </HStack>
        </HStack>

        {/* <HStack justifyContent="space-between">
          <Text size="md.bold">현재 보관된 상품</Text>
        </HStack> */}
        <HStack>
          <FlatList
            horizontal
            data={refrigeratorSpaceWithItem.itemInfoList}
            renderItem={({ item }) => {
              return (
                <SpaceInItemItem
                  item={item}
                  onPressSpaceInItem={onPressSpaceInItem}
                />
              );
            }}
          />
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default memo(RefrigeratorSpaceItem);
