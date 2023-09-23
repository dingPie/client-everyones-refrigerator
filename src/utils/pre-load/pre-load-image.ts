import { Image, ImageSourcePropType } from 'react-native';

export const preLoadImage = (images: ImageSourcePropType[]) => {
  return Promise.all(
    images.map((image) => Image.prefetch(Image.resolveAssetSource(image).uri)),
  );
};
