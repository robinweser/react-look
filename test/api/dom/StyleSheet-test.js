import React, { Component } from 'react'
import StyleSheet from '../../../modules/api/dom/StyleSheet'
import StyleContainer from '../../../modules/api/dom/StyleContainer'
import { expect } from 'chai'

describe('Creating a StyleSheet', () => {
  it('should return a className if no selector is passed', () => {
    expect(StyleSheet.create({ color: 'red' })).to.eql('c0')
  })

  it('should return a map of className if multiple selectors are passed', () => {
    expect(StyleSheet.create({
      box: {
        color: 'red'
      },
      StyleContainer: {
        color: 'blue'
      }
    })).to.eql({ box: 'c0', StyleContainer: 'c1' })
  })
})

describe('Creating keyframes', () => {
  it('should return the passed animation name', () => {
    expect(StyleSheet.keyframes({ to: { color: 'red' } }, 'anim')).to.eql('anim')
  })

  it('should generate a animation name if no one passed', () => {
    expect(StyleSheet.keyframes({ to: { color: 'red' } })).to.eql('k0')
  })
})

describe('Generating global CSS', () => {
  it('should add CSS directly to the style StyleContainer', () => {
    StyleSheet.toCSS({ '*': { color: 'red' } })
    expect(StyleContainer.selectors.get('*')).to.eql({
      color: 'red'
    })
  })

  it('should add a scope selector if one is passed', () => {
    StyleSheet.toCSS({ '.inner': { color: 'red' } }, '.box')
    expect(StyleContainer.selectors.get('.box .inner')).to.eql({
      color: 'red'
    })
  })
})


describe('Combining styles', () => {
  it('should return a concatenated className', () => {
    const classNames = {
      box: 'c1',
      StyleContainer: 'c2',
      inner: 'c4'
    }
    expect(StyleSheet.combineStyles(classNames.box, classNames.StyleContainer, classNames.inner)).to.eql('c1 c2 c4')
  })
})

describe('Creating a new fontFace', () => {
  it('should return the fontFamily', () => {
    expect(StyleSheet.font('Arial', [ 'Arial.ttf' ])).to.eql('Arial')
  })

  it('should add style properties', () => {
    StyleSheet.font('Arial', [ 'Arial.ttf' ], {
      fontWeight: 300
    })
    const fontFace = '@font-face {font-family:\'Arial\';src:url(\'Arial.ttf\') format(\'truetype\');font-weight:300}'
    expect(StyleContainer.fonts.has(fontFace)).to.eql(true)
  })
})
