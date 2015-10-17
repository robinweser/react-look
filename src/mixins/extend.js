import assignStyles from 'assign-styles'
import MixinTypes from '../utils/MixinTypes'

/**
 * Resolves multiple style objects by merging those
 * @param {Object|Array} styles - A set of style objects or a single style object
 */
export function resolveStyles( styles ) {
  let merged = {}

  if ( styles instanceof Array ) {
    styles.forEach(obj => {
      merged = assignStyles(merged, obj)
    })
  } else {
    merged = styles
  }

  return merged
}

/**
 * Extends a given style object
 * @param {Object} options - mixin options/input
 * options can be either a style object or include a condition as well as styles
 */
export default [{
  key: 'extend',
  type: MixinTypes.EQUAL,
  fn: ( key, options ) => {
    if ( options.hasOwnProperty('condition') ) {
      if ( options.condition ) {
        if ( options.hasOwnProperty('styles') ) {
          return resolveStyles(options.styles)
        }

        console.warn('There has no style object been passed. Use `styles` as key.')
      }
    } else {
      if ( options.hasOwnProperty('styles') ) {
        return resolveStyles(options.styles)
      }

      console.warn('Neither `styles` nor `condition` has been found. Used the whole object as styles instead.')

      return resolveStyles(options)
    }
  }
}]
