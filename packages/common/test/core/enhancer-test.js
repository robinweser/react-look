import React, { Component, PropTypes } from 'react'
import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

import look from '../../modules/core/enhancer'

describe('Enhancing a Component', () => {
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

describe('Enhancing a stateless function Component', () => {
  it('should use "Component" as displayName', () => {
    const Enhanced = look(() => <div></div>)
    expect(Enhanced.displayName).to.eql('Component')
  })

  it('should use the same displayName', () => {
    const Default = () => <div></div>
    const Enhanced = look(Default)
    expect(Enhanced.displayName).to.eql('Default')
  })
})
