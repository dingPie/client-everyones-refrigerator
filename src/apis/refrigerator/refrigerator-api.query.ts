import { useQuery } from '@tanstack/react-query';

import { UseQueryParams } from '@/types/module/react-query/use-query-params';
import { isNotNull } from '@/utils/validate/is-not-null';

import refrigeratorApi from './refrigerator-api';

export const REFRIGERATOR_API_QUERY_KEY = {
  GET_BY_ID: (params: Parameter<typeof refrigeratorApi.byId>) =>
    ['refrigerator-byId', params].filter(isNotNull),
};

export function useGetRefrigeratorByIdQuery(
  params: UseQueryParams<typeof refrigeratorApi.byId>,
) {
  const queryKey = REFRIGERATOR_API_QUERY_KEY.GET_BY_ID(params.variables);
  return useQuery(
    queryKey,
    () => refrigeratorApi.byId(params.variables),
    params?.options,
  );
}
