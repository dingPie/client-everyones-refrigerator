import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';
import { TokenType } from '@/utils/async-storage/token';

import { LoginDto } from './types/dto/login-dto';
import { RefreshDto } from './types/dto/refresh-dto';
import { RefreshModel } from './types/model/refresh-model';

export class AuthApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  // getList = async (params?: GetExampleDto): Promise<ExampleModel[]> => {
  //   const { data } = await this.axios({
  //     method: 'GET',
  //     url: `/v1/example`,
  //     params,
  //   });
  //   return data;
  // };

  login = async (req: LoginDto): Promise<TokenType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/auth/login`,
      data: req,
    });
    return data;
  };

  refresh = async (req: RefreshDto): Promise<RefreshModel> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/auth/refresh`,
      data: req,
    });
    return data;
  };
}

const authApi = new AuthApi();

export default authApi;
