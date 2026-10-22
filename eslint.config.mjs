import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript.map(config => ({ ...config, files: ['**/*.ts', '**/*.tsx'] })),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: { '@typescript-eslint/consistent-type-imports': 'error' },
  },
  globalIgnores([
    '.next/**', '.next-*/**', 'out/**', 'build/**', 'next-env.d.ts',
    '.node_modules-cloud-backup/**', 'output/**', '.agents/**',
  ]),
]);
