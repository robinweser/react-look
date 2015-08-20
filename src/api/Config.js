import Prefixer from 'inline-style-prefixer';

let config = {
	processors: new Map(),
	mixins: new Map(),
	matchMedia: typeof window !== 'undefined' ? window.matchMedia : undefined,
	userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
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
		 * NOTE: This may drop performance as Look will try to resolve every mixin even if you're not using them everywhere
		 * @param {Object} processor - processor that gets registered
		 * @param {any} args - any kind of arguments that get passed to processor.process()
		 */
		registerProcessor(processor, ...args) {
			if (config.processors.has(processor)) {
				console.warn('This processor has already been added. It will get overwritten.');
				console.warn('The following arguments have been applied', config.processors.get(processor));
			}
			config.processors.set(processor, ...args);
		},

		/**
		 * Deregisters a processor to not autoenable it anymore 
		 * @param {Object} processor - processor that gets deregistered
		 */
		deregisterProcessor(processor) {
			if (config.processors.has(processor)) {
				config.processors.delete(processor);
			} else {
				console.warn('You can only deregister processors that have been registered before.');
			}
		},

		/**
		 * Returns a processors registered arguments
		 * @param {string|number} processor - processors thats arguments will be returned
		 */
		getProcessorArgs(processor) {
			if (config.processors.has(processor)) {
				return config.processors.get(processor);
			} else {
				console.warn('This processor has never been registered. Therefore there are no arguments applied.');
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
		},


		/**
		 * Lets you set a custom userAgent used for autoprefixing
		 * @param {string} userAgent - a valid userAgent string which gets parsed for autoprefixing
		 */
		setUserAgent(userAgent) {
			if (userAgent) {
				config.userAgent = userAgent;
				Prefixer.setUserAgent(userAgent);
			}
		},

		/**
		 * Returns the currently used userAgent string
		 */
		getUserAgent() {
			return config.userAgent;
		},

		/**
		 * Returns if the autoprefixing works / if a userAgent is available
		 */
		canAutoPrefix() {
			return config.userAgent !== undefined ? true : false;
		}
}