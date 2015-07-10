/** 
 * Checks if the selector is a media query
 */
export function isMediaQuery(selector) {
	return selector.trim().charAt(0) == '@';
};

/** 
 * Checks if the selector is a pseudo class
 */
export function isPseudo(selector) {
	return selector.trim().charAt(0) == ':';
}

export function isPseudoLang(selector) {
	return selector.trim().indexOf(':lang') == 0;
}

export function isPseudoActive(selector) {
	return selector.trim().indexOf(':active') == 0;
}
export function isPseudoHover(selector) {
	return selector.trim().indexOf(':hover') == 0;
}
export function isPseudoFocus(selector) {
	return selector.trim().indexOf(':focus') == 0;
}

export function isExpression(selector) {
	return selector.includes('=');
}

export function isAdvanced(selector) {
	return this.isExpression(selector) || this.isMediaQuery(selector) || this.isPseudo(selector);
}

export function isIndexSensitive(selector) {
	let sensitivePseudos = [':last-child', ':first-child', ':nth-child', ':nth-last-child', ':nth-of-type', ':first-of-type'];

	let i;
	let length = sensitivePseudos.length;
	for (i = 0; i < length; ++i)
		if (selector.indexOf(sensitivePseudos[i]) > -1) {
			return true;
		}
	return false;
}
/** 
 * Checks if a value really is a number
 */
export function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

/** 
 * Checks if an object is empty
 */
export function isEmpty(object) {
	return !Object.keys(object).length;
}