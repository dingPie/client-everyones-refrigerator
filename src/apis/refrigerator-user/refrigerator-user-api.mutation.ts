import { useMutation } from '@tanstack/react-query';

import { UseMutationParams } from '@/types/module/react-query/use-mutation-params';
import { Parameter } from '@/types/utility/parameter';
import { isNotNull } from '@/utils/validate/is-not-null';

import refrigeratorUserApi from './refrigerator-user-api';

export const REFRIGERATOR_USER_API_MUTATION_KEY = {
  JOIN: (params?: Parameter<typeof refrigeratorUserApi.join>) =>
    ['join', params].filter(isNotNull),
  PATCH_AUTHORITY: (params?: Parameter<typeof refrigeratorUserApi.authority>) =>
    ['authority', params].filter(isNotNull),
  PATCH_MY_INFO_BY_REFRIGERATOR: (
    params?: Parameter<typeof refrigeratorUserApi.authority>,
  ) => ['authority', params].filter(isNotNull),
};

export const useRefrigeratorUserJoinMutation = (
  params?: UseMutationParams<typeof refrigeratorUserApi.join>,
) => {
  return useMutation(refrigeratorUserApi.join, {
    ...params?.options,
  });
};

export const usePatchRefrigeratorUserAuthorityMutation = (
  params?: UseMutationParams<typeof refrigeratorUserApi.authority>,
) => {
  return useMutation(refrigeratorUserApi.authority, {
    ...params?.options,
  });
};

export const usePatchRefrigeratorUserMyInfoByRefrigeratorMutation = (
  params?: UseMutationParams<
    typeof refrigeratorUserApi.patchMyInfoByRefrigerator
  >,
) => {
  return useMutation(refrigeratorUserApi.patchMyInfoByRefrigerator, {
    ...params?.options,
  });
};
