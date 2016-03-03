import _ from 'lodash'
import assignStyles from 'assign-styles'

/**
 * Resolves selectors that are functions
 * Calling them with props, state, context as parameter
 */
export default function statefulSelector({ styles, Component, resolve, ...pluginInterface }) {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (property === '_statefulSelector') {
      // if stateful value already resolved just use that
      const newStyles = _.isFunction(value) ? value(Component.props, Component.state, Component.context) : value
      styles = resolve({
        ...pluginInterface,
        styles: newStyles,
        Component,
        resolve
      })
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
