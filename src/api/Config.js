let config = {
	processors: [],
	defaultKey: 'root'
}

export default {
	/**
	 * Returns the default key for user action pseudo classes
	 */
	getDefaultKey() {
			return config.defaultkey
		},

		/**
		 * Registers a processor to autoenable it globally 
		 * @param {Object} processor - processor that gets registered
		 */
		registerProcessor(processor) {
			if (config.processors.indexOf(processor) < 0) {
				config.processors.push(processor)
			} else {
				console.warn('This processor has already been added. It will not be added again.')
			}
		},

		/**
		 * Deregisters a processor to not autoenable it anymore 
		 * @param {Object} processor - processor that gets deregistered
		 */
		deregisterProcessor(processor) {
			if (config.processors.indexOf(processor) >= 0) {
				config.processors.pop(processor)
			} else {
				console.warn('You can only deregister processors that have been registered before.')
			}
		},
		
		/**
		 * Returns a map of all registered processors
		 */
		getProcessors() {
			return config.processors
		}
}