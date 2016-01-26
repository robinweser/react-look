import StyleContainer from '../utils/StyleContainer'
import generateClassName from '../utils/generateClassName'
import extractDynamicStyles from '../utils/extractDynamicStyles'
import assignStyles from 'assign-styles'
import warn from '../utils/warn'

const isPseudo = property => property.charAt(0) === ':'
const isMediaQuery = property => property.substr(0, 6) === '@media'

const orders = {
  ':link': 4,
  ':visited': 3,
  ':hover': 2,
  ':focus': 1.5,
  ':active': 1
}

function sortPseudoClasses(a, b) {
  const ordA = orders[a]; // eslint-disable-line
  const ordB = orders[b]
  if (ordA && ordB) {
    return ordA < ordB ? 1 : -1
  }
  return a < b ? -1 : a > b ? 1 : 0
}

export function renderSpecialStyles(className, styles, pseudo = '', media = '') {
  return Object.keys(styles).sort(sortPseudoClasses).reduce((extension, property) => {
    const value = styles[property]
    if (typeof value === 'object') {
      if (isPseudo(property)) {
        const innerStyles = renderSpecialStyles(className, value, pseudo + property, media)
        StyleContainer.add('.' + className + pseudo + property, innerStyles, media)
      } else if (isMediaQuery(property)) {
        const newMedia = (media !== '' ? ' and' : '') + property.replace('@media', '')
        const innerStyles = renderSpecialStyles(className, value, pseudo, newMedia)
        StyleContainer.add('.' + className + pseudo, innerStyles, newMedia)
      } else {
        warn('UNSUPPORTED EXTENSION')
      }
      delete styles[property]
    } else {
      extension[property] = value
    }
    return extension; // eslint-disable-line
  }, { })
}



function renderStaticStyles(styles, scope, selector) {
  // Extracts dynamic parts remaining only static styles
  const dynamicStyles = extractDynamicStyles(styles)

  // Determines the base styles used to generate the className
  const baseStyles = Object.keys(styles).reduce((base, property) => {
    const value = styles[property]
    if (typeof value !== 'object' || Array.isArray(value)) {
      base[property] = value
      delete styles[property]
    }
    return base; // eslint-disable-line
  }, { })

  // Generate a unique className based on the base styles
  const className = scope + '_' + (selector || 'default') + '__' + generateClassName(baseStyles)

  // Add the className to the global style container if it has styles
  if (Object.keys(baseStyles).length > 0) {
    StyleContainer.add('.' + className, baseStyles)
  }

  // Also add the dynamic styles if they exist
  if (Object.keys(dynamicStyles).length > 0) {
    StyleContainer.addDynamic(className, dynamicStyles)
  }

  // Renders pseudo classes and media queries to the style container
  renderSpecialStyles(className, styles)

  return className
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
    let currentScope = Component ? Component.displayName || Component.name : 'SCOPE' + ++scope

    if (!styles || Object.keys(styles).length < 1) {
      warn('WRONG INPUT')
      return false
    }

    // flat style object without selectors
    if (styles[Object.keys(styles)[0]] instanceof Object === false) {
      return renderStaticStyles(styles, currentScope)
    }

    return Object.keys(styles).reduce((classes, selector) => {
      classes[selector] = renderStaticStyles(styles[selector], currentScope, selector)
      return classes
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
