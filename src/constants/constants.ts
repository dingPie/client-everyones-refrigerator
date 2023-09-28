import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

export default {
  wWidth: window.width,
  wHeight: window.height,
  wGapUnit: window.width / 10,
  hGapUnit: window.height / 10,
  wRatio: window.height / window.width,
  hRatio: window.width / window.height,
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  bottomTabHeight: 70,
  navigationBarHeight: 60,
};
