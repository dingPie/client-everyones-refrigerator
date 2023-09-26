import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

// import { UseInfiniteQueryParams } from '@/types/module/react-query/use-infinite-query-params';
// import { UseQueryParams } from '@/types/module/react-query/use-query-params';
// import { Parameter } from '@/types/utility/parameter';
// import { isNotNull } from '@/utils/validate/is-not-null';

// import exampleApi from './auth-api';

// export const EXAMPLE_API_QUERY_KEY = {
//   GET_LIST: (params?: Parameter<typeof exampleApi.getList>) =>
//     ['example-list', params].filter(isNotNull),
// };

// export function useGetExampleListQuery(
//   params?: UseQueryParams<typeof exampleApi.getList>,
// ) {
//   const queryKey = EXAMPLE_API_QUERY_KEY.GET_LIST(params?.variables);
//   return useQuery(
//     queryKey,
//     () => exampleApi.getList(params?.variables),
//     params?.options,
//   );
// }
