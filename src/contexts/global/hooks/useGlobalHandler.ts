import { useGlobalState } from './useGlobalState';

interface useGlobalHandlerParams extends ReturnType<typeof useGlobalState> {}

export const useGlobalHandler = ({
  dispatch,
  state,
}: useGlobalHandlerParams) => {
  const example = () => console.log({ dispatch, state });
  return { example };
};
