module.exports = {
  root: true,
  extends: ['@modern-js'],
  rules: {
    'node/file-extension-in-import': [
      'error',
      'always',
      {
        '.mjs': 'never',
      },
    ],
  },
};
