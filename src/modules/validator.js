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
	return selector.indexOf(':') === 0;
}

/**
 * Validates if a selector is a media query
 * @param {string} selector - selector that gets validates
 */
export function isMediaQuery(selector) {
	return selector.indexOf('@media') === 0;
}


/**
 * Validates if a selector is a stateful condition
 * @param {string} selector - selector that gets validates
 */
export function isCondition(selector) {
	return validateSelector(selector, '=') || validateSelector(selector, '<') ||  validateSelector(selector, '>') ||  validateSelector(selector, '!=');
}

/**
 * Validates if a selector is action pseudo class
 * Action pseudo classes are :hover, :focus, :active
 * @param {string} selector - selector that gets validates
 */
export function isActionPseudo(selector) {
	return validateSelector(selector, ':hover') ||  validateSelector(selector, ':focus') ||  validateSelector(selector, ':active');
}

/**
 * Validates if a selector is a pseudo element
 * NOTE: Pseudo elements currently are only :before, :after / ::before, ::after
 * @param {string} selector - selector that gets validates
 */
export function isPseudoElement(selector) {
	return validateSelector(selector, ':before') || validateSelector(selector, ':after');
}