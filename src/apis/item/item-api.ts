import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiResponseType } from '../type';
import { CreateDto } from './types/dto/create-dto';
import { ListBySpaceDto } from './types/dto/list-by-space-dto';
import { ListByStatusDto } from './types/dto/list-by-status';
import { UpdateDto } from './types/dto/update-dto';
import { ListBySpaceModel } from './types/model/list-by-space-model';
import { ListByStatusDtoModel } from './types/model/list-by-status-model';
import { UpdateModel } from './types/model/update-model';

export class ItemApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  listBySpace = async (
    params: ListBySpaceDto,
  ): Promise<ApiResponseType<ListBySpaceModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/item/list-by-space`,
      params,
    });
    return data;
  };

  listByStatus = async (
    params: ListByStatusDto,
  ): Promise<ApiResponseType<ListByStatusDtoModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/item/list-by-status`,
      params,
    });
    return data;
  };

  create = async (body: CreateDto): Promise<ApiResponseType<any>> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/item/create`,
      data: body,
    });
    return data;
  };

  update = async (req: UpdateDto): Promise<ApiResponseType<UpdateModel>> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/item/update`,
      data: req,
    });
    return data;
  };
}

const itemApi = new ItemApi();

export default itemApi;
