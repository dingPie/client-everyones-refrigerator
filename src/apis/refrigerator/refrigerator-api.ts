import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { CreateDto } from './types/dto/create-dto';

export class RefrigeratorApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  create = async (req: CreateDto): Promise<string> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/refrigerator/create`,
      data: req,
    });
    return data;
  };
}

const authApi = new RefrigeratorApi();

export default authApi;
