import generateClassName from '../utils/generateClassName'
import StyleContainer from '../core/container'
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
  },

  /**
   * Adds a new font family to the global StyleSheet for global usage
   * @param {string} fontFamily - font-family for global usage
   * @param {string|Array} files - source files refering to the font files
   * @param {Object} properties - additional font properties including fontWeight, fontStretch, fontStyle, unicodeRange
   */
  fontFace(fontFamily, files, properties) {
    if (files) {
      // Generates a style object including all font information
      const fontFace = {
        fontFamily: '\'fontFamily}\'',
        src: files instanceof Array ? files.map(src => `url('${src}') format('${getFontFormat(src)}')`).join(',') : files
      }

      // Filter the properties to only include valid properties
      if (properties && properties instanceof Object) {
        const fontProperties = [ 'fontWeight', 'fontStretch', 'fontStyle', 'unicodeRange' ]
        Object.keys(properties).filter(prop => fontProperties.indexOf(prop) > -1).forEach(fontProp => fontFace[fontProp] = properties[fontProp])
      }

      GlobalStyleSheet.addFontFace(fontFace)
      return fontFamily
    }
  }
}
