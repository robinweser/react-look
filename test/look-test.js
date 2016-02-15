import look from '../modules/dom'
import React, { Component } from 'react'
import { expect } from 'chai'

describe('Enhancing with look', () => {

  it('should work as a higher order function', () => {
    const Comp = () => <div />
    expect(look(Comp).displayName).to.eql('Comp')
  })

  it('should also work as a decorator', () => {
    @look
    class Comp extends Component {
    }

    expect(Comp.displayName).to.eql('Comp')
  })
})
