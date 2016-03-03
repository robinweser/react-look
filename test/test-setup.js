require('babel-core/register')({
  presets: [
    'react',
    'es2015',
    'stage-0'
  ],
  plugins: [
    'add-module-exports',
    [ 'babel-plugin-module-alias', [ {
      src: './test/mocks/react-native',
      expose: 'react-native'
    } ] ]
  ]
})


var chai = require('chai')
var TestUtils = require('./test-utils')

global.expect = chai.expect
global.TestUtils = TestUtils
