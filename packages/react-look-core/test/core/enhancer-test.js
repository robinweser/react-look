import React, { Component, PropTypes } from 'react'
import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

import look from '../../modules/core/enhancer'

describe('Enhancing an ES6 class Component', () => {
  it('should use the same displayName', () => {
    class Default extends Component {
      render() {
        return <div>Test</div>
      }
    }
    const Enhanced = look(Default)
    expect(Enhanced.displayName).to.eql('Default')
  })

  it('should recieve props', () => {
    class Default extends Component {
      constructor() {
        super(...arguments)
      }
    }

    const Enhanced = look(Default)
    const instance = <Enhanced bar={true} />

    expect(instance.props).to.eql({ bar: true })
  })

  it('should call super (constructor) only once', () => {
    let constructorFunc = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, () => true)

    class Default extends Component {
      constructor(props) {
        super(...arguments)
        constructorFunc()
      }
    }

    const Enhanced = look(Default)
    const instance = new Enhanced({ }, { _lookConfig: config })

    expect(constructorFunc).to.have.been.calledOnce
  })

  it('should inherit childContextTypes and contextTypes', () => {
    const config = TestUtils.mockConfigWithResolver({ }, () => true)

    class Default extends Component {
      constructor() {
        super(...arguments)
      }
    }
    const contextTypes = { foo: PropTypes.bool }

    Default.contextTypes = contextTypes
    Default.childContextTypes = contextTypes

    const Enhanced = look(Default, { })

    expect(Enhanced.contextTypes.foo).to.eql(PropTypes.bool)
  })

  it('should mark the Component as look enhanced', () => {
    class Default extends Component {
    }

    const Enhanced = look(Default)

    expect(Enhanced._isLookEnhanced).to.eql(true)
  })

  it('should return resolved element on render', () => {
    const resolveSpy = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, resolveSpy)

    class Default extends Component {
      render() {
        return <div>Hallo</div>
      }
    }

    const Enhanced = look(Default)
    const instance = new Enhanced({ }, { _lookConfig: config })

    const output = instance.render()
    expect(output.props.children).to.eql('Hallo')
    expect(resolveSpy).to.have.been.called
  })
})

describe('Enhancing a stateless functional Component', () => {
  it('should use "LookStateless" as default displayName', () => {
    const Enhanced = look(() => <div></div>)
    expect(Enhanced.name).to.eql('LookStateless')
  })

  it('should inherit contextTypes and childContextTypes', () => {
    const Comp = () => <div></div>
    Comp.contextTypes = { foo: 'bar' }
    Comp.childContextTypes = { bar: 'foo' }
    const Enhanced = look(Comp)

    expect(Enhanced.contextTypes.foo).to.eql('bar')
    expect(Enhanced.childContextTypes.bar).to.eql('foo')
  })

    it('should preserve defaultProps', () => {
      const Comp = () => <div></div>
      Comp.defaultProps = { foo: 'bar' }
      const Enhanced = look(Comp)

      expect(Enhanced.defaultProps.foo).to.eql('bar')
    })

  it('should inherit add _lookConfig context types', () => {
    const Comp = () => <div></div>
    const Enhanced = look(Comp)

    expect(Enhanced.contextTypes._lookConfig).to.exist
    expect(Enhanced.childContextTypes._lookConfig).to.exist
  })

  it('should basically render the same markup', () => {
    const Comp = (props, context) => <div></div>
    const renderedElement = Comp()

    const Enhanced = look(Comp)
    const config = TestUtils.mockConfigWithResolver({ }, () => true)
    expect(Enhanced({ }, { _lookConfig: config })).to.eql(renderedElement)
  })
})
