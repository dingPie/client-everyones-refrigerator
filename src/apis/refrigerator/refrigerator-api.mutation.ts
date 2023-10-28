import { useMutation } from '@tanstack/react-query';

import { UseMutationParams } from '@/types/module/react-query/use-mutation-params';
import { Parameter } from '@/types/utility/parameter';
import { isNotNull } from '@/utils/validate/is-not-null';

import refrigeratorApi from './refrigerator-api';

export const AUTH_API_MUTATION_KEY = {
  CREATE: (params?: Parameter<typeof refrigeratorApi.create>) =>
    ['create', params].filter(isNotNull),
  UPDATE: (params?: Parameter<typeof refrigeratorApi.update>) =>
    ['update', params].filter(isNotNull),
};

export const useRefrigeratorCreateMutation = (
  params?: UseMutationParams<typeof refrigeratorApi.create>,
) => {
  return useMutation(refrigeratorApi.create, {
    ...params?.options,
  });
};

export const useRefrigeratorUpdateMutation = (
  params?: UseMutationParams<typeof refrigeratorApi.update>,
) => {
  return useMutation(refrigeratorApi.update, {
    ...params?.options,
  });
};
