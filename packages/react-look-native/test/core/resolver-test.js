import React, { Component } from 'react'
import Chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
Chai.use(sinonChai)

import resolveStyles from '../../modules/core/resolver'
import look from '../../../common/modules/core/enhancer'

describe('Resolving react-native styles', () => {
  it('should return the element if it is not a React element', () => {
    expect(resolveStyles({ }, true, { })).to.eql(true)
  })

  it('should return the element if it is look enhanced', () => {
    const Element = () => <div></div>
    const Enhanced = look(Element)
    const element = <Enhanced />
    expect(resolveStyles({ }, element, { })).to.eql(element)
  })

  it('should resolve children and props', () => {
    const Component = { }

    const resolveSpy = sinon.spy()
    const config = TestUtils.mockConfigWithResolver({ }, resolveSpy)

    const Comp = ({ children }) => <div></div>
    const propEl = <div>Prop</div>
    const element = (
    <Comp prop={propEl}>
      <div>child</div>
    </Comp>
    )

    resolveStyles(Component, element, config)
    expect(resolveSpy).to.have.been.calledTwice
  })
})
