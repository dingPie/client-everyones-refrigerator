import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiResponseType } from '../type';
import { ByIdDto } from './types/dto/by-id-dto';
import { CreateDto } from './types/dto/create-dto';
import { UpdateDto } from './types/dto/update-dto';
import { ByIdModel } from './types/model/by-id-model';
import { CreateModel } from './types/model/create-model';

export class RefrigeratorApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  byId = async (params: ByIdDto): Promise<ApiResponseType<ByIdModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/refrigerator/by-id`,
      params,
    });
    return data;
  };

  create = async (req: CreateDto): Promise<ApiResponseType<CreateModel>> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/refrigerator/create`,
      data: req,
    });
    return data;
  };

  update = async (req: UpdateDto): Promise<ApiResponseType<boolean>> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/refrigerator/update`,
      data: req,
    });
    return data;
  };
}

const refrigeratorApi = new RefrigeratorApi();

export default refrigeratorApi;
