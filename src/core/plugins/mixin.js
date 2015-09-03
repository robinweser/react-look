import assignStyles from 'assign-styles'

export default {
	name : 'Mixins',
	version: '1.0.0',
	description: 'Resolves any self defined properties also known as mixins',
	
	//Requiring the current Component to be passed to the processor
	args: ['Component'],

	/**
	 * Prepares mixins and adds extend mixin support
	 * @param {Object} Component - Component providing mixins
	 */
	prepareMixins(Component) {
		if (Component.mixins) {
			if (Component.mixins instanceof Function) {
				return Component.mixins()
			} else if (Component.mixins instanceof Object) {
				return Component.mixins
			}
		} else {
			return false
		}
	},

	/**
	* Processing method which resolves mixins
	* @param {Object} styles - valid object containing styles
	* @param {Object} mixins - set of mixin properties and a respective resolving function
	*/
	resolveMixins(styles, mixins) {
		let property
		for (property in styles) {
			let value = styles[property]
			if (value instanceof Object) {
				if (mixins.hasOwnProperty(property)) {
					assignStyles(styles, mixins[property](value))
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
	 * @param {Object} Component - Component providing mixins
	 */
	process(styles, Component) {
		let mixins = this.prepareMixins(Component)
		if (mixins && Object.keys(mixins).length > 0) {
			return this.resolveMixins(styles, mixins)
		} else {
			return styles
		}
	}
}