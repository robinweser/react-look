import assignStyles from 'assign-styles'

/**
 * Resolves values that are functions
 * Calling them with props, state, context as parameter
 */
export default function statefulValue(styles, scopeArgs) {
  const { Component } = scopeArgs

  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Function) {
      debugger
      styles[property] = value(Component.props, Component.state, Component.context)
    } else if (value instanceof Object) {
      styles[property] = statefulValue(assignStyles({ }, value), scopeArgs)
    }
  })

  return styles
}
