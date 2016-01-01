import getChildType from '../../utils/getChildType'
import { toCSS } from 'style-transform'
/**
 * Logs styles according to different settings
 */
export default (styles, {Component, element, newProps} , {styleLogger}) => { // eslint-disable-line
  if (styleLogger) {
    // Logger information
    const {ref, key} = element

    const childType = getChildType(element)

    const keyInfo = key !== null ? 'key=' + key : ''
    const refInfo = ref !== null ? 'ref=' + ref : ''

    const elementReference = keyInfo + (keyInfo !== '' && refInfo !== '' ? ';' : '') + refInfo
    const elementInfo = childType + (elementReference !== '' ? '[' + elementReference + ']' : '')

    const loggerPrefix = Component._lookScope + ':' + elementInfo + ''
    const logStyles = styleLogger.string ? toCSS(styles) : styles


    // logs styles if a given event got triggered
    if (styleLogger.onEvent) {
      const existingEvent = newProps[styleLogger.onEvent]
      newProps[styleLogger.onEvent] = (event) => {
        if (existingEvent) {
          existingEvent()
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
