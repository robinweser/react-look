import CSSContainer from '../utils/CSSContainer'
import generateClassName from '../utils/generateClassName'
import assignStyles from 'assign-styles'
import warn from '../utils/warn'

export function renderStaticStyles(styles) {
  const dynamicStyles = { }

  const staticStyles = Object.keys(styles).reduce((output, property) => {
    const value = styles[property]
    if (typeof value === 'string' || typeof value === 'number' || value instanceof Array) {
      output[property] = styles[property]
    } else {
      dynamicStyles[property] = styles[property]
    }
    return output;
  }, { })

  return { staticStyles: staticStyles, dynamicStyles: dynamicStyles }
}

export default {
  combineStyles(...styles) {
    const combined = { className: '', look: { } }

    const flatStyles = styles.reverse()

    flatStyles.forEach(mapping => {
      if (mapping.className) {
        combined.className += ' ' + mapping.className
      }
      if (mapping.look) {
        assignStyles(combined.look, mapping.look)
      }
    })
    combined.className = combined.className.trim()

    return combined
  },
  /**
   * Generates a styleSheet with an scopeId applied to every selector
   * The scopeId refers to the Component that is responsible for resolving those styles
   * @param {Object|string} Component - React Component that the styles refer to
   * @param {styles} styles - Style selector or Object with selectors
   */
  create(styles) {
    if (!styles || Object.keys(styles).length < 1) {
      warn('WRONG INPUT')
      return false
    }

    // flat style object without selectors
    if (styles[Object.keys(styles)[0]] instanceof Object === false) {
      const { staticStyles, dynamicStyles } = renderStaticStyles(styles)

      const output = { }
      if (Object.keys(staticStyles).length > 0) {
        const className = generateClassName(staticStyles)
        CSSContainer.add('.' + className, staticStyles)
        output.className = className
      }
      if (Object.keys(dynamicStyles).length > 0) {
        output.look = dynamicStyles
      }
      return output; // eslint-disable-line
    }

    return Object.keys(styles).reduce((output, selector) => {
      const { staticStyles, dynamicStyles } = renderStaticStyles(styles[selector])

      output[selector] = { }
      if (Object.keys(staticStyles).length > 0) {
        const className = generateClassName(staticStyles)
        CSSContainer.add('.' + className, staticStyles)
        output[selector].className = className
      }
      if (Object.keys(dynamicStyles).length > 0) {
        output[selector].look = dynamicStyles
      }
      return output; // eslint-disable-line
    }, { })
  },

  /**
   * A global StyleSheet that directly applies to your DOM
   * @param {Object} styles - a set of style objects
   * @param {string?} scope - additional scoping selector
   */
  toCSS(styles, scope) {
    if (styles && styles instanceof Object) {
      const scopeSelector = scope !== undefined && scope.trim() !== '' ? scope + ' ' : ''
      Object.keys(styles).forEach(selector => CSSContainer.add(scopeSelector + selector, styles[selector]))
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

      CSSContainer.addKeyframes(animationName, frames)
      return animationName
    }
  }
}
