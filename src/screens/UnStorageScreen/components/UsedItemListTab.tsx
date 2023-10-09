import React, { useCallback, useMemo } from 'react';

import { Box, FlatList, Spinner, Toast } from 'native-base';

import { useGetItemListByStatusInfiniteQuery } from '@/apis/item/item-api.query';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';
import useCustomToast from '@/hooks/useCustomToast';

import UnStorageItemInfoItem from './UnStorageItemInfoItem';

const UsedItemListTab = () => {
  const Toast = useCustomToast();
  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);

  const {
    data: usedItemListData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetItemListByStatusInfiniteQuery({
    variables: {
      refrigeratorId: refrigeratorId || -1,
      status: 'used',
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

  const usedItemList = useMemo(
    () => usedItemListData?.pages.flatMap((v) => v.result.data),
    [usedItemListData?.pages],
  );

  const onEndReachedItem = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <FlatList
      data={usedItemList}
      renderItem={({ item }) => {
        return <UnStorageItemInfoItem item={item} />;
      }}
      onEndReached={onEndReachedItem}
      onEndReachedThreshold={0.2}
      ListFooterComponent={<Box h="40px">{hasNextPage && <Spinner />}</Box>} // onEndReached를 작동시키기 위함
      bgColor="white"
      px="16px"
      py="24px"
    />
  );
};

export default UsedItemListTab;
