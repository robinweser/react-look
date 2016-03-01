import React, { Component } from 'react'
import look from '../../core/enhancer'
import Chai from 'chai'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import jsdom from 'jsdom'
Chai.use(sinonChai)

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')

// get the window object out of the document
var win = doc.defaultView

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc
global.window = win


describe('Enhancing a Component', () => {
  it('should use the same displayName', () => {
    class Default extends Component {
    }
    let Enhanced = look(Default)
    let instance = new Enhanced({ }, { _lookConfig: { } })

    expect(instance.displayName).to.eql(Default.displayName)
  })

  it('should recieve props', () => {
    class Default extends Component {
      constructor() {
        super(...arguments)
      }
    }

    let Enhanced = look(Default)
    let instance = new Enhanced({ bar: 1 }, { _lookConfig: { } })

    expect(instance.props).to.eql({ bar: 1 })
  })

  it('should call super (constructor) only once', () => {
    let constructorFunc = sinon.spy()

    class Default extends Component {
      constructor() {
        super()
        constructorFunc()
      }
    }

    let Enhanced = look(Default)
    let instance = new Enhanced({ }, { _lookConfig: { } })

    expect(constructorFunc).to.have.been.calledOnce
  })
})
