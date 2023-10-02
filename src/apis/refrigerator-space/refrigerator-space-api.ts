import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiResponseType } from '../type';
import { CreateListDto } from './types/dto/create-list-dto';
import { ListDto } from './types/dto/list-dto';
import { CreateListModel } from './types/model/create-list-dto';
import { ListModel } from './types/model/list-model';

export class RefrigeratorSpaceApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  list = async (params: ListDto): Promise<ApiResponseType<ListModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/refrigerator-space/list`,
      params,
    });
    return data;
  };

  createList = async (
    body: CreateListDto,
  ): Promise<ApiResponseType<CreateListModel>> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/refrigerator-space/create-list`,
      data: body,
    });
    return data;
  };
}

const refrigeratorSpaceApi = new RefrigeratorSpaceApi();

export default refrigeratorSpaceApi;
