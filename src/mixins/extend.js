import assignStyles from 'assign-styles';
import mixinTypes from '../utils/mixinTypes'

/**
 * Extends a given style object
 * @param {Object} options - mixin options/input
 * options can be either a style object or include a condition as well as styles
 */
export default [{
	key: 'extend',
	type: mixinTypes.EQUAL,
	fn: (key, options, args) => {
		if (options.hasOwnProperty('condition')) {
			if (options.condition) {
				if (options.hasOwnProperty('styles')) {
					return resolveStyles(options.styles)
				} else {
					console.warn('There has no style object been passed. Use `styles` as key.')
					return false
				}
			} else {
				return false
			}
		} else {
			if (options.hasOwnProperty('styles')) {
				return resolveStyles(options.styles)
			} else {
				console.warn('Neither `styles` nor `condition` has been found. Used the whole object as styles instead.')
				return resolveStyles(options)
			}
		}
	}
}]

/**
 * Resolves multiple style objects by merging those
 * @param {Object|Array} styles - A set of style objects or a single style object
 */
export function resolveStyles(styles) {
	let merged = {}
	if (styles instanceof Array) {
		styles.forEach(obj => {
			merged = assignStyles(merged, obj)
		})
	} else {
		merged = styles
	}
	return merged
}