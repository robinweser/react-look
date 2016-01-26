import prefixer from './prefixer'
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

  renderStaticStyles(userAgent) {
    const tempPrefixer = prefixer(userAgent)
    let css = ''

    this.selectors.forEach((styles, selector) => css += selector + '{' + toCSS(tempPrefixer.prefix(styles)) + '}\n')
    this.keyframes.forEach((frames, name) => css += '@' + tempPrefixer.prefixedKeyframes + ' ' + name + '{' + toCSS(tempPrefixer.prefix(frames)) + '}\n')
    this.mediaQueries.forEach((selectors, query) => {
      css += '@media ' + query + '{'
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

export default new StyleContainer()
