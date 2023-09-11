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
            '@commons': './src/commons',
            '@screens': './src/screens',
            '@stacks': './src/stacks',
            '@redux': './src/redux',
            '@': './',
          },
        },
      ],
      'babel-plugin-styled-components',
    ],
  };
};
