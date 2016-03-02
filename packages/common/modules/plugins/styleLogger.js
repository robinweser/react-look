import getChildType from '../utils/getChildType'
import { toCSS } from 'inline-style-transformer'
import _ from 'lodash'
/**
 * Logs styles according to different settings
 */
export default ({ styles, Component, element, newProps, config: { styleLogger } }) => {
  if (styleLogger) {
    // Logger information
    const { ref, key } = element

    const childType = getChildType(element)

    const keyInfo = key !== null ? 'key=' + key : ''
    const refInfo = ref !== null ? 'ref=' + ref : ''

    const elementReference = keyInfo + (keyInfo !== '' && refInfo !== '' ? ';' : '') + refInfo
    const elementInfo = childType + (elementReference !== '' ? '[' + elementReference + ']' : '')

    const loggerPrefix = Component.constructor.displayName + ':' + elementInfo + ''
    const logStyles = styleLogger.toString === true ? toCSS(styles) : styles

    const log = () => {
      if (styleLogger.noEmpty && _.isEmpty(logStyles)) {
        return
      }
      console.log(loggerPrefix, logStyles) // eslint-disable-line
    }

    // logs styles if a given event got triggered
    if (styleLogger.onEvent && !newProps._styleLoggerActive) {
      // Allowing multiple events
      if (!Array.isArray(styleLogger.onEvent)) {
        styleLogger.onEvent = [ styleLogger.onEvent ]
      }
      // Iterate every event and add event listeners
      styleLogger.onEvent.forEach(event => {
        const existingEvent = newProps[event]
        newProps[event] = (e) => {
          if (existingEvent) {
            existingEvent()
          }
          newProps._styleLoggerEvent(e)
        }
      })

      newProps._styleLoggerActive = true
    }

    newProps._styleLoggerEvent = (e) => {
      log()
      if (styleLogger.onlyTopMost) {
        if (e) {
          e.stopPropagation()
        }
      }
    }

    newProps._lookShouldUpdate = true

    // logs styles everytime the element gets rendered
    if (styleLogger.onRender) {
      log()
    }
  }

  return styles
}
