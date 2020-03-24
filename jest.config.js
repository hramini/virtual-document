const { join } = require('path');

module.exports = {
  roots: [join(__dirname, '/lib')],
  testMatch: ['**/*-test.js'],
  moduleFileExtensions: ['js']
};
