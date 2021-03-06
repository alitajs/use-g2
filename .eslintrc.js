module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'consistent-return': 0,
    'no-bitwise': 0,
    'no-unused-expressions': 0,
    'import/no-unresolved': [2, { ignore: ['react'] }],
  },
};
