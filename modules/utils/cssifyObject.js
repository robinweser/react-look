import camelToDashCase from './camelToDashCase'
import prefixer from './prefixer'
import isUnitlessProperty from './isUnitlessProperty'

/**
 * Creates a valid CSS string out of an object of styles
 * @param {Object} styles - an object with CSS styles
 * @param {string?} userAgent - custom userAgent
 */
export default function cssifyObject(styles, addImportantFlag, userAgent) {
  if (!styles || styles instanceof Object === false) {
    return ''
  }

  let rules = ''

  const prefixedStyles = prefixer(userAgent).prefix(styles)

  Object.keys(prefixedStyles).forEach(property => {
    let value = prefixedStyles[property]
    if (value instanceof Object) {
      rules += camelToDashCase(property) + '{' + cssifyObject(value, addImportantFlag, userAgent) + '}'
    } else {
      if (rules !== '') {
        rules += ';'
      }
      // automatically adds units to CSS properties that are not unitless
      // but are provided as a plain number
      if (!isUnitlessProperty(property) && !isNaN(parseFloat(value)) && isFinite(value) && value !== 0) {
        value = value + 'px'
      }

      // add !important flag to achieve higher priority than inline styles
      if (addImportantFlag && value.toString().indexOf('!important') === -1) {
        value = value + '!important'
      }

      rules += camelToDashCase(property) + ':' + value
    }
  })

  return rules
}
