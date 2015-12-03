import getChildType from '../utils/getChildType'
import cssifyObject from '../utils/cssifyObject'
/**
 * Logs styles according to different settings
 */
export default (styles, {Component, element, newProps} , {styleLogger}) => {
  if (styleLogger) {
    // Logger information
    const {ref, key, type} = element

    const childType = getChildType(element)

    const keyInfo = key !== null ? 'key=' + key : ''
    const refInfo = ref !== null ? 'ref=' + ref : ''

    const elementReference = keyInfo + (keyInfo !== '' && refInfo !== '' ? ';' : '') + refInfo
    const elementInfo = childType + (elementReference !== '' ? '[' + elementReference + ']' : '')

    const loggerPrefix = Component._lookScope + ':' + elementInfo + ''
    const logStyles = styleLogger.string ? cssifyObject(styles) : styles



    // logs styles if element is clicked
    if (styleLogger.onClick) {
      const existingOnClick = newProps.onClick
      newProps.onClick = (event) => {
        if (existingOnClick) {
          existingOnClick()
        }
        console.log(loggerPrefix, logStyles)
        if (styleLogger.onlyTopMost) {
          event.stopPropagation()
        }
      }
    }

    // logs styles if element is hovered
    if (styleLogger.onHover) {
      const existingOnMouseEnter = newProps.onMouseEnter
      newProps.onMouseEnter = () => {
        if (existingOnMouseEnter) {
          existingOnMouseEnter()
        }
        console.log(loggerPrefix, logStyles)
        if (styleLogger.onlyTopMost) {
          event.stopPropagation()
        }
      }
    }

    // logs styles everytime the element gets rendered
    if (styleLogger.onRender) {
      console.log(loggerPrefix, logStyles)
    }
  }

  return styles
}
