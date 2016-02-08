import React, { Component } from 'react'
import StyleSheet from '../../modules/api/StyleSheet'
import { expect } from 'chai'
import { clearStyleContainer } from '../test-utils'

beforeEach(clearStyleContainer)

describe('Creating a StyleSheet', () => {
  it('should return a className if no selector is passed', () => {
    expect(StyleSheet.create({ color: 'red' })).to.eql('c0')
  })

  it('should return a map of className if multiple selectors are passed', () => {
    expect(StyleSheet.create({
      box: {
        color: 'red'
      },
      container: {
        color: 'blue'
      }
    })).to.eql({ box: 'c0', container: 'c1' })
  })
})

describe('Creating keyframes', () => {
  it('should return the passed animation name', () => {
    expect(StyleSheet.keyframes({
      to: {
        color: 'red'
      }
    }, 'anim')).to.eql('anim')
  })

  it('should generate a animation name if no one passed', () => {
    expect(StyleSheet.keyframes({
      to: {
        color: 'red'
      }
    })).to.eql('k0')
  })
})
