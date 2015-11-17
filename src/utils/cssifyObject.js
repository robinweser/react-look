import camelToDashCase from './camelToDashCase'
import prefixer from './prefixer'
import isUnitlessProperty from './isUnitlessProperty'

/**
 * Creates a valid CSS string out of an object of styles
 * @param {Object} styles - an object with CSS styles
 * @param {Object} config - configuration object including `unit` and `userAgent`
 */
export default (styles, config = {}) => {
  let rules = ''

  const prefixedStyles = prefixer(config.userAgent).prefix(styles)

  Object.keys(prefixedStyles).forEach(property => {
    if (rules !== '') {
      rules += ';'
    }

    let value = prefixedStyles[property]
    // automatically adds units to CSS properties that are not unitless
    // but are provided as a plain number
    if (!isUnitlessProperty(property) && !isNaN(parseFloat(value)) && isFinite(value) && value !== 0) {
      value = value + (config.unit || 'px')
    }

    rules += camelToDashCase(property) + ':' + value
  })
  return rules
}
