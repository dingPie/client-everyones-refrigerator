import { AxiosInstance } from 'axios';

import instance from '@/configs/axios/instance';
import { ENV } from '@/configs/env';
import { bytesToMB } from '@/utils/file/bytes-to-mb';
import { isOverSize } from '@/utils/file/is-over-size';
import { mbToBytes } from '@/utils/file/mb-to-bytes';

export type S3ImageFileType = {
  fileName: string;
  type: string;
  uri: string;
  size: number;
};

export class S3FileUploaderApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  private _createPresignedUrl = async (
    name: string,
  ): Promise<{ url: string }> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `${ENV.API_BASE_URL}/v1/presigned_url/`,
      data: { name },
    });
    return data;
  };

  private _uploadFileToS3 = async (params: {
    url: string;
    file: S3ImageFileType;
  }) => {
    const { url, file } = params;
    const { type } = file;

    await fetch(url, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': type },
    });

    const urlData = new URL(url);
    const { pathname } = urlData;

    return { file, url: pathname };
  };

  private _createOverSizeError = (file: S3ImageFileType, maxSize: number) => {
    return {
      name: file.fileName,
      size: file.size,
      maxSize: mbToBytes(maxSize),
      message: `${file.fileName}의 용량 ${bytesToMB(file.size).toFixed(
        1,
      )}(MB)는 최대용량 ${maxSize}(MB)를 초과했습니다.`,
    };
  };

  uploadFileToS3 = async (params: {
    file: S3ImageFileType;
    options?: {
      /** defalut: Infinity */
      maxSize?: number; // mb
    };
  }): Promise<{ url: string; file: S3ImageFileType }> => {
    const { file, options } = params;
    const { maxSize = Infinity } = options || {};
    if (isOverSize(file, { maxSize })) {
      throw this._createOverSizeError(file, maxSize);
    }

    const { url } = await this._createPresignedUrl(file.fileName);
    await this._uploadFileToS3({ url, file });
    const { origin, pathname } = new URL(url);

    return { file, url: origin + pathname };
  };

  /**
   *
   * @description web 에서는 Promise.allSettled가 작동하지만
   * app 환경(react-native) 에서는 작동하지 않습니다
   * ES2020 문법을 온전히 지원하지 않습니다.
   *
   */
  uploadFilesToS3 = async (params: {
    files: S3ImageFileType[];
    options?: {
      maxSize?: number; // mb
    };
  }) => {
    const { files, options } = params;
    const results = await Promise.all(
      files.map((file) => this.uploadFileToS3({ file, options })),
    );

    const settled = results.map((result) => {
      if (result instanceof Error) {
        return {
          status: 'rejected',
          reason: result,
        };
      } else {
        return {
          status: 'fulfilled',
          value: result,
        };
      }
    });

    return settled;
  };
}

const s3FileUploaderApi = new S3FileUploaderApi();

export default s3FileUploaderApi;
