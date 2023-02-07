module.exports = {
  extends: './configs/eslint-next.js',
  ignorePatterns: ['src/stories/*'],
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
