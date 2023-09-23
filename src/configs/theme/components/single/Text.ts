import { theme as baseTheme } from 'native-base';

import sizes from '../../foundations/sizes';

export const Text = {
  baseStyle: {
    ...baseTheme.components.Text.baseStyle,
    color: 'black',
    _dark: { color: 'black' },
  },
  defaultProps: {
    fontFamily: 'pretendard',
    color: 'black',
    size: 'md',
  },
  sizes,
};
