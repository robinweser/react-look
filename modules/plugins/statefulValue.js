import assignStyles from 'assign-styles'

/**
 * Resolves values that are functions
 * Calling them with props, state, context as parameter
 */
export default function statefulValue({ styles, Component, resolve, ...pluginInterface }) {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Function) {
      styles[property] = value(Component.props, Component.state, Component.context)
    } else if (value instanceof Object) {
      styles[property] = resolve({
        ...pluginInterface,
        styles: assignStyles({ }, value),
        Component,
        resolve
      })
    }
  })

  return styles
}
