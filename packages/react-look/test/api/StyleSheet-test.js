import React, { Component } from 'react'

import StyleSheet from '../../modules/api/StyleSheet'
import StyleContainer from '../../modules/api/StyleContainer'

describe('Creating a StyleSheet', () => {
  it('should return a className if no selector is passed', () => {
    expect(StyleSheet.create({ color: 'red' })).to.eql('c0')
  })

  it('should return a map of className if multiple selectors are passed', () => {
    const input = {
      box: {
        color: 'red'
      },
      StyleContainer: {
        color: 'blue'
      }
    }
    const output = { box: 'c0', StyleContainer: 'c1' }
    expect(StyleSheet.create(input)).to.eql(output)
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
    StyleSheet.addCSS({ '*': { color: 'red' } })
    expect(StyleContainer.selectors.get('*')).to.eql({
      color: 'red'
    })
  })

  it('should add a scope selector if one is passed', () => {
    StyleSheet.addCSS({ '.inner': { color: 'red' } }, '.box')
    expect(StyleContainer.selectors.get('.box .inner')).to.eql({
      color: 'red'
    })
  })

  it('should treat strings as static css', () => {
    const css = 'h1 { color: blue }'
    StyleSheet.addCSS(css)
    expect(StyleContainer.statics.has('h1 { color: blue }')).to.eql(true)
  })

  it('toCSS should just call addCSS', () => {
    const css = 'h1 { color: blue }'
    StyleSheet.toCSS(css)
    expect(StyleContainer.statics.has('h1 { color: blue }')).to.eql(true)
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

describe('Exporting to String', () => {
  it('should return all static styles as a single CSS string', () => {
    const styles = StyleSheet.create({
      color: 'red',
      backgroundColor: 'blue'
    })
    const css = StyleSheet.renderToString()

    expect(css).to.eql('.c0{color:red;background-color:blue}')
  })
})
