module.exports = {
  extends: './configs/eslint-next.js',
  ignorePatterns: ['src/stories/*'],
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'react/no-unknown-property': [
      2,
      {
        ignore: ['jsx', 'global'],
      },
    ],
  },
}
