import React, { Component } from 'react'
import look from '../../modules/core/enhancer'
import Chai, { expect } from 'chai'
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
    let instance = new Enhanced()

    expect(instance.displayName).to.eql(Default.displayName)
  })

  it('should set up initial state', () => {
    class Default extends Component {
    }
    let Enhanced = look(Default);
    let instance = new Enhanced();

    expect(instance.state).to.have.property('_look')
  })
  it('should merge existing state', () => {
    class Default extends Component {
      constructor() {
        super(...arguments)
        this.state = { foo: 1 }
      }
    }

    let Enhanced = look(Default)
    let instance = new Enhanced()

    expect(instance.state).to.eql({
      foo: 1,
      _look: new Map()
    })
  })

  it('should recieve props', () => {
    class Default extends Component {
      constructor() {
        super(...arguments)
      }
    }

    let Enhanced = look(Default)
    let instance = new Enhanced({ bar: 1 })

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
    let instance = new Enhanced()

    expect(constructorFunc).to.have.been.calledOnce
  })

  it('should call super.render only once', () => {
    let callMe = sinon.spy()

    class Default extends Component {
      render() {
        callMe()
        return null
      }
    }
    let Enhanced = look(Default)
    let instance = new Enhanced()
    instance.render()

    expect(callMe).to.have.been.calledOnce
  })

  it('should render a CSS StyleSheet if lookRoot is set', () => {
    const element = <div />
    class Default extends Component {
      render() {
        return element
      }
    }
    let Enhanced = look(Default, { lookRoot: true })
    let instance = new Enhanced()

    expect(instance.render().props.children[0]).to.eql(element)
    expect(instance.render().props.children[1].type.name).to.eql('CSSStyleSheet')
  })

  it('should pass lookConfig within context', () => {
    const fn = sinon.spy()
    const pluggedStyles = { color: 'red' }
    const plugin = () => {
      fn()
      return pluggedStyles;
    }

    const Child = () => <span id="hello" look={{ color: 'blue' }}/>
    const EnhancedChild = look(Child)

    const Parent = () => (<div look={{ color: 'yellow' }}><EnhancedChild /></div>)
    let Enhanced = look(Parent)
    const comp = TestUtils.renderIntoDocument(<Enhanced lookConfig={{
      plugins: [ plugin ]
    }} />)
    const element = TestUtils.findRenderedDOMComponentWithTag(comp, 'span')
    expect(fn).to.have.been.calledTwice
    expect(ReactDOM.findDOMNode(element).style._values).to.eql({
      color: 'red'
    })
  })
})
