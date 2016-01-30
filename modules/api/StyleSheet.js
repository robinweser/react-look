import StyleContainer from '../utils/StyleContainer'
import generateClassName from '../utils/generateClassName'
import renderStaticStyles from '../core/renderer'

let scope = 0

export default {
  /**
   * Generates a styleSheet with an scopeId applied to every selector
   * The scopeId refers to the Component that is responsible for resolving those styles
   * @param {Object|string} Component - React Component that the styles refer to
   * @param {styles} styles - Style selector or Object with selectors
   */
  create(styles, Component) {
    let currentScope = Component ? Component.displayName || Component.name : 'SCOPE' + ++scope

    // flat style object without selectors
    if (styles[Object.keys(styles)[0]] instanceof Object === false) {
      return renderStaticStyles(styles, currentScope)
    }

    return Object.keys(styles).reduce((classes, selector) => {
      classes[selector] = renderStaticStyles(styles[selector], currentScope, selector)
      return classes; // eslint-disable-line
    }, { })
  },

  combineStyles(...styles) {
    return styles.join(' ')
  },

  /**
   * A global StyleSheet that directly applies to your DOM
   * @param {Object} styles - a set of style objects
   * @param {string?} scope - additional scoping selector
   */
  toCSS(styles, scope) {
    if (styles && styles instanceof Object) {
      const scopeSelector = scope !== undefined && scope.trim() !== '' ? scope + ' ' : ''
      Object.keys(styles).forEach(selector => StyleContainer.add(scopeSelector + selector, styles[selector]))
    }
  },

  /**
   * Adds keyframe animations to the global StyleSheet and returns the animation name
   * @param {Object} frames - keyframes that get inserted
   * @param {string?} name - custom animation name
   */
  keyframes(frames, name) {
    if (frames && frames instanceof Object) {
      const animationName = name ? name : generateClassName(frames)

      StyleContainer.addKeyframes(animationName, frames)
      return animationName
    }
  }
}
