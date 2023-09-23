import { useCallback, useMemo, useState } from 'react';

import { QueryKey } from '@tanstack/react-query';

import { isArrayWithNestedArrays } from '@/utils/validate/has-nested-array';
import { wait } from '@/utils/wait';

import useInvalidateQuires from './useInvalidateQuires';

const useRefreshing = () => {
  const invalidateQueries = useInvalidateQuires();
  const [isRefresh, setIsRefresh] = useState(false);

  const onRefresh = useCallback(
    async (queryKeys: QueryKey[] | QueryKey) => {
      if (!queryKeys) return;
      setIsRefresh(true);
      try {
        await wait(200);
        if (isArrayWithNestedArrays(queryKeys)) {
          invalidateQueries.multiple(queryKeys);
        } else {
          invalidateQueries.single(queryKeys);
        }
      } catch (err) {
        console.log('err', err);
      } finally {
        setIsRefresh(false);
      }
    },
    [invalidateQueries],
  );

  return useMemo(() => ({ onRefresh, isRefresh }), [onRefresh, isRefresh]);
};

export default useRefreshing;
