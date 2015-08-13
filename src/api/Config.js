let config = {
	matchMedia: typeof window !== 'undefined' ? window.matchMedia : undefined
}

export default {
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
			return config.matchMedia && config.matchMedia instanceof Function;
		}
}