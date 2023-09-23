import { useQueryClient } from '@tanstack/react-query';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';

import { MockedFn } from '@/types/utility/mocked-fn';

jest.mock('@/utils/localStorage/token', () => ({
  getToken: jest.fn(),
  deleteToken: jest.fn(),
}));

jest.mock('@tanstack/react-query');

const __useGlobalContext = useGlobalContext as MockedFn<
  typeof useGlobalContext
>;
const __useQueryClient = useQueryClient as MockedFn<typeof useQueryClient>;

export {
  //
  __useGlobalContext,
  __useQueryClient,
};
