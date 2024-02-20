import { NxWebpackPlugin } from '@nx/webpack';
import { join } from 'path';

export default {
  output: {
    path: join(__dirname, '../../dist/apps/insurance-policy-manager'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
