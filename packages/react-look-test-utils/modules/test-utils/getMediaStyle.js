import { _StyleContainer } from 'react-look'
import assignStyles from 'assign-styles'
const matchMediaMock = require('match-media-mock').create()

/**
 * Returns all static styles applied to an element
 * @param {Object} element - React element to extract styles from
 * @param {Object} mediaConfig - media environment configuration
 */
export default function getMediaStyle(element, mediaConfig) {
  matchMediaMock.setConfig(mediaConfig)

  if (element.props && element.props.className) {
    return element.props.className.split(' ').reduce((styles, className) => {
      _StyleContainer.mediaQueries.forEach((selectors, query) => {
        // only merge styles matching the media settings
        if (matchMediaMock(query).matches) {
          styles = assignStyles(styles, selectors.get('.' + className))
        }
      })
      return styles
    }, { })
  }
}
