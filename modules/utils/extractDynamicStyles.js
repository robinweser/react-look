const isPseudo = property => property.charAt(0) === ':'
const isMediaQuery = property => property.substr(0, 6) === '@media'

/**
 * Extracts all possible dynamic styles out of a style object
 * To be able to render all other (static) styles directly to CSS
 * @param {Object} styles - pure style object which gets parsed
 * @param {string?} parent - outer property to extract nested styles
 */
export default function extractDynamicStyles(styles, parent) {
  return Object.keys(styles).reduce((dynamic, property) => {
    const value = styles[property]; // eslint-disable-line
    const valueType = typeof value

    if (valueType === 'object' && !Array.isArray(value)) {

      // only consider pseudo classes and media queries
      // that contain inner dynamic styles
      if (isPseudo(property) || isMediaQuery(property)) {
        const innerDynamic = extractDynamicStyles(value, property)
        const innerDynamicCount = Object.keys(innerDynamic).length

        // if the inner styles contain dynamic styles
        // extract them into the output object
        if (innerDynamicCount > 0) {
          dynamic[property] = innerDynamic
        }

        // Remove the property if all inner styles
        // are actually dynamic styles
        if (innerDynamicCount === Object.keys(value).length) {
          // TODO: test
          //  delete styles[property]
        }
      } else {
        dynamic[property] = value
        delete styles[property]
      }
    }

    // function are considered stateful styles and therefore
    // treated as dynamic styles
    if (valueType === 'function') {
      dynamic[property] = value
      delete styles[property]
    }

    return dynamic; // eslint-disable-line
  }, { })
}
