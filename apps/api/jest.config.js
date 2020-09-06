module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./jest-setup.ts'],
  setupFilesAfterEnv: ['./jest-after-all.ts'],
};
