import colors from './colors';
import config from './config';
import fontConfig from './fontConfig';
import sizes from './sizes';
import typography from './typography';

const foundations = {
  sizes,
  colors,
  config,
  fontConfig,
  ...typography,
};

export default foundations;
