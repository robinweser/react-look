import assignStyles from 'assign-styles'
import mixinTypes from '../utils/mixinTypes'

export default {
	name: 'Mixins',
	version: '1.0.0',
	description: 'Resolves any self defined properties also known as mixins.',

	mixins: [],

	use(mixin) {
		if (mixin instanceof Array) {
			mixin.forEach(mixinObj => {
				//add mixins as single mixins to ensure they are valid
				this.addMixin(mixinObj)
			})
		} else {
			this.addMixin(mixin)
		}
	},

	/**
	 * Registers a mixin to autoenable it globally 
	 * NOTE: This may drop performance as Look will try to resolve every mixin even if you're not using them everywhere
	 * @param {string|number} property - property which gets the unique mixin key
	 * @param {Function} fn - function that creates valid style markup out of a property value
	 */
	addMixin(mixin) {
		if (mixinTypes.hasOwnProperty(mixin.type)) {
			mixins.push(mixin)
		} else {
			let types = Object.keys(mixinTypes).map(valid => {
				return " '" + valid + "'"
			}).toString()
			console.warn("A valid mixinType needs to be passed. '" + mixin.type + "' is not a valid type of " + types)
		}
	},

	/**
	 * Prepares mixins and adds extend mixin support
	 * @param {Object} Component - Component providing mixins
	 */
	prepareMixins(Component) {
		if (Component.mixins) {
			if (Component.mixins instanceof Function) {
				Component.mixins = Component.mixins()
			}
			if (Component.mixins instanceof Array !== true) {
				Component.mixins = [Component.mixins]
			}
			return this.mixins.concat(Component.mixins)
		} else {
			return false
		}
	},

	/**
	 * Checks if a property actually is a mixin
	 * WARNING: Order matters! Do not reorder the cases
	 * @param {string} property - property that gets checked
	 * @param {Object} mixin - a valid mixin object including key, type and fn
	 */
	isMixin(property, mixin) {
		if (mixin.hasOwnProperty('type')) {
			switch (mixin.type) {
				case mixinTypes.EQUAL:
					return property === mixin.key
				case mixinTypes.BEGINWITH:
					return property.indexOf(mixin.key) === 0
				case mixinTypes.INCLUDE:
					return property.indexOf(mixin.key) > -1
				default:
					return false
			}
		} else {
			console.warn('Mixins need to provide a valid mixinType. Caused by this mixin: ', mixin)
			return false;
		}
	},

	/**
	 * Returns a mixin for a property
	 * @param {string} property - property that gets checked
	 * @param {Array} mixins - set of valid mixins
	 */
	getMixin(property, mixins) {
		let i;
		let length = mixins.length;
		for (i = 0; i < length; ++i) {
			let mixin = mixins[i]
			if (this.isMixin(property, mixin)) {
				return mixin
			}
		}
		return false
	},

	/**
	 * Processing method which resolves mixins
	 * @param {Object} styles - valid object containing styles
	 * @param {Object} mixins - set of mixin properties and a respective resolving function
	 * @param {Object} args - processArgs provided by core-processor
	 */
	resolveMixins(styles, mixins, args) {
		let property
		for (property in styles) {
			let value = styles[property]
			if (value instanceof Object) {
				let mixin = this.getMixin(property, mixins)
				if (mixin) {
					assignStyles(styles, this.resolveMixins(mixin.fn(value, args), mixins, args))
					delete styles[property]
				} else {
					this.resolveMixins(value, mixins, args)
				}
			}
		}
		return styles
	},

	/**
	 * Main method that gets called when using this processor
	 * @param {Object} styles - valid object containing styles
	 * @param {Object} args - processArgs provided by core-processor
	 */
	process(styles, args) {
		let mixins = this.prepareMixins(args.Component)
		if (mixins && mixins.length > 0) {
			return this.resolveMixins(styles, mixins, args)
		} else {
			return styles
		}
	}
}