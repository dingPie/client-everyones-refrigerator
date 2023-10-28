import { getColorSchema } from '@/utils/color-generator';

const Light = {
  // primary: getColorSchema('#0359AE'),
  primary: getColorSchema('#6a92cc'),
  secondary: getColorSchema('#6528F7'),
  warning: getColorSchema('#FF6060'),
  success: getColorSchema('#00CC99'),
  gray: {
    50: '#FAFAFA',
    100: '#F7F7F7',
    200: '#F2F3F4',
    300: '#E5E7EC',
    400: '#D1D4DD',
    500: '#B8BCC8',
    600: '#8C919F',
    700: '#757983',
    800: '#4A4D55',
    900: '#292A2E',
  },
  black: '#1A1A1A',
  white: '#FFFFFF',
  background: {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    tertiary: '#F0F0F0',
  },
  modal: '#FFFFFF',
};

const Dark = {};

const Brand = {
  kakao: {
    500: '#FFDE32',
    600: '#F5D322',
    700: '#EFCC1A',
  },
  naver: {
    500: '#20CF5D',
    600: '#17c554',
    700: '#14bf50',
  },
  facebook: {
    500: '#1877F3',
    600: '#1874eb',
    700: '#146cdf',
  },
  google: {
    500: '#FFFFFF',
    600: '#F5F5F5',
    700: '#EEEEEE',
  },
  apple: {
    500: '#000000',
    600: '#111111',
    700: '#222222',
  },
};

const Dim = {
  primary: '#1A1A1A80',
  secondary: '#1A1A1A33',
};

const mode = {
  light: Light,
  dark: Light,
};

const colors = {
  ...Light,
  ...Brand,
  dim: {
    ...Dim,
  },
};

export { mode, Brand, Light, Dark, Dim };

export default colors;
