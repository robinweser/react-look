import { _StyleContainer } from 'react-look'
import assignStyles from 'assign-styles'
const matchMediaMock = require('match-media-mock').create()

/**
 * Returns all static styles applied to an element
 * @param {Object} element - React element to extract styles from
 * @param {string|string[]} pseudoClass - pseudo classes to simulate
 * @param {Object} mediaConfig - media environment configuration
 */
export default function getPseudoStyle(element, pseudoClass, mediaConfig) {
  matchMediaMock.setConfig(mediaConfig)
  const pseudos = [ ].concat(pseudoClass)
  // get static selector styles
  return element.props.className.split(' ').reduce((styles, className) => {
    pseudos.forEach(pseudo => {
      styles = assignStyles(styles, _StyleContainer.selectors.get('.' + className + pseudo))
    })

    _StyleContainer.mediaQueries.forEach((selectors, query) => {
      // only merge styles matching the media settings
      if (matchMediaMock(query).matches) {
        pseudos.forEach(pseudo => {
          styles = assignStyles(styles, selectors.get('.' + className + pseudo))
        })
      }
    })

    return styles
  }, { })
}
