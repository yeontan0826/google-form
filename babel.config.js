module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          // prettier-ignore
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@stacks': './src/stacks',
            '@redux': './src/redux',
            '@styles': './src/styles',
            '@utils': './src/utils',
            '@assets': './assets',
            '@': './',
          },
        },
      ],
      'babel-plugin-styled-components',
      'react-native-reanimated/plugin',
    ],
  };
};
