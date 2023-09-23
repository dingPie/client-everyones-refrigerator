import { S3ImageFileType } from '@/apis/s3-file-uploader/S3FileUploaderApi';

import { bytesToMB } from './bytes-to-mb';

export const isOverSize = (
  file: S3ImageFileType,
  options?: {
    /** default: 10 */
    maxSize?: number;
    /** default: mb */
    sizeType?: 'byte' | 'megaByte' | 'b' | 'mb';
  },
): boolean => {
  const { maxSize = 10, sizeType = 'mb' } = options || {};
  const isByte = sizeType === 'b' || sizeType === 'byte';
  const isMB = sizeType === 'mb' || sizeType === 'megaByte';

  if (isByte) return maxSize < file.size;
  if (isMB) return maxSize < bytesToMB(file.size);

  return false;
};
