import React, { Component } from 'react'
import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

import { resolvePlugins, resolveChildren, resolveProps, isLookEnhanced } from '../../modules/core/resolver'
import look from '../../modules/core/enhancer'

describe('Checking for look-enhanced Components', () => {
  it('should return true if a Component was enhanced by look', () => {
    const Component = () => <div>Test</div>
    const EnhancedComponent = look(Component)

    class Comp extends Component {
      render() {
        return <div>Test</div>
      }
    }
    const EnhancedComp = look(Comp)

    expect(isLookEnhanced(EnhancedComponent)).to.eql(true)
    expect(isLookEnhanced(EnhancedComp)).to.eql(true)
  })

  it('should return false if a Component was not enhanced by look', () => {
    const Component = () => <div>Test</div>

    class Comp extends Component {
      render() {
        return <div>Test</div>
      }
    }

    expect(isLookEnhanced(Component)).to.eql(false)
    expect(isLookEnhanced(Comp)).to.eql(false)
  })
})

describe('Resolving plugins', () => {
  it('should pipe styles through plugins', () => {
    const styles = { color: 'red' }
    const pluginSpy = sinon.spy()

    const pluginInterface = TestUtils.mockPluginInterfaceWithPlugin(styles, pluginSpy)
    const output = resolvePlugins(pluginInterface)

    expect(output).to.eql(styles)
    expect(pluginSpy).to.have.been.calledOnce
  })
  it('should pipe styles through plugins when dynamic styles are available and forceModePossible is true', () => {
    const styles = { color: 'red' }
    const pluginSpy = sinon.spy()

    let pluginInterface = TestUtils.mockPluginInterfaceWithPlugin(styles, pluginSpy)
    pluginInterface.dynamicStylesNotNull = true
    const output = resolvePlugins(pluginInterface, true)

    expect(output).to.eql(styles)
    expect(pluginSpy).to.have.been.calledOnce
  })
  it('should not pipe styles through plugins when dynamic styles are not available and forceModePossible is true', () => {
    const styles = { color: 'red' }
    const pluginSpy = sinon.spy()

    let pluginInterface = TestUtils.mockPluginInterfaceWithPlugin(styles, pluginSpy)
    pluginInterface.dynamicStylesNotNull = false
    const output = resolvePlugins(pluginInterface, true)

    expect(output).to.eql(styles)
    expect(pluginSpy).to.have.been.calledNever
  })
  it('should pipe styles through plugins when dynamic styles are not available and forceModePossible is true and the plugin is in force mode', () => {
    const styles = { color: 'red' }
    const pluginSpy = sinon.spy()

    let pluginInterface = TestUtils.mockPluginInterfaceWithPlugin(styles, pluginSpy, 'force')
    pluginInterface.dynamicStylesNotNull = false
    const output = resolvePlugins(pluginInterface, true)

    expect(output).to.eql(styles)
    expect(pluginSpy).to.have.been.calledOnce
  })
  it('should pipe styles through plugins which are objects when dynamic styles are available', () => {
    const styles = { color: 'red' }
    const pluginSpy = sinon.spy()

    const pluginInterface = TestUtils.mockPluginInterfaceWithPlugin(styles, pluginSpy, 'default')
    pluginInterface.dynamicStylesNotNull = true
    const output = resolvePlugins(pluginInterface, true)

    expect(output).to.eql(styles)
    expect(pluginSpy).to.have.been.calledOnce
  })
})

describe('Resolving children', () => {
  it('should return if it is a primitive', () => {
    const Component = { }
    const newPropsString = { children: 'test' }
    const newPropsNumber = { children: 3 }
    const config = { }

    resolveChildren(Component, newPropsString, config)
    resolveChildren(Component, newPropsNumber, config)

    expect(newPropsString).to.eql(newPropsString)
    expect(newPropsNumber).to.eql(newPropsNumber)
  })

  it('should resolve children if it is a single element', () => {
    const Component = { }
    const newProps = { children: <div>Child</div> }

    const resolveSpy = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, resolveSpy)

    resolveChildren(Component, newProps, config)

    expect(resolveSpy).to.have.been.called
  })

  it('should iterate an array of children and resolve each', () => {
    const Component = { }
    const newProps = {
      children: [ <div>Child</div>, <div>Second</div>, 3 ]
    }

    const resolveSpy = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, resolveSpy)

    resolveChildren(Component, newProps, config)

    expect(resolveSpy).to.have.been.calledTwice
  })
})


describe('Resolving elements within props', () => {
  it('should iterate props and resolve them', () => {
    const Component = { }
    const newProps = { someElement: <div>Child</div> }

    const resolveSpy = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, resolveSpy)

    resolveProps(Component, newProps, config)

    expect(resolveSpy).to.have.been.called
  })

  it('should add _lookShouldUpdate while resolving', () => {
    const Component = { }
    const newProps = { someElement: <div>Test</div> }

    const resolveSpy = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, resolveSpy)

    resolveProps(Component, newProps, config)

    expect(newProps._lookShouldUpdate).to.eql(true)
  })

  it('should skip children as those get resolved separately', () => {
    const Component = { }
    const newProps = {
      someElement: <div>Test</div>,
      children: <div>child</div>
    }

    const resolveSpy = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, resolveSpy)

    resolveProps(Component, newProps, config)

    expect(resolveSpy).to.have.been.calledOnce
  })
})
