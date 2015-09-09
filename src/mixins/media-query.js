import mixinTypes from '../utils/mixinTypes'
let matchMedia = typeof window !== 'undefined' ? window.matchMedia : undefined

export default [{
	key: '@media',
	type: mixinTypes.BEGINWITH,
	fn: mediaQuery
}]

/**
 * Evaluates if a media condition is fulfilled by using window.matchMedia
 * NOTE: This won't work on server-side by default
 * @param {string} query - Media query that gets evaluated
 */

export function mediaQuery(key, styles, args) {
	//Check if browser supports window.matchMedia
	if (matchMedia !== undefined) {
		if (matchMedia(key.replace('@media', '').trim()).matches) {
			return styles
		} else {
			return false
		}
	} else {
		console.warn('Failed evaluating media query: ' + expr + '. Your environment is not able to use window.matchMedia.');
		console.warn('Use .setMatchMedia to inject your very own. See docs for help.');
		return false
	}
}