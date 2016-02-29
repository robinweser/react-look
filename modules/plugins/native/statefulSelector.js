import _ from 'lodash'

/**
 * Resolves selectors that are functions
 * Calling them with props, state, context as parameter
 */
export default function statefulSelector({ styles, Component, resolve, ...pluginInterface }) {
  if (_.isFunction(styles)) {
    return resolve({
      ...pluginInterface,
      styles: styles(Component.props, Component.state, Component.context),
      Component,
      resolve
    })
  }

  return styles
}
