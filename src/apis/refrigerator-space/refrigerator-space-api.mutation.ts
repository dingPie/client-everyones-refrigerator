import { useMutation } from '@tanstack/react-query';

import { UseMutationParams } from '@/types/module/react-query/use-mutation-params';
import { Parameter } from '@/types/utility/parameter';
import { isNotNull } from '@/utils/validate/is-not-null';

import refrigeratorSpaceApi from './refrigerator-space-api';

export const REFRIGERATOR_SPACE_API_MUTATION_KEY = {
  CREATE_LIST: (params?: Parameter<typeof refrigeratorSpaceApi.createList>) =>
    ['create-list', params].filter(isNotNull),
};

export const useRefrigeratorSpaceCreateListMutation = (
  params?: UseMutationParams<typeof refrigeratorSpaceApi.createList>,
) => {
  return useMutation(refrigeratorSpaceApi.createList, {
    ...params?.options,
  });
};
