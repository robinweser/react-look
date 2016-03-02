import _ from 'lodash'

import StyleContainer from './StyleContainer'
import renderStaticStyles from '../core/renderer'
import getFontFormat from '../utils/getFontFormat'

let keyframe = 0

export default {
  /**
   * Generates a styleSheet with an scopeId applied to every selector
   * The scopeId refers to the Component that is responsible for resolving those styles
   * @param {styles} styles - Style selector or Object with selectors
   */
  create(styles) {
    // flat style object without selectors
    const firstKey = styles[Object.keys(styles)[0]]
    if (!_.isPlainObject(firstKey) && !_.isFunction(firstKey)) {
      return renderStaticStyles(styles)
    }

    return Object.keys(styles).reduce((classes, selector) => {
      classes[selector] = renderStaticStyles(styles[selector])
      return classes; // eslint-disable-line
    }, { })
  },

  /**
   * Combines styles to a single className string
   * @param {Object} ...styles - styles that get combined
   */
  combineStyles(...styles) {
    return styles.join(' ')
  },

  /**
   * A global StyleSheet that directly applies to your DOM
   * @param {Object} styles - a set of style objects
   * @param {string?} scope - additional scoping selector
   */
  addCSS(styles, scope) {
    if (typeof styles === 'string') {
      StyleContainer.addStatic(styles)
    } else {
      const scopeSelector = scope !== undefined && scope.trim() !== '' ? scope + ' ' : ''
      Object.keys(styles).forEach(selector => StyleContainer.add(scopeSelector + selector, styles[selector]))
    }
  },

  toCSS(styles, scope) {
    console.warn('`StyleSheet.toCSS` is deprecated! Please use `StyleSheet.addCSS` instead!') // eslint-disable-line
    this.addCSS(styles, scope)
  },

  /**
   * Renders all static styles into a single CSS string
   * @param {string?} userAgent - userAgent used to prefix styles
   */
  renderToString(userAgent) {
    return StyleContainer.renderStaticStyles(userAgent)
  },

  /**
   * Adds keyframe animations to the global StyleSheet and returns the animation name
   * @param {Object} frames - keyframes that get inserted
   * @param {string?} name - custom animation name
   */
  keyframes(frames, name) {
    const animationName = name ? name : 'k' + keyframe++

    StyleContainer.addKeyframes(animationName, frames)
    return animationName
  },

  /**
   * Adds a new font family to the global StyleSheet for global usage
   * @param {string} fontFamily - font-family for global usage
   * @param {string|Array} files - source files refering to the font files
   * @param {Object} properties - additional font properties including fontWeight, fontStretch, fontStyle, unicodeRange
   */
  font(fontFamily, files, properties) {
    if (files) {
      // Generates a style object including all font information
      const font = {
        fontFamily: `'${fontFamily}'`,
        src: files.map(src => `url('${src}') format('${getFontFormat(src)}')`).join(',')
      }

      // Filter the properties to only include valid properties
      if (properties) {
        const fontProperties = [ 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange' ]
        Object.keys(properties).filter(prop => fontProperties.indexOf(prop) > -1).forEach(fontProp => font[fontProp] = properties[fontProp])
      }

      StyleContainer.addFont(font)
      return fontFamily
    }
  }
}
