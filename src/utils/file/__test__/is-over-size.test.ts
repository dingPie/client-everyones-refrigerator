import { S3ImageFileType } from '@/apis/s3-file-uploader/S3FileUploaderApi';

import { isOverSize } from '../is-over-size';

describe('isOverSize', () => {
  const file: S3ImageFileType = {
    fileName: 'example.jpg',
    type: 'image/jpeg',
    uri: 'https://example.com/example.jpg',
    size: 15000000, // 15MB
  };

  it('should return true when file size exceeds the max size in bytes', () => {
    const result = isOverSize(file, { maxSize: 10000000, sizeType: 'byte' });

    expect(result).toBe(true);
  });

  it('should return true when file size exceeds the max size in megabytes', () => {
    const result = isOverSize(file, { maxSize: 10, sizeType: 'mb' });

    expect(result).toBe(true);
  });

  it('should return false when file size is within the max size', () => {
    const result = isOverSize(file, { maxSize: 20, sizeType: 'mb' });

    expect(result).toBe(false);
  });

  it('should return false when options are not provided', () => {
    const result = isOverSize(file);

    expect(result).toBe(true);
  });
});
