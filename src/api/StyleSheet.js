import cssifyObject from '../utils/cssifyObject'
import prefixer from '../utils/prefixer'
import insertRule from '../utils/globalStyleSheet'
import generateUniqueSelector from '../utils/generateUniqueSelector'
import getFontFormat from '../utils/getFontFormat'

export default {
  /**
  * Generates a styleSheet with an scopeId applied to every selector
  * The scopeId refers to the Component that is responsible for resolving those styles
  * @param {Object|string} Component - React Component that the styles refer to
  * @param {styles} styles - Style selector or Object with selectors
  */
  create(Component, styles) {
    if (Component !== undefined && styles && Object.keys(styles).length > 0) {
      // Either take the Components "name" itself or just a pure string as scope
      const scope = Component.displayName || Component.name || Component

      if (scope) {
        let styleSheet = {}

        // Resolving single selector styles
        if (styles[Object.keys(styles)[0]] instanceof Object === false) {
          styleSheet = {_scope: scope, style: styles}
        } else {
          // adds the Component referer uniqueId to every selector
          Object.keys(styles).forEach(selector => {
            const selectorStyles = styles[selector]
            if (selectorStyles instanceof Object) {
              styleSheet[selector] = {
                _scope: scope,
                style: selectorStyles
              }
            }
          })
        }

        return styleSheet
      }

      return styles
    }
  },

  /**
   * A global StyleSheet that directly applies to your DOM.
   * @param {Object} config - a configuration object
   */
  toCSS(selectors, config = {}) {
    if (!selectors || selectors instanceof Object === false) {
      return false
    }

    Object.keys(selectors).forEach(selector => {
      insertRule((config.scope ? config.scope + ' ' : '') + selector, cssifyObject(selectors[selector], config))
    })
  },

  /**
   * Adds keyframe animations to the global StyleSheet and returns the animation name
   * @param {Object} config - a configuration object
   */
  keyframes(frames, config = {}) {
    if (!frames || frames instanceof Object === false) {
      return false
    }

    const name = config.name ? config.name : generateUniqueSelector(frames)
    const selector = `@${prefixer(config.userAgent).prefixedKeyframes} ${name}`

    // Generating a CSS string which can be included
    let CSS = ''
    Object.keys(frames).forEach(percentage => {
      CSS += `${percentage}{${cssifyObject(frames[percentage], config)}}`
    })
    if (name) {
    insertRule(selector, CSS)
    }
    return name
  },

  /*
  * Adds a new font family to the global StyleSheet for global usage
  * @param {string} fontFamily - font-family for global usage
  * @param {string|Array} files - source files refering to the font files
  * @param {Object} styles - additional font styles including fontWeight, fontStretch, fontStyle, unicodeRange
  */
  fontFace(fontFamily, files, styles) {
    if (!files) {
      return false
    }

    // Generates a style object including all font information
    let fontFace = {
      fontFamily: `'${fontFamily}'`,
      src: files instanceof Array ? files.map(src => `url('${src}') format('${getFontFormat(src)}')`) : files,
      ...styles
    }

    insertRule('@font-face', cssifyObject(fontFace))
    return fontFamily
  }
}
