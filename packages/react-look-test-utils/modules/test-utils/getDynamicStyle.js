import { _StyleContainer } from 'react-look'
import assignStyles from 'assign-styles'

/**
 * Returns all dynamic styles applied to an element
 * It does not resolve but return the pure dynamic content
 * @param {Object} element - React element to extract styles from
 */
export default function getDynamicStyle(element) {
  if (element.props && element.props.className) {
    // iterate all classNames and extract dynamic styles
    return element.props.className.split(' ').reduce((styles, className) => {
      const dynamicStyles = _StyleContainer.dynamics.get(className)

      styles = assignStyles(styles, dynamicStyles)
      return styles
    }, { })
  }
}
