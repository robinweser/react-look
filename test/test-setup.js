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
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.use(sinonChai)

var TestUtils = require('./test-utils')
var React = require('react')
var Enzyme = require('enzyme')
var getStaticStyle = require('react-look-test-utils').getStaticStyle
var Presets = require('react-look').Presets
var LookRoot = require('react-look').LookRoot

global.React = React
global.Component = React.Component
global.shallow = Enzyme.shallow
global.expect = chai.expect
global.sinon = sinon
global.TestUtils = TestUtils
global.getStaticStyle = getStaticStyle

global.mount = function(Comp) {
  var out = Enzyme.mount(React.createElement(LookRoot, {
    config: Presets['react-dom']
  }, Comp))

  out.findEl = function(tag, index) {
    var el = out.find(tag).at(index)

    return { props: el.props() }
  }

  return out
}
