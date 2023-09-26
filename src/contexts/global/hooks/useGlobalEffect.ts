import { useEffect } from 'react';

import { getToken } from '@/utils/async-storage/token';

import { useGlobalHandler } from './useGlobalHandler';
import { useGlobalState } from './useGlobalState';

const REFRESH_TOKEN_LIFE_TIME = 1000 * 60 * 60;
interface useGlobalEffectParams extends ReturnType<typeof useGlobalState> {
  handler: ReturnType<typeof useGlobalHandler>;
}

// P_TODO: 이건 뭐하는 파일이지...

export const useGlobalEffect = ({ dispatch }: useGlobalEffectParams) => {
  useEffect(() => {
    async function refresh() {
      const token = await getToken();
      if (!token?.refreshToken) return;

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
