import React, { memo } from 'react';

import { Pressable } from 'react-native';

import dayjs from 'dayjs';
import { Box, Text, VStack } from 'native-base';

import { ItemInfoItemType } from '@/apis/item/types/model/list-by-space-model';

import CustomFastImage from '@/components/#Atoms/CustomFastImage';

interface SpaceInItemItemProps {
  item: ItemInfoItemType;
  onPressSpaceInItem: (item: ItemInfoItemType) => void;
}

const SpaceInItemItem = ({
  item,
  onPressSpaceInItem,
}: SpaceInItemItemProps) => {
  return (
    <VStack space="6px" mr="16px">
      <Pressable onPress={() => onPressSpaceInItem(item)}>
        <Box
          borderRadius="8px"
          bgColor={
            dayjs().isBefore(item.expireDate) ? 'success.400' : 'warning.100'
          }
          size="60px"
          p="6px"
        >
          <CustomFastImage
            source={{
              uri: '',
            }}
            resizeMode="stretch"
            w="100%"
            h="100%"
          />
        </Box>
      </Pressable>
      <VStack
        w="auto"
        py="4px"
        px="8px"
        space="0px"
        bgColor="rgba(0, 0, 0, 0.8)"
        borderRadius="4px"
        maxW="150px"
      >
        <Text color="white" textAlign="left" noOfLines={1}>
          {item.name}
        </Text>
        <Text color="white">
          {dayjs(item.expireDate).format('YYYY-MM-DD 까지')}
        </Text>
        {item.ownerName && <Text color="white"> {item.ownerName} </Text>}
      </VStack>
    </VStack>
  );
};

export default memo(SpaceInItemItem);
