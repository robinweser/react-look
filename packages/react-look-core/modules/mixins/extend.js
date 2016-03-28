import assignStyles from 'assign-styles'

/**
 * Merge multiple style objects by merging those
 * @param {Object|Array} styles - A set of style objects or a single style object
 */
const mergeStyles = styles => {
  if (Array.isArray(styles)) {
    return assignStyles({ }, ...styles)
  }
  return assignStyles({ }, styles)
}

/**
 * Extends a given style object
 * @param {Object} options - mixin options/input
 * options can be either a style object or include a condition as well as styles
 */
export default ({ value: options }) => {
  if (options.hasOwnProperty('condition')) {
    if (options.condition && options.styles) {
      return mergeStyles(options.styles)
    }
  } else {
    return mergeStyles(options.styles ? options.styles : options)
  }
}
