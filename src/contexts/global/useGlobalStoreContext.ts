import { createContextSelector } from '@/utils/react/create-context-selector';

import { useGlobalEffect } from './hooks/useGlobalEffect';
import { useGlobalHandler } from './hooks/useGlobalHandler';
import { useGlobalState } from './hooks/useGlobalState';

const useGlobalStore = () => {
  const { state, dispatch } = useGlobalState();
  const handler = useGlobalHandler({ state, dispatch });

  useGlobalEffect({ state, handler, dispatch });

  return { dispatch, state, handler };
};

export const {
  Provider: GlobalStoreProvider, //
  useContext: useGlobalContext,
} = createContextSelector(useGlobalStore);
