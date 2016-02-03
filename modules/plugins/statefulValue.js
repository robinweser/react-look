import assignStyles from 'assign-styles'
import _ from 'lodash'

/**
 * Resolves values that are functions
 * Calling them with props, state, context as parameter
 */
export default function statefulValue({ styles, Component, resolve, ...pluginInterface }) {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (_.isFunction(value)) {
      styles[property] = value(Component.props, Component.state, Component.context)
    } else if (_.isPlainObject(value)) {
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
