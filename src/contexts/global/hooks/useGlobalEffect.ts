import { useEffect } from 'react';

import { getToken } from '@/utils/async-storage/token';

import { useGlobalHandler } from './useGlobalHandler';
import { useGlobalState } from './useGlobalState';

const REFRESH_TOKEN_LIFE_TIME = 1000 * 60 * 60;
interface useGlobalEffectParams extends ReturnType<typeof useGlobalState> {
  handler: ReturnType<typeof useGlobalHandler>;
}

export const useGlobalEffect = ({ dispatch }: useGlobalEffectParams) => {
  // const { mutate } = useUserRefreshCreateMutation({
  //   options: {
  //     enabled: !!tokenStorage,
  //     onSuccess: (res) => {
  //       tokenStorage?.set(res);
  //     },
  //     onError: () => {
  //       tokenStorage?.remove();
  //     },
  //   },
  // });

  // For: sync isLogin by access token
  // useEffect(() => {
  //   const isLogin = !!webStorage.token?.access;
  //   dispatch({ type: 'SET_IS_LOGIN', payload: isLogin });
  // }, [dispatch, webStorage.token?.access]);

  // For: refresh before expired
  useEffect(() => {
    async function refresh() {
      const token = await getToken();
      if (!token?.refresh) return;

      // mutate({ data: { refresh } });
      const BEFORE_EXPIRED = REFRESH_TOKEN_LIFE_TIME - 1000 * 60 * 10;

      const refreshInterval = setInterval(() => {
        // mutate({ data: { refresh } });
      }, BEFORE_EXPIRED);

      return () => clearInterval(refreshInterval);
    }
    refresh();
  }, [dispatch]);
};
