import prefixer from './prefixer'
import { toCSS } from 'inline-style-transformer'

function removeEmpty(obj) {
  if (obj instanceof Object && !Array.isArray(obj) && typeof obj !== 'function') {
    if (Object.keys(obj).length < 1) {
      return false
    }

    Object.keys(obj).forEach(key => {
      if (!removeEmpty(obj[key])) {
        delete obj[key]
      }
    })
  }

  return obj
}

class StyleContainer {
  constructor() {
    this.selectors = new Map()
    this.mediaQueries = new Map()
    this.keyframes = new Map()
    this.fonts = new Map()
    this.dynamics = new Map()

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

  addDynamic(className, styles) {
    removeEmpty(styles)

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
