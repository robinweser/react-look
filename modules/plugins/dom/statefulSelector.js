import _ from 'lodash'

/**
 * Resolves selectors that are functions
 * Calling them with props, state, context as parameter
 */
export default function statefulSelector({ styles, Component, resolve, ...pluginInterface }) {
  const { _statefulSelector } = styles

  if (_statefulSelector) {
    // if stateful value already resolved just use that
    const newStyles = _.isFunction(_statefulSelector) ? _statefulSelector(Component.props, Component.state, Component.context) : _statefulSelector

    return resolve({
      ...pluginInterface,
      styles: newStyles,
      Component,
      resolve
    })
  }

  return styles
}
