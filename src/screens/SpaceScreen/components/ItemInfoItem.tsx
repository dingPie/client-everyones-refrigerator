import React, { memo } from 'react';

import dayjs from 'dayjs';
import { Box, Button, HStack, Text, VStack } from 'native-base';

import { ItemInfoItemType } from '@/apis/item/types/model/list-by-space-model';

import CustomFastImage from '@/components/#Atoms/CustomFastImage';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';

interface ItemInfoItemProps {
  item: ItemInfoItemType;
  onPressConsumeItem: (item: ItemInfoItemType) => void;
}

const ItemInfoItem = ({ item, onPressConsumeItem }: ItemInfoItemProps) => {
  const { id } = useGlobalContext((ctx) => ctx.state);

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
        {Number(id) === Number(item.userId) && (
          <Button
            onPress={() => onPressConsumeItem(item)}
            bgColor="success.500"
            h="40px"
            py="0px"
            _pressed={{
              bgColor: 'success.600',
            }}
          >
            <Text size="lg.bold" color="white">
              사용하기
            </Text>
          </Button>
        )}
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
            {item.name}
          </Text>
          <Text color="white" textAlign="left">
            {item.storageQuantity}개
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
            {dayjs(item.createdAt).format('YYYY-MM-DD')}
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
            보관 만료일
          </Text>
          <Text color="white" textAlign="left">
            {dayjs(item.expireDate).format('YYYY-MM-DD')}
          </Text>
        </HStack>

        {item.ownerName && (
          <HStack justifyContent="space-between" alignItems="center">
            <Text
              color="white"
              textAlign="left"
              noOfLines={2}
              maxW="300px"
              size="md"
            >
              보관자
            </Text>
            <Text color="white" textAlign="left">
              {item.ownerName}
            </Text>
          </HStack>
        )}
        {item.memo && (
          <Text
            color="white"
            textAlign="left"
            noOfLines={2}
            maxW="300px"
            size="md"
          >
            {item.memo}
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default memo(ItemInfoItem);
