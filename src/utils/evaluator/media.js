/**
 * Evaluates if a media condition is fullfiled by using window.matchMedia
 * NOTE: This won't work on server-side
 * @param {string} query - Media query that gets evaluated
 */
export default function evaluateMediaQuery(query) {
	/**
	 * Check if browser supports window.matchMedia
	 * TODO: allow custom matchMedia solution for better browser support
	 */
	if (window.matchMedia) {
		return window.matchMedia(query.replace('@media', '').trim()).matches;
	} else {
		throw "Can not resolve media queries. Caused while evaluating media query: " + expr;
	}
}