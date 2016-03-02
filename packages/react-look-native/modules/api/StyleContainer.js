import _ from 'lodash'

/**
 * A StyleContainer collects className mappings
 * that can be rendered into a static CSS string
 */
class StyleContainer {
  constructor() {
    this.styles = new Map()
    this._dynamic = new Map()

    this._selector = 0
    this._listener = new Set()
  }

  /**
   * Adds a new selector with styles
   * @param {string} selector - selector to reference the styles
   * @param {Object} styles - styles that get added
   */
  add(selector, styles) {
    if (!this.styles.has(selector) && !_.isEmpty(styles)) {
      this.styles.set(selector, styles)
      this._emitChange()
    }
  }

  /**
   * Returns styles referenced by a selector
   * @param {string} selector - selector to reference the styles
   */
  get(selector) {
    return this.styles.get(selector)
  }

  /**
 	 * Returns a valid unused selector
 	 * @param {string?} prefix - prefix appended before the className
 	 */
  requestSelector(prefix = 's') {
    return prefix + (this._selector++).toString(36)
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
   * Adds new dynamic styles referenced by a selector
   * @param {string} selector - selector to reference the styles
   * @param {Object} styles - styles that get added
   */
  _addDynamic(selector, styles) {
    if (!this._dynamic.has(selector) && !_.isEmpty(styles)) {
      this._dynamic.set(selector, styles)
      this._emitChange()
    }
  }

  /**
   * Returns dynamic styles referenced by a selector
   * @param {string} selector - selector to reference the styles
   */
  _getDynamic(selector) {
    return this._dynamic.get(selector)
  }
}

// We export a global StyleContainer instance
export default new StyleContainer()
