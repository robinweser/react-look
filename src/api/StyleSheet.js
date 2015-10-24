import camelToDashCase from '../utils/camelToDashCase'

/**
* Creates a valid CSS string out of an object of styles
* @param {Object} styles - an object with CSS styles
*/
const cssifyObject = (styles) => {
  let rules = ''
  Object.keys(styles).forEach(property => {
    rules += camelToDashCase(property) + ':' + styles[property] + ';'
  })
  return rules
}


export default {

  /**
  * Generates a styleSheet with an scopeId applied to every selector
  * The scopeId refers to the Component that is responsible for resolving those styles
  * @param {Object} Component - React Component that the styles refer to
  * @param {styles} styles - Style selector or Object with selectors
  */
  create(Component, styles) {
    if (Component !== undefined && styles && Object.keys(styles).length > 0) {
      const scope = Component.displayName || Component.name

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
   * @param {Object} selectors - a set of selectors containing valid CSS styles
   * @param {string} unit - a valid unit that gets applied
   * @param {string} media - a valid media query
   * @param {any} id - a special id that gets attached to the stylesheet in order catch it later
   */
  toCSS(selectors, scope, media = '', id) {
    if (!selectors || Object.keys(selectors).length < 1) {
      return false
    }

    let style = document.createElement('style')
    style.type = 'text/css'
    style.media = media
    if (id) {
      style.id = id
    }

    let CSS = ''
    Object.keys(selectors).forEach(selector => {
      if (scope) {
        CSS += scope + ' '
      }
      CSS += selector + '{' + cssifyObject(selectors[selector]) + '}'
    })

    // Apply the CSS styles to the head
    let node = document.createTextNode(CSS)
    style.appendChild(node)
    document.head.appendChild(style)

    return style
  }
}
