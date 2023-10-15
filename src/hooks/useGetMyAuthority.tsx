import { useQueryClient } from '@tanstack/react-query';

import { REFRIGERATOR_USER_API_QUERY_KEY } from '@/apis/refrigerator-user/refrigerator-user-api.query';
import { MyInfoByRefrigeratorModel } from '@/apis/refrigerator-user/types/model/my-info-by-refrigerator-model';
import { ApiResponseType } from '@/apis/type';

import { useGlobalContext } from '@/contexts/global/useGlobalStoreContext';

const useGetMyAuthority = () => {
  const { refrigeratorId } = useGlobalContext((ctx) => ctx.state);
  const queryClient = useQueryClient();
  const queryKey = REFRIGERATOR_USER_API_QUERY_KEY.GET_MY_INFO_BY_REFRIGERATOR({
    refrigeratorId: refrigeratorId || -1,
  });

  const myInfoByRefrigeratorData = queryClient.getQueryData(
    queryKey,
  ) as ApiResponseType<MyInfoByRefrigeratorModel>;

  const authority = myInfoByRefrigeratorData.result.authority;

  return {
    isAdmin: authority === 'admin',
    isManager: authority === 'admin' || authority === 'manager',
    isNormal: authority !== 'normal',
  };
};

export default useGetMyAuthority;
