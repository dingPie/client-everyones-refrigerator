import { useQuery } from '@tanstack/react-query';

import { UseQueryParams } from '@/types/module/react-query/use-query-params';
import { isNotNull } from '@/utils/validate/is-not-null';

import refrigeratorSpaceApi from './refrigerator-space-api';

export const REFRIGERATOR_SPACE_API_QUERY_KEY = {
  GET_REFRIGERATOR_SPACE_LIST: (
    params: Parameter<typeof refrigeratorSpaceApi.list>,
  ) => ['refrigerator-space-list', params].filter(isNotNull),
  GET_REFRIGERATOR_SPACE_WITH_ITEM_LIST: (
    params: Parameter<typeof refrigeratorSpaceApi.list>,
  ) => ['refrigerator-space-with-item-list', params].filter(isNotNull),
};

export function useGetRefrigeratorSpaceListQuery(
  params: UseQueryParams<typeof refrigeratorSpaceApi.list>,
) {
  const queryKey = REFRIGERATOR_SPACE_API_QUERY_KEY.GET_REFRIGERATOR_SPACE_LIST(
    params.variables,
  );
  return useQuery(
    queryKey,
    () => refrigeratorSpaceApi.list(params.variables),
    params?.options,
  );
}

export function useGetRefrigeratorSpaceWithItemListQuery(
  params: UseQueryParams<typeof refrigeratorSpaceApi.listWithItem>,
) {
  const queryKey =
    REFRIGERATOR_SPACE_API_QUERY_KEY.GET_REFRIGERATOR_SPACE_WITH_ITEM_LIST(
      params.variables,
    );
  return useQuery(
    queryKey,
    () => refrigeratorSpaceApi.listWithItem(params.variables),
    params?.options,
  );
}
