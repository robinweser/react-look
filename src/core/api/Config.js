let config = {
	processors: [],
	mixins: new Map(),
	defaultKey: 'root'
}

export default {
	/**
	 * Returns the default key for user action pseudo classes
	 */
	getDefaultKey() {
			return config.defaultkey;
		},

		/**
		 * Registers a processor to autoenable it globally 
		 * @param {Object} processor - processor that gets registered
		 */
		registerProcessor(processor) {
			if (config.processors.indexOf(processor) < 0) {
				config.processors.push(processor);
			} else {
				console.warn('This processor has already been added. It will not be added again.');
			}
		},

		/**
		 * Deregisters a processor to not autoenable it anymore 
		 * @param {Object} processor - processor that gets deregistered
		 */
		deregisterProcessor(processor) {
			if (config.processors.indexOf(processor) > 0) {
				config.processors.pop(processor);
			} else {
				console.warn('You can only deregister processors that have been registered before.');
			}
		},
		
		/**
		 * Returns a map of all registered processors
		 */
		getProcessors() {
			return config.processors;
		},

		/**
		 * Registers a mixin to autoenable it globally 
		 * NOTE: This may drop performance as Look will try to resolve every mixin even if you're not using them everywhere
		 * @param {string|number} property - property which gets the unique mixin key
		 * @param {Function} fn - function that creates valid style markup out of a property value
		 */
		registerMixin(property, fn) {
			if (config.mixins.has(property)) {
				console.warn('This mixins has already been added. It will get overwritten.');
				console.warn('The following method has been applied', config.mixins.get(property));
			}
			config.mixins.set(property, fn);
		},

		/**
		 * Deregisters a mixin to not autoenabled anymore
		 * @param {string|number} property - property which serves as the unique mixin key
		 */
		deregisterMixin(property) {
			if (config.mixins.has(property)) {
				config.mixins.delete(property);
			} else {
				console.warn('You can only deregister mixins that have been registered before.');
			}
		},

		/**
		 * Returns a mixins resolving method
		 * @param {string|number} property - property thats method will be returned
		 */
		getMixinFn(property) {
			if (config.mixins.has(property)) {
				return config.mixins.get(property);
			} else {
				console.warn('This mixin has never been registered. Therefore there is no function applied.');
			}
		},

		/**
		 * Returns a map of all registered mixins
		 */
		getMixins() {
			return config.mixins;
		}
}