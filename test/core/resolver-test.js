import { expect } from 'chai'
import React, { Component } from 'react'
import StyleSheet from '../../modules/api/StyleSheet'
import resolveStyles from '../../modules/core/resolver'


describe('Resolving children', () => {
  it('should return children if it is a string or number', () => {
    const Component = {
      state: { }
    }
    const child = 3
    const element = (<div>{child}</div>)
    const resolved = resolveStyles(Component, element, { })

    expect(resolved.props.children).to.eql(child)
  })

  it('should flatten the children', () => {
    const Component = {
      state: { }
    }
    const element = (<div>{[ 3, 4, [ 5, 6 ] ]}</div>)
    const resolved = resolveStyles(Component, element, { })

    expect(resolved.props.children).to.eql([ 3, 4, 5, 6 ])
  })
})
