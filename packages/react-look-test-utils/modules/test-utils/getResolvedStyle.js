import { _resolver } from 'react-look'
import _ from 'lodash'

import getStaticStyle from './getStaticStyle'

const addResolver = config => _.merge({ }, config, {
  _resolveStyles: _resolver
})


/**
 * Resolves element styles and returns an object containing those
 * @param {Object} element - React element to extract styles from
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 * @param {Object} mediaConfig - media environment configuration
 * @param {string|string[]} pseudoClass - environment configuration including media and pseudo config
 */
export default function getResolvedStyle(element, Component, config, mediaConfig, pseudoClass) {
  // resolve styles to generate new classNames for dynamic styles
  const newElement = _resolver(Component, element, addResolver(config))

  if (newElement.props && newElement.props.className) {
    let styles = getStaticStyle(newElement, mediaConfig, pseudoClass)

    // prefix styles if a prefixer is provided
    if (config.prefixer) {
      styles = config.prefixer.prefix(styles)
    }

    return styles
  }
}
