import tsParser from '@typescript-eslint/parser'
import eslintPluginTs from '@typescript-eslint/eslint-plugin'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: false, semi: false }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    ignores: ['node_modules/**', 'dist/**'],
  },
]
