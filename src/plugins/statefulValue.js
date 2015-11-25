/**
 * Resolves values that are functions
 * Calling them with props, state, context as parameter
 */
const statefulValue = (styles, scopeArgs) => {
  const { Component } = scopeArgs

  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Function) {
      styles[property] = value(Component.props, Component.state, Component.context)
    } else if (value instanceof Object) {
      styles[property] = statefulValue(value, scopeArgs)
    }
  })
  return styles
}

export {
	statefulValue as default
}
