module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['import', '@typescript-eslint', 'unused-imports', 'prettier'],
  settings: {
    next: {
      rootDir: [
        'applications/frontend/',
        'packages/ui/',
        'packages/config/',
        'packages/tsconfig/',
      ],
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        project: ['tsconfig.json'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json'],
      },
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': ['error', './src'],
    'arrow-body-style': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-console': 'warn',
    "prettier/prettier": ["error"],
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      // 3) Now we enable eslint-plugin-testing-library rules or preset only for matching files!
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
    },
  ],
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', '.next', 'public'],
}
