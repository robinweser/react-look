import { _StyleContainer } from 'react-look'
import assignStyles from 'assign-styles'

import getMediaStyle from './getMediaStyle'
import getPseudoStyle from './getPseudoStyle'

/**
 * Returns all static styles applied to an element
 * @param {Object} element - React element to extract styles from
 * @param {Object} mediaConfig - media environment configuration
 * @param {string|string[]} pseudoClass - environment configuration including media and pseudo config
 */
export default function getStaticStyle(element, mediaConfig, pseudoClass) {
  if (element.props && element.props.className) {
    // get static selector styles
    const selectorStyles = element.props.className.split(' ').reduce((styles, className) => {
      styles = assignStyles(styles, _StyleContainer.selectors.get('.' + className))
      return styles
    }, { })

    // get media styles
    const mediaStyles = getMediaStyle(element, mediaConfig)
    const pseudoStyles = getPseudoStyle(element, pseudoClass)

    return assignStyles({ }, selectorStyles, mediaStyles, pseudoStyles)
  }
}
