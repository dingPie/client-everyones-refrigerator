import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiResponseType } from '../type';
import { AuthorityDto } from './types/dto/authority-dto';
import { GetMyInfoByRefrigeratorDto } from './types/dto/get-my-info-by-refrigerator-dto';
import { JoinDto } from './types/dto/join-dto';
import { PatchMyInfoByRefrigeratorDto } from './types/dto/pach-my-info-by-refrigerator-dto copy';
import { MyInfoByRefrigeratorModel } from './types/model/my-info-by-refrigerator-model';
import { MyRefrigeratorListModel } from './types/model/my-refrigerator-list-model';

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

  join = async (body: JoinDto): Promise<ApiResponseType<any>> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/refrigerator-user/join`,
      data: body,
    });
    return data;
  };

  authority = async (req: AuthorityDto): Promise<ApiResponseType<any>> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/refrigerator-user/join`,
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
}

const refrigeratorUserApi = new RefrigeratorUserApi();

export default refrigeratorUserApi;
