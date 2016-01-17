import mediaQuery from '../../modules/mixins/mediaQuery'
import Chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

describe('Resolving media queries', () => {
  it('should add a media query listener', () => {
    const Component = { }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    expect(Component._mediaQueryListener).to.exist
  })
  it('media query listener should rerender the Component on update', () => {
    const reloadFn = sinon.spy()
    const Component = { forceUpdate: reloadFn }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    Component._mediaQueryListener()
    expect(reloadFn).to.have.been.calledOnce
  })

  it('should add a did mount listener', () => {
    const Component = { }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    expect(Component.componentDidMount).to.exist
  })

  it('should call existing didMount', () => {
    const resizeListener = sinon.spy()
    global.window = { addEventListener: resizeListener }
    const Component = { }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    Component.componentDidMount()
    expect(resizeListener).to.have.been.calledOnce
  })

  it('should call existing didMount listener', () => {
    const existingDidMount = sinon.spy()
    const Component = { componentDidMount: existingDidMount }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    Component.componentDidMount()
    expect(existingDidMount).to.have.been.calledOnce
  })

  it('should add a willUnmount listener', () => {
    const Component = { }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    expect(Component.componentWillUnmount).to.exist
  })

  it('should remove the global resize listener on willUnmount', () => {
    const resizeListener = sinon.spy()
    global.window = { removeEventListener: resizeListener }
    const Component = { }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    Component.componentWillUnmount()
    expect(resizeListener).to.have.been.calledOnce
  })

  it('should call existing willUnmount', () => {
    const existingWillUnmount = sinon.spy()
    const window = {
      addEventListener(event, fn) {}
    }
    const Component = { componentWillUnmount: existingWillUnmount }
    const newProps = { }
    const config = { plugins: [ (styles) => styles ] }
    mediaQuery('', '', '', { Component, newProps }, config)
    Component.componentWillUnmount()
    expect(existingWillUnmount).to.have.been.calledOnce
  })
})
