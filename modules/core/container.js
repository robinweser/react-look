import React, { Component } from 'react'
import _ from 'lodash'
import prefixer from '../utils/prefixer'
import { toCSS } from 'inline-style-transformer'

function addAndEmit(container, group, selector, styles) {
  if (!group.has(selector)) {
    if (styles !== undefined) {
      group.set(selector, styles)
    } else {
      group.add(selector)
    }
    container._emitChange()
  }
}
/**
 * A StyleContainer collects className mappings
 * that can be rendered into a static CSS string
 */
class StyleContainer {
  constructor() {
    this.selectors = new Map()
    this.mediaQueries = new Map()
    this.keyframes = new Map()
    this.fonts = new Set()
    this.dynamics = new Map()

    this._className = 0
    this._listener = new Set()
  }

  /**
   * Adds a new selector with styles
   * it is also used to add media queries
   * @param {string} selector - selector to reference the styles
   * @param {Object} styles - styles to be added
   * @param {string?} media - media query string
   */
  add(selector, styles, media) {
    if (media && media !== '') {
      this._addMediaQuery(selector, styles, media)
    } else {
      addAndEmit(this, this.selectors, selector, styles)
    }
  }

  addKeyframes(animation, frames) {
    addAndEmit(this, this.keyframes, animation, frames)
  }

  addFont(font) {
    const fontFace = '@font-face {' + toCSS(font) + '}'
    addAndEmit(this, this.fonts, fontFace)
  }

  _addDynamic(className, styles) {
    if (!_.isEmpty(styles)) {
      addAndEmit(this, this.dynamics, className, styles)
    }
  }

  _addMediaQuery(selector, styles, media) {
    if (!this.mediaQueries.has(media)) {
      this.mediaQueries.set(media, new Map())
    }

    const mediaQuery = this.mediaQueries.get(media)
    addAndEmit(this, mediaQuery, selector, styles)
  }

  renderStaticStyles(userAgent) {
    const tempPrefixer = prefixer(userAgent)
    let css = ''

    this.selectors.forEach((styles, selector) => css += selector + '{' + toCSS(tempPrefixer.prefix(styles)) + '}')
    this.fonts.forEach(font => css += font)
    this.keyframes.forEach((frames, name) => css += '@' + tempPrefixer.prefixedKeyframes + ' ' + name + '{' + toCSS(tempPrefixer.prefix(frames)) + '}')
    this.mediaQueries.forEach((selectors, query) => {
      css += '@media' + query + '{'
      selectors.forEach((styles, selector) => css += selector + '{' + toCSS(tempPrefixer.prefix(styles)) + '}')
      css += '}'
    })

    return css
  }

  requestClassName(prefix = 'c') {
    return prefix + (this._className++).toString(36)
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


/**
 * StyleComponent is used to render static CSS markup
 * into a <style> element so CSS styles are rendered correctly
 * it listens for changes of the global style container
 */
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
