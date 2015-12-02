import cssifyObject from './cssifyObject'
import generateClassName from './generateClassName'

export default class CSSContainer {
  constructor() {
    this.CSSRules = {}
    this._listener = new Set()
  }

  /**
  * Converts style objects to CSSRules and generates
  * a unique className if no selector is passed
  * @param {Object} styles - style object that gets inserted
  * @param {string?} pseudoSelector - reference pseudo selector
  */
  insertStyles(styles, pseudoSelector, selector, userAgent) {
    const pseudo = pseudoSelector ? pseudoSelector : ''

    if (!selector) {
      const className = generateClassName(styles)
      this._addCSS(`.${className}${pseudo}{${cssifyObject(styles, userAgent)}}`)
      return className
    }

    this._addCSS(`${selector}${pseudo}{${cssifyObject(styles, userAgent)}}`)
    return selector
  }

  insertRule(CSSRule) {
    this._addCSS(CSSRule)
  }

  removeRule(CSSRule) {
    if (this.CSSRules[CSSRule]) {
      delete this.CSSRules[CSSRule]
      this._executeListener()
    }
  }

  getCSSString() {
    return Object.keys(this.CSSRules).join('\n')
  }

  subscribe(listener) {
    this._listener.add(listener)

    const remove = () => this.unsubscribe(listener)
    return remove
  }

  unsubscribe(listener) {
    this._listener.delete(listener)
  }


  _addCSS(CSS) {
    if (!this.CSSRules[CSS]) {
      this.CSSRules[CSS] = true
      this._executeListener()
    }
  }

  _executeListener() {
    const CSSString = this.getCSSString()
    this._listener.forEach(listener => listener(CSSString))
  }
}
