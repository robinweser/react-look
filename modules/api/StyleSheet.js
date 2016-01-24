import StyleContainer from '../utils/StyleContainer'
import generateClassName from '../utils/generateClassName'
import assignStyles from 'assign-styles'
import warn from '../utils/warn'

export function parseStyles(styles, inner) {
  const dynamic = { }
  const base = { }
  const immutable = { }

  Object.keys(styles).forEach(property => {
    const value = styles[property]
    const valueType = typeof value
    // simple value
    if (valueType === 'string' || valueType === 'number' || value instanceof Array) {
      if (!inner) {
        base[property] = value
      } else {
        immutable[property] = value
      }
    } else if (valueType === 'object') {
      if (property.charAt(0) === ':') {

      const parsedInner = parseStyles(value, true)
      immutable[property] = parsedInner.immutable
      dynamic[property] = parsedInner.dynamic
    }   else {
        dynamic[property] = value
      }
    } else {
      dynamic[property] = value
    }
  })

  return { immutable,  dynamic, base }
}

export function renderImmutable(immutable, className, pseudo = '') {
    const styles = {}
  Object.keys(immutable).forEach(extension => {
    const value = immutable[extension]

    if (typeof value === 'object' && Object.keys(value).length > 0) {
      const innerStyles = renderImmutable(value, className, pseudo + extension)
      StyleContainer.add('.' + className + pseudo + extension, innerStyles)
      delete immutable[extension]
    } else {
      styles[extension] = value
    }
  })

  return styles
}

let scope = 0

export default {
  /**
   * Generates a styleSheet with an scopeId applied to every selector
   * The scopeId refers to the Component that is responsible for resolving those styles
   * @param {Object|string} Component - React Component that the styles refer to
   * @param {styles} styles - Style selector or Object with selectors
   */
  create(styles, Component) {
    let currentScope = Component ? Component.displayName || Component.name : 's' + ++scope

    if (!styles || Object.keys(styles).length < 1) {
      warn('WRONG INPUT')
      return false
    }

    // flat style object without selectors
    if (styles[Object.keys(styles)[0]] instanceof Object === false) {
      const { base, immutable, dynamic } = parseStyles(styles)

      const className = currentScope + '-' + generateClassName(base)
      if (Object.keys(base).length > 0) {
        StyleContainer.add('.' + className, base)
      }

      renderImmutable(immutable, className)

      if (Object.keys(dynamic).length > 0) {
        StyleContainer.addDynamic(className, dynamic)
      }
      return className; // eslint-disable-line
    }

    return Object.keys(styles).reduce((output, selector) => {
        const { base, immutable, dynamic } = parseStyles(styles[selector])

        output[selector] = {}
        const className = currentScope + '-' + selector + '--' + generateClassName(base)
        if (Object.keys(base).length > 0) {
        StyleContainer.add('.' + className, base)
        }
        output[selector] = className

        renderImmutable(immutable, className)

        if (Object.keys(dynamic).length > 0) {
          StyleContainer.addDynamic(className, dynamic)
        }

        return output
    }, {})
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
