import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

export const LAYOUT = {
  HEADER: {
    HEIGHT: 60,
  },
  BOTTOM_TAB: {
    HEIGHT: 70,
  },
  NAVIGATION_BAR: {
    HEIGHT: 60,
  },
  WINDOW_WIDTH: window.width,
  WINDOW_HEIGHT: window.height,
  WIDTH_RATIO: window.height / window.width,
  HEIGHT_RATIO: window.width / window.height,
  IS_ANDROID: Platform.OS === 'android',
  IS_IOS: Platform.OS === 'ios',
};
