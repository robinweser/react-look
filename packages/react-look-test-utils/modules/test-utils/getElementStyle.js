import { _StyleContainer } from 'react-look'
import assignStyles from 'assign-styles'

/**
 * Returns all dynamic styles applied to an element
 * It does not resolve but return the pure dynamic content
 * @param {Object} element - React element to extract styles from
 */
export default function getElementStyle(element) {
  if (element.props && element.props.className) {
    return newProps.className.split(' ').reduce((styles, className) => {
      const staticStyles = StyleContainer.selectors.get(className)
      const dynamicStyles = StyleContainer.dynamics.get(className)

      let mediaStyles = { }

      StyleContainer.mediaQueries.forEach((selectors, query) => {
        mediaStyles = assignStyles(mediaStyles, selectors.get(className))
      })

      styles = assignStyles(styles, staticStyles, dynamicStyles, mediaStyles)
      return styles
    }, { })
  }
}
