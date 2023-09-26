import { useMutation } from '@tanstack/react-query';

import { UseMutationParams } from '@/types/module/react-query/use-mutation-params';
import { Parameter } from '@/types/utility/parameter';
import { isNotNull } from '@/utils/validate/is-not-null';

import authApi from './auth-api';

export const AUTH_API_MUTATION_KEY = {
  LOGIN: (params?: Parameter<typeof authApi.login>) =>
    ['login', params].filter(isNotNull),
  REFRESH: (params?: Parameter<typeof authApi.refresh>) =>
    ['refresh', params].filter(isNotNull),
};

export const useAuthLoginMutation = (
  params?: UseMutationParams<typeof authApi.login>,
) => {
  return useMutation(authApi.login, {
    ...params?.options,
  });
};

export const useAuthRefreshMutation = (
  params?: UseMutationParams<typeof authApi.refresh>,
) => {
  return useMutation(authApi.refresh, {
    ...params?.options,
  });
};
