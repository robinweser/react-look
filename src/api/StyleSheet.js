import cssifyObject from '../utils/cssifyObject'

const defaultConfig = {
  scope: '',
  unit: 'px',
  media: '',
  id: undefined
}

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
   * @param {Object} selectors - a set of selectors containing valid CSS styles
   * @param {string} unit - a valid unit that gets applied
   * @param {string} media - a valid media query
   * @param {any} id - a special id that gets attached to the stylesheet in order catch it later
   */
  toCSS(selectors, config = defaultConfig) {
    if (!selectors || selectors instanceof Object === false) {
      return false
    }
    const {scope, unit, media, id} = config
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
      CSS += selector + '{' + cssifyObject(selectors[selector], unit) + '}'
    })

    // Apply the CSS styles to the head
    let node = document.createTextNode(CSS)
    style.appendChild(node)
    document.head.appendChild(style)

    return style
  }
}
