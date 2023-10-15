import React, { useCallback, useMemo } from 'react';

import { Box, FlatList, Spinner, Text, Toast } from 'native-base';

import { useGetItemListByStatusInfiniteQuery } from '@/apis/item/item-api.query';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';

import UnStorageItemInfoItem from './UnStorageItemInfoItem';

const DiscardedItemListTab = () => {
  const Toast = useCustomToast();
  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);

  const {
    data: discardedItemListData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetItemListByStatusInfiniteQuery({
    variables: {
      refrigeratorId: refrigeratorId || -1,
      status: 'discarded',
    },
    options: {
      enabled: !!refrigeratorId,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.result.cursor) {
          return lastPage.result.cursor;
        }
      },
      onError: (err: any) => {
        console.log(
          '$######## 사용한 상품 불러오기 에러',
          err.response.data?.message,
        );
        Toast.show({
          title: err.response.data?.message || '',
          status: 'error',
        });
      },
    },
  });

  const discardedItemList = useMemo(
    () => discardedItemListData?.pages.flatMap((v) => v.result.data),
    [discardedItemListData?.pages],
  );

  const onEndReachedItem = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <FlatList
      data={discardedItemList}
      renderItem={({ item }) => {
        return <UnStorageItemInfoItem item={item} />;
      }}
      onEndReached={onEndReachedItem}
      onEndReachedThreshold={0.2}
      ListFooterComponent={<Box h="40px">{hasNextPage && <Spinner />}</Box>} // onEndReached를 작동시키기 위함
      bgColor="gray.100"
      px="16px"
      py="24px"
      // P_TODO: 목록 비었을 떄 추가.
      ListEmptyComponent={<Text>비었어용</Text>}
    />
  );
};

export default DiscardedItemListTab;
