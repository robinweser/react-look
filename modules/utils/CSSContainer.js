import prefixer from './prefixer'
import { toCSS } from 'inline-style-transformer'


class CSSContainer {
  constructor() {
    this.selectors = new Map()
    this.mediaQueries = new Map()
    this.keyframes = new Map()

    this._listener = new Set()
  }

  add(selector, styles) {
    if (!this.selectors.has(selector)) {
      this.selectors.set(selector, styles)
      this._emitChange()
    }
  }

  addKeyframes(animation, frames) {
    if (!this.keyframes.has(animation)) {
      this.keyframes.set(animation, frames)
      this._emitChange()
    }
  }

  render(userAgent) {
    const tempPrefixer = prefixer(userAgent)
    let css = ''

    this.selectors.forEach((styles, selector) => css += selector + '{' + toCSS(tempPrefixer.prefix(styles)) + '}')
    this.keyframes.forEach((frames, name) => css += '@' + tempPrefixer.prefixedKeyframes + ' ' + name + '{' + toCSS(tempPrefixer.prefix(frames)) + '}')

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

export default new CSSContainer()
