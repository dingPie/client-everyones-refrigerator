module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'], //removing consoles.log from app during release (production) versions
    },
  },
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: true,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.ios.js',
          '.android.js',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@/apis': './src/apis',
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/constants': './src/constants',
          '@/contexts': './src/contexts',
          '@/configs': './src/configs',
          '@/features': './src/features',
          '@/navigations': './src/navigations',
          '@/screens': './src/screens',
          '@/theme': './src/configs/theme/*',
          '@/types/*': ['./types/*'],
          '@/utils': './src/utils',
          '@/hocs': './src/hocs',
          '@/hooks': './src/hooks',
          '@/generated': './src/generated',
          '@/image': './src/generated/images/images.ts',
        },
      },
    ],
  ],
};
