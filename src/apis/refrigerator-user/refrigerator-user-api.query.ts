import { useQuery } from '@tanstack/react-query';

import { UseQueryParams } from '@/types/module/react-query/use-query-params';
import { isNotNull } from '@/utils/validate/is-not-null';

import refrigeratorUserApi from './refrigerator-user-api';

export const EXAMPLE_API_QUERY_KEY = {
  GET_MY_REFRIGERATOR_LIST: () => ['example-list'].filter(isNotNull),
};

export function useGetMyRefrigeratorListQuery(
  params?: UseQueryParams<typeof refrigeratorUserApi.myRefrigeratorList>,
) {
  const queryKey = EXAMPLE_API_QUERY_KEY.GET_MY_REFRIGERATOR_LIST();
  return useQuery(
    queryKey,
    () => refrigeratorUserApi.myRefrigeratorList(),
    params?.options,
  );
}
