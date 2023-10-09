import React, { memo } from 'react';

import dayjs from 'dayjs';
import { Box, Button, HStack, Text, VStack } from 'native-base';

import { ItemWithStatusItemType } from '@/apis/item/types/model/list-by-status-model';

import CustomFastImage from '@/components/#Atoms/CustomFastImage';

interface UnStorageItemInfoItemProps {
  item: ItemWithStatusItemType;
}

const UnStorageItemInfoItem = ({ item }: UnStorageItemInfoItemProps) => {
  return (
    <VStack
      space="6px"
      p="16px"
      mb="8px"
      bgColor="rgba(0, 0, 0, 0.8)"
      borderRadius="8px"
    >
      {/* 상단 아이콘, 버튼 */}
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <Box borderRadius="8px" bgColor="gray.300" size="60px" p="6px">
          <CustomFastImage
            source={{
              uri: item.itemInfo.imgUrl,
            }}
            resizeMode="stretch"
            w="100%"
            h="100%"
          />
        </Box>
      </HStack>

      {/* 하단 정보 */}
      <VStack w="100%">
        <HStack justifyContent="space-between" alignItems="center">
          <Text
            color="white"
            textAlign="left"
            noOfLines={2}
            maxW="300px"
            size="md.bold"
          >
            {item.itemInfo.name}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text
            color="white"
            textAlign="left"
            noOfLines={2}
            maxW="300px"
            size="md"
          >
            보관 시작일
          </Text>
          <Text color="white" textAlign="left">
            {dayjs(item.itemInfo.createdAt).format('YYYY-MM-DD hh:mm')}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text
            color="white"
            textAlign="left"
            noOfLines={2}
            maxW="300px"
            size="md"
          >
            소비 / 폐기일
          </Text>
          <Text color="white" textAlign="left">
            {dayjs(item.itemInfo.updatedAt).format('YYYY-MM-DD hh:mm')}
          </Text>
        </HStack>

        {item.itemInfo.memo && (
          <Text
            color="white"
            textAlign="left"
            noOfLines={2}
            maxW="300px"
            size="md"
          >
            {item.itemInfo.memo}
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default memo(UnStorageItemInfoItem);
