import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { UseQueryParams } from '@/types/module/react-query/use-query-params';
import { isNotNull } from '@/utils/validate/is-not-null';

import { InfiniteQueryHookParams } from '../type';
import itemApi from './item-api';

export const ITEM_API_QUERY_KEY = {
  GET_LIST_BY_SPACE: (params: Parameter<typeof itemApi.listBySpace>) =>
    ['item-list-by-space', params].filter(isNotNull),
  GET_LIST_BY_STATUS: (params: Parameter<typeof itemApi.listByStatus>) =>
    ['item-list-by-status', params].filter(isNotNull),
  GET_TOTAL_COUNT_BY_SPACE: (
    params: Parameter<typeof itemApi.totalCountBySpace>,
  ) => ['item-total-count-by-space', params].filter(isNotNull),
};

export function useGetItemListBySpaceInfiniteQuery(
  params: InfiniteQueryHookParams<typeof itemApi.listBySpace>,
) {
  const queryKey = ITEM_API_QUERY_KEY.GET_LIST_BY_SPACE(params.variables);

  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => {
      return itemApi.listBySpace({
        ...params.variables,
        cursor: pageParam,
      });
    },
    params?.options,
  );
  return { ...query, queryKey };
}

export function useGetItemListByStatusInfiniteQuery(
  params: InfiniteQueryHookParams<typeof itemApi.listByStatus>,
) {
  const queryKey = ITEM_API_QUERY_KEY.GET_LIST_BY_STATUS(params.variables);

  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => {
      return itemApi.listByStatus({
        ...params.variables,
        cursor: pageParam,
      });
    },
    params?.options,
  );
  return { ...query, queryKey };
}

export function useGetItemTotalCountBySpaceQuery(
  params: UseQueryParams<typeof itemApi.totalCountBySpace>,
) {
  const queryKey = ITEM_API_QUERY_KEY.GET_TOTAL_COUNT_BY_SPACE(
    params.variables,
  );
  return useQuery(
    queryKey,
    () => itemApi.totalCountBySpace(params.variables),
    params?.options,
  );
}
