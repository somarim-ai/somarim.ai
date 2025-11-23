module.exports = {
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/backend/**/*.test.js'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['<rootDir>/frontend/**/*.test.tsx', '<rootDir>/frontend/**/*.test.jsx'],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/frontend/tsconfig.json' }],
        '^.+\\.jsx?$': 'babel-jest',
      },
      moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
      },
    },
  ],
};