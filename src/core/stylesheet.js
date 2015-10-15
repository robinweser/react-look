let _lookUniqueKeyCounter = 0

export default (Component, styles) => {
  if (Component !== undefined && styles && Object.keys(styles).length > 0) {
    let uniqueId = (_lookUniqueKeyCounter++).toString(36)
    if (Component._lookScopeId) {
      console.warn(Component + ' already got enhanced by Look. Do not enhance multiple times.')
      return
    }
    Component._lookScopeId = uniqueId

    let styleSheet = {}

    // Resolving single selector styles
    if (styles[Object.keys(styles)[0]] instanceof Object === false) {
      styleSheet._scope = uniqueId
      styleSheet.style = styles
    } else {
      // adds the Component referer uniqueId to every selector
      Object.keys(styles).filter(key => styles[key] instanceof Object).forEach(selector => {
        styleSheet[selector] = {
          _scope: uniqueId,
          style: styles[selector]
        }
      })
    }
    return styleSheet
  }
  return styles
}