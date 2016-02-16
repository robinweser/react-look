import look from '../modules/dom'
import nativeLook from '../modules/native'
import React, { Component } from 'react'
import { expect } from 'chai'

describe('Enhancing with look', () => {

  it('should work as a higher order function', () => {
    const Comp = () => <div />
    expect(look(Comp).displayName).to.eql('Comp')
    expect(nativeLook(Comp).displayName).to.eql('Comp')
  })

  it('should also work as a decorator', () => {
    @look
    class Comp extends Component {
    }
    @nativeLook
    class NativeComp extends Component {
    }

    expect(NativeComp.displayName).to.eql('NativeComp')
  })
})
