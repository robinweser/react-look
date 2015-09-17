import assignStyles from 'assign-styles'
import MixinTypes from '../utils/MixinTypes'

export default {
	name: 'Mixins',
	version: '1.0.1',
	description: 'Resolves any self defined properties also known as mixins.',

	mixins: [],

	use(mixin) {
		if (mixin instanceof Array) {
			mixin.forEach(mixinObj => {
				//add mixins as single mixins to ensure they are valid
				addMixin(mixinObj, this.mixins)
			})
		} else {
			addMixin(mixin, this.mixins)
		}
	},

	/**
	 * Main method that gets called when using this processor
	 * @param {Object} styles - valid object containing styles
	 * @param {Object} args - processArgs provided by core-processor
	 */
	process(styles, args) {
		let mixins = prepareMixins(args.Component, this.mixins)
		if (mixins && mixins.length > 0) {
			return resolveMixins(styles, mixins, args)
		} else {
			return styles
		}
	}
}

/**
 * Registers a mixin to autoenable it globally 
 * NOTE: This may drop performance as Look will try to resolve every mixin even if you're not using them everywhere
 * @param {string|number} property - property which gets the unique mixin key
 * @param {Function} fn - function that creates valid style markup out of a property value
 */
export function addMixin(mixin, mixins) {
	if (MixinTypes.hasOwnProperty(mixin.type)) {
		mixins.push(mixin)
	} else {
		let types = Object.keys(MixinTypes).map(valid => {
			return " '" + valid + "'"
		}).toString()
		console.warn("A valid mixinType needs to be passed. '" + mixin.type + "' is not a valid type of " + types)
	}
}

/**
 * Processing method which resolves mixins
 * @param {Object} styles - valid object containing styles
 * @param {Object} mixins - set of mixin properties and a respective resolving function
 * @param {Object} args - processArgs provided by core-processor
 */
export function resolveMixins(styles, mixins, args) {
	let property
	for (property in styles) {
		let value = styles[property]
		if (value instanceof Object) {
			let matchingMixins = getMixins(property, mixins)
			if (matchingMixins.length > 0) {
				matchingMixins.forEach(mixin => {
					value = mixin.fn(property, value, args)
				})
				assignStyles(styles, resolveMixins(value, mixins, args))
				delete styles[property]
			} else {
				resolveMixins(value, mixins, args)
			}
		}
	}
	return styles
}

/**
 * Returns a mixin for a property
 * @param {string} property - property that gets checked
 * @param {Array} mixins - set of valid mixins
 */
export function getMixins(property, mixins) {
	let matchingMixins = []
	let globalMixins = []
	mixins.forEach(mixin => {
		if (isMixin(property, mixin)) {
			if (mixin.type === MixinTypes.ANY) {
				globalMixins.push(mixin)
			} else {
				matchingMixins.push(mixin)
			}
		}
	})

	return matchingMixins.concat(globalMixins)
}

/**
 * Checks if a property actually is a mixin
 * WARNING: Order matters! Do not reorder the cases
 * @param {string} property - property that gets checked
 * @param {Object} mixin - a valid mixin object including key, type and fn
 */
export function isMixin(property, mixin) {
	if (mixin.hasOwnProperty('type')) {
		switch (mixin.type) {
			case MixinTypes.EQUAL:
				return property === mixin.key
				break
			case MixinTypes.BEGINWITH:
				return property.indexOf(mixin.key) === 0
				break
			case MixinTypes.INCLUDE:
				return property.indexOf(mixin.key) > -1
				break
			case MixinTypes.REGEX:
				return property.match(mixin.key)
				break
			case MixinTypes.ANY:
				return true
				break
			default:
				return false
				break
		}
	} else {
		console.warn('Mixins need to provide a valid mixinType. Caused by this mixin: ', mixin)
		return false
	}
}

/**
 * Prepares mixins and adds extend mixin support
 * @param {Object} Component - Component providing mixins
 */
export function prepareMixins(Component, mixins) {
	if (Component.mixins) {
		if (Component.mixins instanceof Function) {
			Component.mixins = Component.mixins()
		}
		if (Component.mixins instanceof Array !== true) {
			Component.mixins = [Component.mixins]
		}
		return mixins.concat(Component.mixins)
	} else {
		return mixins ? mixins : false
	}
}