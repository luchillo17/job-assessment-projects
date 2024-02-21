import { NxWebpackPlugin } from '@nx/webpack';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export default {
  output: {
    path: join(
      dirname(fileURLToPath(import.meta.url)),
      '../../dist/apps/insurance-policy-manager'
    ),
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
