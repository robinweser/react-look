/**
 * Validates a selector by checking if it begins with a given value
 * @param {string} selector - selector that gets validates
 * @param {value} value - value that you want to check e.g. :hover
 */
export function validateSelector(selector, value) {
	return selector.indexOf(value) > -1;
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

export function isActionPseudo(selector){
	return validateSelector(selector, ':hover') || validateSelector(selector, ':focus') || validateSelector(selector, ':active');
}

export function isPseudoElement(selector){
	return validateSelector(selector, ':before') || validateSelector(selector, ':after');
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