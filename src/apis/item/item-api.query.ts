import { useQuery } from '@tanstack/react-query';

import { UseQueryParams } from '@/types/module/react-query/use-query-params';
import { isNotNull } from '@/utils/validate/is-not-null';

import itemApi from './item-api';

export const REFRIGERATOR_USER_API_QUERY_KEY = {
  GET_LIST_BY_SPACE: (params: Parameter<typeof itemApi.listBySpace>) =>
    ['item-list-by-space', params].filter(isNotNull),
  GET_LIST_BY_STATUS: (params: Parameter<typeof itemApi.listByStatus>) =>
    ['item-list-by-status', params].filter(isNotNull),
};

export function useGetItemListBySpaceQuery(
  params: UseQueryParams<typeof itemApi.listBySpace>,
) {
  const queryKey = REFRIGERATOR_USER_API_QUERY_KEY.GET_LIST_BY_SPACE(
    params.variables,
  );
  return useQuery(
    queryKey,
    () => itemApi.listBySpace(params.variables),
    params?.options,
  );
}

export function useGetItemListByStatusQuery(
  params: UseQueryParams<typeof itemApi.listByStatus>,
) {
  const queryKey = REFRIGERATOR_USER_API_QUERY_KEY.GET_LIST_BY_STATUS(
    params.variables,
  );
  return useQuery(
    queryKey,
    () => itemApi.listByStatus(params.variables),
    params?.options,
  );
}
