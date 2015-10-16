/**
* Generates a styleSheet with an scopeId applied to every selector
* The scopeId refers to the Component that is responsible for resolving those styles
* @param {Object} Component - React Component that the styles refer to
* @param {styles} styles - Style selector or Object with selectors
*/
export default (Component, styles) => {
  if (Component !== undefined && styles && Object.keys(styles).length > 0) {
    let scope = Component.name

    if (scope) {
      let styleSheet = {}

      // Resolving single selector styles
      if (styles[Object.keys(styles)[0]] instanceof Object === false) {
        styleSheet._scope = scope
        styleSheet.style = styles
      } else {
        // adds the Component referer uniqueId to every selector
        Object.keys(styles).filter(key => styles[key] instanceof Object).forEach(selector => {
          styleSheet[selector] = {
            _scope: scope,
            style: styles[selector]
          }
        })
      }
      return styleSheet
    }
  }
  return styles
}