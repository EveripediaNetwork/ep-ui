module.exports = {
  extends: './configs/eslint-next.js',
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
