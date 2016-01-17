import target from '../../modules/mixins/target'
import Chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

describe('Resolving target mixin', () => {
  global.location = { href: 'http://example.com/foo/bar#test' }
  it('should return false if no element id is passed', () => {
    const Component = { }
    const newProps = { }
    const element = { }
    expect(target('', '', '', { Component, newProps, element })).to.eql(false)
  })

  it('should add a location href listener', () => {
    const Component = { }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    expect(Component._locationHrefListener).to.exist
  })

  it('should rerender the Component if location href listener is called', () => {
    const renderListener = sinon.spy()
    const Component = { forceUpdate: renderListener }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    Component._locationHrefListener()
    expect(renderListener).to.have.been.calledOnce
  })

  it('should add a did mount listener', () => {
    const Component = { }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    expect(Component.componentDidMount).to.exist
  })

  it('should add a global resize listener on didMount', () => {
    const resizeListener = sinon.spy()
    global.window = { addEventListener: resizeListener }
    const Component = { }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    Component.componentDidMount()
    expect(resizeListener).to.have.been.calledOnce
  })

  it('should call existing didMount listener', () => {
    const existingDidMount = sinon.spy()
    const Component = { componentDidMount: existingDidMount }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    Component.componentDidMount()
    expect(existingDidMount).to.have.been.calledOnce
  })

  it('should add a willUnmount listener', () => {
    const Component = { }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    expect(Component.componentWillUnmount).to.exist
  })

  it('should remove the global haschange listener on willUnmount', () => {
    const resizeListener = sinon.spy()
    global.window = { removeEventListener: resizeListener }
    const Component = { }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    Component.componentWillUnmount()
    expect(resizeListener).to.have.been.calledOnce
  })

  it('should call existing willUnmount listener', () => {
    const existingWillUnmount = sinon.spy()
    const window = {
      addEventListener(event, fn) {}
    }
    const Component = { componentWillUnmount: existingWillUnmount }
    const newProps = { }
    const element = { id: 'test' }
    target('', '', '', { Component, newProps, element })
    Component.componentWillUnmount()
    expect(existingWillUnmount).to.have.been.calledOnce
  })

  it('should return true if the href matches', () => {
    const Component = { }
    const newProps = { }
    const element = { id: 'test' }
    expect(target('', true, '', { Component, newProps, element })).to.eql(true)
  })

  it('should return false if the href does not match', () => {
    const Component = { }
    const newProps = { }
    const element = { id: 'test1' }
    expect(target('', true, '', { Component, newProps, element })).to.eql(false)
  })
})
