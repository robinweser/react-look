import { _StyleContainer } from 'react-look'
import assignStyles from 'assign-styles'

/**
 * Returns all static styles applied to an element
 * @param {Object} element - React element to extract styles from
 */
export default function getStaticStyle(element) {
  if (element.props && element.props.className) {
    return newProps.className.split(' ').reduce((styles, className) => {
      const staticStyles = StyleContainer.selectors.get(className)
      let mediaStyles = { }

      StyleContainer.mediaQueries.forEach((selectors, query) => {
        mediaStyles = assignStyles(mediaStyles, selectors.get(className))
      })

      styles = assignStyles(styles, staticStyles, mediaStyles)
      return styles
    }, { })
  }
}
