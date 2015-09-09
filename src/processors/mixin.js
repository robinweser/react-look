import assignStyles from 'assign-styles'

export default {
	name: 'Mixins',
	version: '1.0.0',
	description: 'Resolves any self defined properties also known as mixins',

	//mixin types are used to check if a property is a mixin
	mixinTypes: {
		'INCLUDE',
		'BEGINWITH',
		'EQUAL'
	},

	/**
	 * Prepares mixins and adds extend mixin support
	 * @param {Object} Component - Component providing mixins
	 */
	prepareMixins(Component) {
		if (Component.mixins) {
			if (Component.mixins instanceof Function) {
				return this.prepareMixins(Component.mixins())
			} else if (Component.mixins instanceof Object) {
				return [Component.mixins]
			}
		} else {
			return false
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
	 * Checks if a property actually is a mixin
	 * @param {string} property - property that gets checked
	 * @param {Object} mixin - a valid mixin object including key, type and fn
	 */
	isMixin(property, mixin) {
		switch (mixin.type) {
			case this.mixinTypes.INCLUDE:
				return property.indexOf(mixin.key) > -1
			case this.mixinTypes.BEGINWITH:
				return property.indexOf(mixin.key) === 0
			case this.mixinTypes.EQUAL:
				return property === mixin.key
		}
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
					assignStyles(styles, mixin.fn(value, args))
					delete styles[property]
				} else {
					this.resolveMixins(value, mixins)
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
		if (mixins && Object.keys(mixins).length > 0) {
			return this.resolveMixins(styles, mixins, args)
		} else {
			return styles
		}
	}
}