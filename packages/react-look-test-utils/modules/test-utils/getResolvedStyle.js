import { _StyleContainer, _resolver } from 'react-look'
import assignStyles from 'assign-styles'
import _ from 'lodash'

const addResolver = config => _.merge({ }, config, {
  _resolveStyles: _resolver
})

/**
 * Resolves element styles and returns an object containing those
 * @param {Object} element - React element to extract styles from
 * @param {Object} Component - wrapping React Component providing styles and elements
 * @param {Object} config - configuration containing plugins and plugin-specific configs
 */
export default function getResolvedStyle(element, Component = { }, config = { }) {
  const newElement = resolveStyles(Component, element, addResolver(config))

  if (newElement.props && newElement.props.className) {
    return newProps.className.split(' ').reduce((styles, className) => {
      const staticStyles = StyleContainer.selectors.get(className)
      let mediaStyles = { }

      StyleContainer.mediaQueries.forEach((selectors, query) => {
        mediaStyles = assignStyles(mediaStyles, selectors.get(className))
      })

      styles = assignStyles(styles, staticStyles, mediaStyles)

      if (config.prefixer) {
        styles = config.prefixer.prefix(styles)
      }

      return styles
    }, { })
  }
}
