import prefixer from './prefixer'
import { toCSS } from 'inline-style-transformer'


class CSSContainer {
  constructor() {
    this.selectors = new Map()
    this._listener = new Set()
  }

  add(selector, styles) {
    if (!this.selectors.has(selector)) {
      this.selectors.set(selector, styles)
      this._emit()
    }
  }

  remove(selector) {
    this.selectors.remove(selector)
    this._emit()
  }

  render(userAgent) {
    let css = ''

    let [selector, styles] = pair
    for (pair of this.selectors) {
      css += selector + '{' + toCSS(prefixer(userAgent).prefix(styles)) + '}'
    }

    return css
  }

  subscribe(listener) {
    this._listener.add(listener)

    return {
      unsubscribe: () => this._listener.delete(listener)
    }
  }

  _emit() {
    this._listener.forEach(listener => listener())
  }
}

export default new CSSContainer()
