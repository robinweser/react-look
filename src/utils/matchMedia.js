let customMatchMedia;
let defaultMatchMedia = (typeof window !== 'undefined' ? window.matchMedia : undefined);

/**
 * Lets you set an alternative matchMedia function
 * @param {Function} matchMedia - an alternative matchMedia function
 */
export function setMatchMedia(matchMedia) {
	if (matchMedia) {
		customMatchMedia = matchMedia;
	}
}

/**
 * Returns the currently used matchMedia function
 */
export function getMatchMedia() {
	if (customMatchMedia){
		return customMatchMedia;
	} else {
		return defaultMatchMedia;
	}
}

/**
 * Returns if the current environment can call the matchMedia function
 */
export function canMatchMedia() {
	return defaultMatchMedia ? true : false;
}