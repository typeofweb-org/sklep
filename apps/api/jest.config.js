module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
  setupFiles: ['./jest-setup.ts'],
  setupFilesAfterEnv: ['./jest-after-all.ts'],
};
