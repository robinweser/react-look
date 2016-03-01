import look from '../modules'
import React, { Component } from 'react-native'

describe('Enhancing with look', () => {

  it('should work as a higher order function', () => {
    const Comp = () => <div />
    expect(look(Comp).displayName).to.eql('Comp')
  })
})
