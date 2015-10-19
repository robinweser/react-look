export default {

  /**
  * Generates a styleSheet with an scopeId applied to every selector
  * The scopeId refers to the Component that is responsible for resolving those styles
  * @param {Object} Component - React Component that the styles refer to
  * @param {styles} styles - Style selector or Object with selectors
  */
  create(Component, styles) {
    if (Component !== undefined && styles && Object.keys(styles).length > 0) {

      let scope = Component.displayName || Component.name


      if (scope) {
        let styleSheet = {}

        // Resolving single selector styles
        if (styles[Object.keys(styles)[0]] instanceof Object === false) {
          styleSheet = {scope: scope, style: styles}
        } else {

          // adds the Component referer uniqueId to every selector
          Object.keys(styles).forEach(selector => {
            let selectorStyles = styles[selector]
            if (selectorStyles instanceof Object) {
              styleSheet[selector] = {
                _scope: scope,
                style: selectorStyles
              }
            }
          })

          return styleSheet
        }
      }

      return styles
    }
  }
}