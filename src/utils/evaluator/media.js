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
		return matchMedia.match(query.replace('@media', '').trim()).matches;
	} else {
		throw "Can not resolve media queries. Caused while evaluating media query: " + expr;
	}
}