import * as matchMedia from '../matchMedia';

/**
 * Evaluates if a media condition is fullfiled by using window.matchMedia
 * NOTE: This won't work by default server-side
 * @param {string} query - Media query that gets evaluated
 */
export default function evalMediaQuery(query) {
	/**
	 * Check if browser supports window.matchMedia
	 */
	if (matchMedia.canMatchMedia()) {
		return matchMedia.getMatchMedia()(query.replace('@media', '').trim()).matches;
	} else {
		console.warn('Failed evaluating media query: '+expr+'. Your environment is not able to use window.matchMedia.');
		console.warn('Use .setMatchMedia to inject your very own. See docs for help.');
		return false;
	}
}