import { useQuery } from '@tanstack/react-query';

import { UseQueryParams } from '@/types/module/react-query/use-query-params';
import { isNotNull } from '@/utils/validate/is-not-null';

import refrigeratorUserApi from './refrigerator-user-api';

export const REFRIGERATOR_USER_API_QUERY_KEY = {
  GET_MY_REFRIGERATOR_LIST: () => ['my-refrigerator-list'].filter(isNotNull),
  GET_MY_INFO_BY_REFRIGERATOR: (
    params: Parameter<typeof refrigeratorUserApi.getMyInfoByRefrigerator>,
  ) => ['my-info-by-refrigerator', params].filter(isNotNull),
};

export function useGetMyRefrigeratorListQuery(
  params?: UseQueryParams<typeof refrigeratorUserApi.myRefrigeratorList>,
) {
  const queryKey = REFRIGERATOR_USER_API_QUERY_KEY.GET_MY_REFRIGERATOR_LIST();
  return useQuery(
    queryKey,
    () => refrigeratorUserApi.myRefrigeratorList(),
    params?.options,
  );
}

export function useGetMyInfoByRefrigeratorQuery(
  params: UseQueryParams<typeof refrigeratorUserApi.getMyInfoByRefrigerator>,
) {
  const queryKey = REFRIGERATOR_USER_API_QUERY_KEY.GET_MY_INFO_BY_REFRIGERATOR(
    params.variables,
  );
  return useQuery(
    queryKey,
    () => refrigeratorUserApi.getMyInfoByRefrigerator(params.variables),
    params?.options,
  );
}
