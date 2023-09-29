import { useMutation } from '@tanstack/react-query';

import { UseMutationParams } from '@/types/module/react-query/use-mutation-params';
import { Parameter } from '@/types/utility/parameter';
import { isNotNull } from '@/utils/validate/is-not-null';

import itemApi from './item-api';

export const REFRIGERATOR_USER_API_MUTATION_KEY = {
  CREATE: (params?: Parameter<typeof itemApi.create>) =>
    ['item-create', params].filter(isNotNull),
  UPDATE: (params?: Parameter<typeof itemApi.update>) =>
    ['item-update', params].filter(isNotNull),
};

export const useItemCreateMutation = (
  params?: UseMutationParams<typeof itemApi.create>,
) => {
  return useMutation(itemApi.create, {
    ...params?.options,
  });
};

export const useItemUpdateMutation = (
  params?: UseMutationParams<typeof itemApi.update>,
) => {
  return useMutation(itemApi.update, {
    ...params?.options,
  });
};
