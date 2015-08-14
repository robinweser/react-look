let config = {
	processors: {},
	mixins: {},
	matchMedia: typeof window !== 'undefined' ? window.matchMedia : undefined
}

export default {
	/**
	 * Register processors to autoenable them globally 
	 * NOTE: This may drop performance as Look will try to resolve every mixin even if you're not using them everywhere
	 * @param {Object} processor - processor that gets registered
	 * @param {any} args - any kind of arguments that get passed to processor.process()
	 */
	registerProcessor(processor, ...args) {
			//TODO: register/deregister Processors
		},

		deregisterProcessor(processor) {
			//TODO: register/deregister Processors
		},

		getProcessors() {
			//TODO: register/deregister Processors
		},

		/**
		 * Register mixins to autoenable them globally 
		 * NOTE: This may drop performance as Look will try to resolve every mixin even if you're not using them everywhere
		 * @param {string|number} property - property which gets the unique mixin key
		 * @param {Function} fn - function that creates valid style markup out of a property value
		 */
		registerMixin(property, fn) {
			//TODO: register/deregister Mixins
		},

		deregisterMixin(property, fn) {
			//TODO: register/deregister Mixins
		},
		getMixin(property) {
			//TODO: register/deregister Mixins
		},
		getMixins() {
			//TODO: register/deregister Mixins
		},


		/**
		 * Lets you set an alternative matchMedia function
		 * @param {Function} matchMedia - an alternative matchMedia function
		 */
		setMatchMedia(matchMedia) {
			if (matchMedia && matchMedia instanceof Function) {
				config.matchMedia = matchMedia;
			}
		},

		/**
		 * Returns the currently used matchMedia function
		 */
		getMatchMedia() {
			return config.matchMedia;
		},

		/**
		 * Returns if the current environment can call the matchMedia function
		 */
		canMatchMedia() {
			return config.matchMedia && config.matchMedia instanceof Function ? true : false;
		}
}