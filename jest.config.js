/** @type {import('jest').Config} */
const config = {
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '\\.[jt]sx?$': 'babel-jest'
      },
  };
  
  module.exports = config;