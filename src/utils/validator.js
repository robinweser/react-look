/**
 * Validates a selector by checking if it begins with a given value
 * @param {string} selector - selector that gets validates
 * @param {value} value - value that you want to check e.g. :hover
 */
export function validateSelector(selector, value) {
	return selector.indexOf(value) === 0;
}

/**
 * Validates if a selector is a pseudo-class
 * @param {string} selector - selector that gets validates
 */
export function isPseudo(selector) {
	return this.validateSelector(selector, ':');
}

/**
 * Validates if a selector is a media query
 * @param {string} selector - selector that gets validates
 */
export function isMediaQuery(selector) {
	return this.validateSelector(selector, '@media');
}

/**
 * Validates if a selector is a stateful condition
 * @param {string} selector - selector that gets validates
 */
export function isCondition(selector) {
	return selector.indexOf('=') > -1 || selector.indexOf('<') > -1 ||  selector.indexOf('>') > -1 ||  selector.indexOf('!=') > -1;
}

/**
 * Validates if a selector is an advanced selector: pseudo-class, media query or stateful condition
 * @param {string} selector - selector that gets validates
 */
export function isAdvanced(selector) {
	return this.isCondition(selector) || this.isMediaQuery(selector) || this.isPseudo(selector);
}

/**
 * Validates if a value is a true number
 * @param {number} value - value that gets validated
 */
export function isNumber(value) {
	return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Validates if an object actually is empty
 * @param {Object} object - object that might be empty
 */
export function isEmpty(object) {
	if (object !== undefined) {
		return !Object.keys(object).length;
	} else {
		return true;
	}
}