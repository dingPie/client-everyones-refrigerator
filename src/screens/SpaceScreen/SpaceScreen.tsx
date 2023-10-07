import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, FlatList, Spinner } from 'native-base';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { NavigationProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

import { useItemUpdateMutation } from '@/apis/item/item-api.mutation';
import {
  ITEM_API_QUERY_KEY,
  useGetItemListBySpaceInfiniteQuery,
  useGetItemTotalCountBySpaceQuery,
} from '@/apis/item/item-api.query';
import { ItemInfoItemType } from '@/apis/item/types/model/list-by-space-model';
import { RefrigeratorSpaceItemType } from '@/apis/refrigerator-space/types/model/list-model';

import ConsumeItemModal from '@/components/#Molecules/ConsumeItemModal';
import useCustomToast from '@/hooks/useCustomToast';
import { HomeStackParamList } from '@/navigations/type';

import HeaderInfoWrapper from './components/HeaderInfoWrapper';
import ItemInfoItem from './components/ItemInfoItem';

type SpaceNavigationProps = NavigationProp<HomeStackParamList, 'Space'>;
type T = RouteProp<HomeStackParamList, 'Space'>;

const SpaceScreen = () => {
  const navigation = useNavigation<SpaceNavigationProps>();
  const queryClient = useQueryClient();

  const route = useRoute<T>();
  const refrigeratorSpaceInfo = route.params as RefrigeratorSpaceItemType;

  const Toast = useCustomToast();

  const [isMine, setIsMine] = useState(false);

  const [selectedItem, setSelectedItem] = useState<ItemInfoItemType | null>(
    null,
  );
  const [consumeNum, setConsumeNum] = useState('1');

  const { data: itemTotalCountData } = useGetItemTotalCountBySpaceQuery({
    variables: { refrigeratorSpaceId: refrigeratorSpaceInfo.id },
    options: {
      enabled: !!refrigeratorSpaceInfo.id,
      onSuccess: (data) => {
        console.log('전체 갯수', data);
      },
      onError: (err: any) => {
        console.log('전체 갯수 불러오기 에러', err.response.data?.message);
        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
    },
  });

  const {
    data: itemListBySpaceData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetItemListBySpaceInfiniteQuery({
    variables: { refrigeratorSpaceId: refrigeratorSpaceInfo.id, isMine },
    options: {
      enabled: !!refrigeratorSpaceInfo.id,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.result.cursor) {
          return lastPage.result.cursor;
        }
      },
      onSuccess: (data) => {
        // console.log('무한 스크롤!!', data, data.pageParams, data.pages);
      },
      onError: (err: any) => {
        console.log('아이템ㅁ 목록 불러오기 에러', err.response.data?.message);
        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
    },
  });

  const itemList = useMemo(
    () => itemListBySpaceData?.pages.flatMap((v) => v.result.data),
    [itemListBySpaceData?.pages],
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
          ITEM_API_QUERY_KEY.GET_LIST_BY_SPACE({
            refrigeratorSpaceId: refrigeratorSpaceInfo.id,
          }),
        );
        queryClient.invalidateQueries(
          ITEM_API_QUERY_KEY.GET_TOTAL_COUNT_BY_SPACE({
            refrigeratorSpaceId: refrigeratorSpaceInfo.id,
          }),
        );
      },
    },
  });

  const isOpenConsumeItemModal = useMemo(() => !!selectedItem, [selectedItem]);
  const onCloseConsumeItemModal = useCallback(() => setSelectedItem(null), []);

  const onPressConsumeItem = useCallback((item: ItemInfoItemType) => {
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

  const onEndReachedItem = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      <FlatList
        data={itemList}
        renderItem={({ item }) => {
          return (
            <ItemInfoItem item={item} onPressConsumeItem={onPressConsumeItem} />
          );
        }}
        ListHeaderComponent={() => (
          <HeaderInfoWrapper
            refrigeratorSpaceInfo={refrigeratorSpaceInfo}
            isMine={isMine}
            setIsMine={setIsMine}
            totalCount={itemTotalCountData?.result.totalCount}
          />
        )}
        onEndReached={onEndReachedItem}
        onEndReachedThreshold={0.2}
        ListFooterComponent={<Box h="40px">{hasNextPage && <Spinner />}</Box>} // onEndReached를 작동시키기 위함
        bgColor="white"
        px="16px"
        py="24px"
      />

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

export default SpaceScreen;
