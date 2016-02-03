import assignStyles from 'assign-styles'
import warn from '../utils/warn'

/**
 * Merge multiple style objects by merging those
 * @param {Object|Array} styles - A set of style objects or a single style object
 */
const mergeStyles = (styles) => assignStyles({ }, ...styles)

/**
 * Extends a given style object
 * @param {Object} options - mixin options/input
 * options can be either a style object or include a condition as well as styles
 */
export default ({ property, value: options }) => {
  if (options.hasOwnProperty('condition')) {
    if (options.condition) {
      if (options.styles) {
        return mergeStyles(options.styles)
      }
      warn('There has no style object been passed. Use `styles` as key.', options)
    }
  } else {
    return mergeStyles(options.styles ? options.styles : options)
  }
}
