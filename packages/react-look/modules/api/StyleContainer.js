import _ from 'lodash'
import { toCSS } from 'inline-style-transformer'

import generateHashCode from '../utils/generateHashCode'
import sortObject from '../../../common/utils/sortObject'
import prefixer from '../utils/prefixer'

/**
 * Abstract helper to add new styles to a Map/Set
 * @param {StyleContainer} container - current style container instance
 * @param {Map|Set} group - group that styles get added to
 * @param {string} selector - CSS selector thats used as reference
 * @param {Object} styles - styles that get added
 */
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
    this.statics = new Set()

    this._className = 0
    this._listener = new Set()
  }

  /**
   * Adds a new selector with styles
   * it is also used to add media queries
   * @param {string} selector - selector to reference the styles
   * @param {Object} styles - styles that get added
   * @param {string?} media - media query string
   */
  add(selector, styles, media) {
    if (media && media !== '') {
      this._addMediaQuery(selector, styles, media)
    } else {
      addAndEmit(this, this.selectors, selector, styles)
    }
  }

  /**
   * Adds a static css string
   * @param {string} styles - as css string
   */
  addStatic(styles) {
    addAndEmit(this, this.statics, styles)
  }

  /**
   * Adds a new keyframe animation
   * @param {string} animation - named used to reference the animation
   * @param {Object} frames - animation frames that get added
   */
  addKeyframes(animation, frames) {
    addAndEmit(this, this.keyframes, animation, frames)
  }

  /**
   * Adds a new global fontFace
   * @param {Object} font - information on the font
   */
  addFont(font) {
    const fontFace = '@font-face {' + toCSS(font) + '}'
    addAndEmit(this, this.fonts, fontFace)
  }

  /**
   * Renders a single string containing the whole CSS styles
   * @param {string} userAgent - userAgent used to prefix styles
   */
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
    this.statics.forEach(staticCss => css += staticCss)

    return css
  }

  /**
   * Generates a unique hash code for a given style object
   * if the style properties are the same, the same hash will be returned
   * no matter how they're sorted
   * @param {Object} styles - style object which will get sorted and hashed
   */
  generateClassName(styles) {
    return generateHashCode(JSON.stringify(sortObject(styles)))
  }

  /**
 	 * Returns a valid unused className
 	 * @param {string?} prefix - prefix appended before the className
 	 */
  requestClassName(prefix = 'c') {
    return prefix + (this._className++).toString(36)
  }

  /**
   * Adds an change listener
   * Returns an instance with an unsubscribe method
   * @param {Function} listener - event listener
   */
  subscribe(listener) {
    this._listener.add(listener)

    return {
      unsubscribe: () => this._listener.delete(listener)
    }
  }

  /**
   * Change emitter executes every single change listener
   */
  _emitChange() {
    this._listener.forEach(listener => listener())
  }

  /**
   * Helper that Adds dynamic styles to be accessed later globally
   * @param {string} className - className reference
   * @param {Object} styles - styles that get added
   */
  _addDynamic(className, styles) {
    if (!_.isEmpty(styles)) {
      addAndEmit(this, this.dynamics, className, styles)
    }
  }

  /**
   * Helper that adds media queries
   * @param {string} selector - selector to reference the styles
   * @param {Object} styles - styles that get added
   * @param {string?} media - media query string
   */
  _addMediaQuery(selector, styles, media) {
    // Add the media if not existing yet
    if (!this.mediaQueries.has(media)) {
      this.mediaQueries.set(media, new Map())
    }

    const mediaQuery = this.mediaQueries.get(media)
    addAndEmit(this, mediaQuery, selector, styles)
  }

}

// We export a global StyleContainer instance
export default new StyleContainer()
