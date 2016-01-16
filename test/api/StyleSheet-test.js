import React, { Component } from 'react'
import StyleSheet from '../../modules/api/StyleSheet'
import look from '../../modules/core/enhancer'
import { expect } from 'chai'

describe('Creating a StyleSheet', () => {
  it('should return an empty object if no styles specified', () => {
    expect(StyleSheet.create('Component')).to.eql({ })
  })

  it('should scope every style selector', () => {
    expect(StyleSheet.create('Component', { box: { } })).to.eql({
      box: {
        _scope: 'Component',
        style: {}
      }
    })
  })

  it('should directly scope the object if no selectors are used', () => {
    expect(StyleSheet.create('Component', { color: 'red' })).to.eql({
      _scope: 'Component',
      style: {
        color: 'red'
      }
    })
  })
  it('should use a Components displayName as scope', () => {
    class Comp extends Component {
    }
    const Enhanced = look(Comp)
    expect(StyleSheet.create(Enhanced, { color: 'red' })._scope).to.eql('Comp')
  })
})
