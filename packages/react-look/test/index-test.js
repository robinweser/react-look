import React, { Component } from 'react'

import look from '../modules/index'

describe('Enhancing with look', () => {

  it('should work as a higher order function', () => {
    const Comp = () => <div />
    expect(look(Comp).contextTypes).to.exist
  })
})
