import React, { useCallback, useMemo, useState } from 'react';

import { Box, FlatList, Flex, Pressable, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useItemUpdateMutation } from '@/apis/item/item-api.mutation';
import { ItemInfoItemType } from '@/apis/item/types/model/list-by-space-model';
import {
  REFRIGERATOR_SPACE_API_QUERY_KEY,
  useGetRefrigeratorSpaceWithItemListQuery,
} from '@/apis/refrigerator-space/refrigerator-space-api.query';
import { RefrigeratorSpaceWithItemItemType } from '@/apis/refrigerator-space/types/model/list-with-item-model';
import { useGetRefrigeratorByIdQuery } from '@/apis/refrigerator/refrigerator-api.query';

import ConsumeItemModal from '@/components/#Molecules/ConsumeItemModal';
import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';
import { HomeStackParamList } from '@/navigations/type';

import RefrigeratorSpaceItem from './components/RefrigeratorSpaceItem';

type MainNavigationProps = NavigationProp<HomeStackParamList, 'Main'>;

const MainScreen = () => {
  const navigation = useNavigation<MainNavigationProps>();
  const queryClient = useQueryClient();
  const Toast = useCustomToast();

  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);

  const [selectedItem, setSelectedItem] = useState<ItemInfoItemType | null>(
    null,
  );
  const [consumeNum, setConsumeNum] = useState('1');

  const { data: refrigeratorData } = useGetRefrigeratorByIdQuery({
    variables: {
      id: refrigeratorId || -1,
    },
    options: {
      enabled: !!refrigeratorId,
      onSuccess: (data) => {
        console.log('$######## 냉장고 정보', data);
      },
      onError: (err: any) => {
        console.log(
          '$######## 냉장고 정보 불러오기 에러',
          err.response.data?.message,
        );

        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
    },
  });

  const { data: refrigeratorSpaceWithItemListData } =
    useGetRefrigeratorSpaceWithItemListQuery({
      variables: {
        refrigeratorId: refrigeratorId || -1,
      },
      options: {
        enabled: !!refrigeratorId,
        onError: (err: any) => {
          console.log(
            '냉장고 공간 및 아이템 불러오기 에러 에러',
            err.response.data?.message,
          );
          Toast.show({
            title: err.response.data?.message || '',
            status: 'error',
          });
        },
      },
    });

  const refrigeratorSpaceWithItemList = useMemo(
    () => refrigeratorSpaceWithItemListData?.result || [],
    [refrigeratorSpaceWithItemListData],
  );

  const { mutate: itemUpdateMutate } = useItemUpdateMutation({
    options: {
      onError: (err: any) => {
        console.log('아이템 소비 에러', err.response.data?.message);
        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
      onSuccess: (data) => {
        Toast.show({
          title: `${data.result.updatedQuantity} 개의 상품이 사용되었어요.`,
        });
        setSelectedItem(null);
        queryClient.invalidateQueries(
          REFRIGERATOR_SPACE_API_QUERY_KEY.GET_WITH_ITEM_LIST({
            refrigeratorId: refrigeratorId || -1,
          }),
        );
      },
    },
  });

  const isOpenConsumeItemModal = useMemo(() => !!selectedItem, [selectedItem]);
  const onCloseConsumeItemModal = useCallback(() => setSelectedItem(null), []);

  const onPressRefrigeratorSpace = useCallback(
    (refrigeratorSpaceWithItem: RefrigeratorSpaceWithItemItemType) => {
      navigation.navigate('Space', {
        id: refrigeratorSpaceWithItem.id,
        name: refrigeratorSpaceWithItem.name,
        maxCountPerSpace: refrigeratorSpaceWithItem.maxCountPerSpace,
        maxStoragePeriod: refrigeratorSpaceWithItem.maxStoragePeriod,
        purposeType: refrigeratorSpaceWithItem.purposeType,
        shapeType: refrigeratorSpaceWithItem.shapeType,
      });
    },
    [navigation],
  );

  const onPressSpaceInItem = useCallback((item: ItemInfoItemType) => {
    setConsumeNum('1');
    setSelectedItem(item);
    // P_TODO: API 붙여야 함.
  }, []);

  const onPressConsumeItemConfirmButton = useCallback(() => {
    if (!selectedItem) return;
    if (
      Number(consumeNum) > selectedItem.storageQuantity ||
      Number(consumeNum) < 1
    ) {
      Toast.show({
        title: '잘못된 숫자를 입력했어요.',
        status: 'error',
      });
      return;
    }
    itemUpdateMutate({
      itemInfoId: selectedItem.id,
      quantity: Number(consumeNum),
      status: 'used',
    });
  }, [Toast, consumeNum, itemUpdateMutate, selectedItem]);

  const onPressAddItemButton = useCallback(() => {
    navigation.navigate('AddItem', {});
  }, [navigation]);

  return (
    <>
      <FlatList
        data={refrigeratorSpaceWithItemList}
        renderItem={({ item }) => {
          return (
            <RefrigeratorSpaceItem
              refrigeratorSpaceWithItem={item}
              onPressRefrigeratorSpace={onPressRefrigeratorSpace}
              onPressSpaceInItem={onPressSpaceInItem}
            />
          );
        }}
        ListHeaderComponent={() => (
          <Flex
            p="12px"
            borderRadius="16px"
            bgColor="white"
            mb="16px"
            mx="2px"
            shadow={3}
          >
            <Text size="3xl.bold">{refrigeratorData?.result.name}</Text>
          </Flex>
        )}
        // bgColor="white"
        bgColor="gray.100"
        px="16px"
        py="24px"
      />
      <Pressable
        onPress={onPressAddItemButton}
        position="absolute"
        bottom="20px"
        right="20px"
        alignItems="center"
        justifyContent="center"
        boxSize="60px"
        bgColor="primary.500"
        rounded="full"
        _pressed={{
          bgColor: 'primary.600',
        }}
      >
        <Text size="4xl.bold" color="white">
          +
        </Text>
      </Pressable>

      <ConsumeItemModal
        isOpen={isOpenConsumeItemModal}
        onClose={onCloseConsumeItemModal}
        selectedItem={selectedItem}
        consumeNum={consumeNum}
        setConsumeNum={setConsumeNum}
        onPressConsumeItemConfirmButton={onPressConsumeItemConfirmButton}
      />
    </>
  );
};

export default MainScreen;
