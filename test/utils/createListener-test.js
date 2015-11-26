import createListener from '../../lib/utils/createListener'
import React, { Component } from 'react'
import Chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

describe('Creating an event listener', () => {

  class Example extends Component {
    render() {
      return <div onClick={this.props.onClick}></div>
    }
  }

  const listenerFunc = sinon.spy()
  const customListenerFunc = sinon.spy()

  const rendered = <Example onClick={listenerFunc} />

  const onClick = createListener({state: {_look: new Map()}}, rendered, 'hover', 'onClick', customListenerFunc)
  const cloned = React.cloneElement(rendered, {onClick})
  cloned.props.onClick()

  it('should call existing listeners', () => {
    expect(listenerFunc).to.have.been.called
  })

  it('should call custom listeners', () => {
    expect(customListenerFunc).to.have.been.called
  })
})
