import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';

import { ApiInfiniteResponseType, ApiResponseType } from '../type';
import { CreateDto } from './types/dto/create-dto';
import { ListBySpaceWithPaginationDto } from './types/dto/list-by-space-dto';
import { ListByStatusWithPaginationDto } from './types/dto/list-by-status';
import { TotalCountBySpaceDto } from './types/dto/total-count-by-space-dto';
import { UpdateDto } from './types/dto/update-dto';
import { ListBySpaceModel } from './types/model/list-by-space-model';
import { ListByStatusDtoModel } from './types/model/list-by-status-model';
import { TotalCountBySpaceModel } from './types/model/total-count-by-space-model';
import { UpdateModel } from './types/model/update-model';

export class ItemApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  listBySpace = async (
    params: ListBySpaceWithPaginationDto,
  ): Promise<ApiInfiniteResponseType<ListBySpaceModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/item/list-by-space`,
      params,
    });
    return data;
  };

  listByStatus = async (
    params: ListByStatusWithPaginationDto,
  ): Promise<ApiInfiniteResponseType<ListByStatusDtoModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/item/list-by-status`,
      params,
    });
    return data;
  };

  totalCountBySpace = async (
    params: TotalCountBySpaceDto,
  ): Promise<ApiResponseType<TotalCountBySpaceModel>> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/item/total-count-by-space`,
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
