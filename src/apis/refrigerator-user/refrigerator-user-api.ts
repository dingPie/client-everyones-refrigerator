import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiResponseType } from '../type';
import { AuthorityDto } from './types/dto/authority-dto';
import { GetMyInfoByRefrigeratorDto } from './types/dto/get-my-info-by-refrigerator-dto';
import { GetUserListByRefrigeratorDto } from './types/dto/get-user-list-by-refrigerator-dto';
import { JoinDto } from './types/dto/join-dto';
import { PatchMyInfoByRefrigeratorDto } from './types/dto/pach-my-info-by-refrigerator-dto copy';
import { WithdrawalDto } from './types/dto/withdrawal-dto';
import { GetUserListByRefrigeratorModel } from './types/model/get-user-list-by-refrigerator-model';
import { MyInfoByRefrigeratorModel } from './types/model/my-info-by-refrigerator-model';
import { MyRefrigeratorListModel } from './types/model/my-refrigerator-list-model';
import { PatchAuthorityModel } from './types/model/patch-authority-model';

export class RefrigeratorUserApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  myRefrigeratorList = async (): Promise<
    ApiResponseType<MyRefrigeratorListModel>
  > => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/refrigerator-user/my-refrigerator-list`,
    });
    return data;
  };

  getMyInfoByRefrigerator = async (
    params: GetMyInfoByRefrigeratorDto,
  ): Promise<ApiResponseType<MyInfoByRefrigeratorModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/refrigerator-user/my-info-by-refrigerator`,
      params,
    });
    return data;
  };

  userListByRefrigerator = async (
    params: GetUserListByRefrigeratorDto,
  ): Promise<ApiResponseType<GetUserListByRefrigeratorModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/refrigerator-user/user-list-by-refrigerator`,
      params,
    });
    return data;
  };

  join = async (body: JoinDto): Promise<ApiResponseType<any>> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/refrigerator-user/join`,
      data: body,
    });
    return data;
  };

  authority = async (
    req: AuthorityDto,
  ): Promise<ApiResponseType<PatchAuthorityModel>> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/refrigerator-user/authority`,
      data: req,
    });
    return data;
  };

  patchMyInfoByRefrigerator = async (
    req: PatchMyInfoByRefrigeratorDto,
  ): Promise<ApiResponseType<any>> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/refrigerator-user/my-info-by-refrigerator`,
      data: req,
    });
    return data;
  };

  withdrawal = async (
    req: WithdrawalDto,
  ): Promise<ApiResponseType<boolean>> => {
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/refrigerator-user/withdrawal`,
      data: req,
    });
    return data;
  };
}

const refrigeratorUserApi = new RefrigeratorUserApi();

export default refrigeratorUserApi;
