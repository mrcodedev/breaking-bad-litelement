const {createDefaultConfig} = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = (config) => {
  config.set(
    merge(createDefaultConfig(config), {
      frameworks: ['mocha', 'chai', 'sinon'],
      client: {
        mocha: {
          ui: 'tdd',
        },
      },
      files: [
        {
          pattern: config.grep ? config.grep : './dist/**/*.spec.js',
          type: 'module',
        },
      ],
      // See the karma-esm docs for all options
      esm: {
        nodeResolve: true,
      },
    })
  );
  return config;
};
