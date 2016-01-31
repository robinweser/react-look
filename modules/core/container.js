import prefixer from '../utils/prefixer'
import React, { Component } from 'react'
import { toCSS } from 'inline-style-transformer'

class StyleContainer {
  constructor() {
    this.selectors = new Map()
    this.mediaQueries = new Map()
    this.keyframes = new Map()
    this.fonts = new Map()
    this.dynamics = new Map()

    this._listener = new Set()
  }

  add(selector, styles, media) {
    if (media && media !== '') {
      this.addMediaQuery(selector, styles, media)
    } else {
      if (!this.selectors.has(selector)) {
        this.selectors.set(selector, styles)
        this._emitChange()
      }
    }
  }

  addMediaQuery(selector, styles, media) {
    if (!this.mediaQueries.has(media)) {
      this.mediaQueries.set(media, new Map())
    }

    const mediaQuery = this.mediaQueries.get(media)

    if (!mediaQuery.has(selector)) {
      mediaQuery.set(selector, styles)
      this._emitChange()
    }
  }

  addKeyframes(animation, frames) {
    if (!this.keyframes.has(animation)) {
      this.keyframes.set(animation, frames)
      this._emitChange()
    }
  }

  addDynamic(className, styles) {
    if (Object.keys(styles).length > 0 && !this.dynamics.has(className)) {
      this.dynamics.set(className, styles)
      this._emitChange()
    }
  }

  addFontFace(font) {
    const fontFace = '@font-face {' + cssifyObject(font) + '}'
    if (this.fonts.has(fontFace)) {
      this.fonts.add(fontFace)
      this._emitChange()
    }
  }

  renderStaticStyles(userAgent) {
    const tempPrefixer = prefixer(userAgent)
    let css = ''

    this.selectors.forEach((styles, selector) => css += selector + '{' + toCSS(tempPrefixer.prefix(styles)) + '}\n')
    this.fonts.forEach(font => css += font + '\n')
    this.keyframes.forEach((frames, name) => css += '@' + tempPrefixer.prefixedKeyframes + ' ' + name + '{' + toCSS(tempPrefixer.prefix(frames)) + '}\n')
    this.mediaQueries.forEach((selectors, query) => {
      css += '@media ' + query + '{\n'
      selectors.forEach((styles, selector) => css += selector + '{' + toCSS(tempPrefixer.prefix(styles)) + '}\n')
      css += '}\n'
    })

    return css
  }

  subscribe(listener) {
    this._listener.add(listener)

    return {
      unsubscribe: () => this._listener.delete(listener)
    }
  }

  _emitChange() {
    this._listener.forEach(listener => listener())
  }
}

const globalStyleContainer = new StyleContainer()

export class StyleComponent extends Component {
  constructor(props) {
    super(...arguments)
    const css = globalStyleContainer.renderStaticStyles(props.userAgent) // eslint-disable-line
    this.state = { css: css }

    this.updateStyles = this.updateStyles.bind(this, props.userAgent)
  }

  componentDidMount() {
    this._changeListener = globalStyleContainer.subscribe(this.updateStyles)
  }

  componentWillUnmount() {
    this._changeListener.unsubscribe()
  }

  updateStyles(userAgent) {
    const css = globalStyleContainer.renderStaticStyles(userAgent) // eslint-disable-line
    this.setState({ css: css })
  }

  render() {
    const innerHTML = { __html: this.state.css }
    return <style dangerouslySetInnerHTML={innerHTML} />
  }
}

export default globalStyleContainer
