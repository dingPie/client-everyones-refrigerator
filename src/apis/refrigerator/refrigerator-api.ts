import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiResponseType } from '../type';
import { CreateDto } from './types/dto/create-dto';
import { CreateModel } from './types/model/create-model';

export class RefrigeratorApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  create = async (req: CreateDto): Promise<ApiResponseType<CreateModel>> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/refrigerator/create`,
      data: req,
    });
    return data;
  };
}

const refrigeratorApi = new RefrigeratorApi();

export default refrigeratorApi;
