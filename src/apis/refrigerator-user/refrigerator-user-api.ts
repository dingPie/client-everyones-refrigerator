import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiResponseType } from '../type';
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
}

const refrigeratorUserApi = new RefrigeratorUserApi();

export default refrigeratorUserApi;
